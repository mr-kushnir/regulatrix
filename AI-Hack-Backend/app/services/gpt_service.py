import logging
from typing import Any, Dict, List

import aiohttp
import orjson
from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.core.context import ApplicationContext
from app.core.enums import MessageTypeEnum
from app.models.chat import Message
from app.repositories.chat_repository import ChatRepository
from app.schemas.base.gpt import GetMessageSchema


class GPTService:
    def __init__(self):
        self._chat_repository = ChatRepository()

    async def get_response(self, context: ApplicationContext, data: GetMessageSchema) -> Message:
        """Получение ответа на сообщение пользователя"""
        async with context.database.session_context() as database_session:
            message_context = await self._get_last_messages(
                database_session, chat_id=data.chat_id
            )
            assistant_response = await self._get_assistant_response(
                {"message": data.message, "context": jsonable_encoder(message_context)}
            )
            message = await self._chat_repository.create_message(
                database_session,
                data.chat_id,
                assistant_response,
                message_type=MessageTypeEnum.AI,
            )
        return message

    async def _get_last_messages(
            self,
            session: AsyncSession,
            chat_id: int,
            limit: int = settings.MESSAGE_CONTEXT_LIMIT,
    ) -> List[Message]:
        """Получение последних n(limit) сообщений для формирования контекста"""
        result = await session.execute(
            select(Message)
            .where(Message.chat_id == chat_id)
            .order_by(desc(Message.date_created))
            .limit(limit)
        )

        return result.scalars().fetchall()

    async def _get_assistant_response(self, json: Dict[str, Any]) -> Any:
        """Получение ответа от AI"""
        async with aiohttp.ClientSession() as session:
            async with session.post(
                    f"{settings.SERVICE_URL}/api/message", json=json
            ) as response:
                if response.status == 200:
                    return await response.json()
