import logging

import aiohttp
from fastapi import HTTPException, status

from app.core.context import ApplicationContext
from app.core.enums import MessageTypeEnum
from app.repositories.chat_repository import ChatRepository
from app.schemas.base.gpt import GetMessageSchema


class GPTService:
    def __init__(self):
        self._chat_repository = ChatRepository()

    async def get_response(self, context: ApplicationContext, data: GetMessageSchema):
        async with aiohttp.ClientSession() as session:
            async with session.post("http://0.0.0.0:8070/api/message", json={"message": data.message}) as response:
                if response.status == 200:
                    message = await response.json()

        async with context.database.session_context() as session:
            message = await self._chat_repository.create_message(
                session,
                data.chat_id,
                message,
                message_type=MessageTypeEnum.AI,
            )
        return message
