import logging
from typing import List

import aiohttp
from fastapi import Response, status

from app.core.context import ApplicationContext
from app.core.enums import MessageTypeEnum
from app.models.chat import Chat, Message
from app.repositories.chat_repository import ChatRepository
from app.schemas.chat import CreateChatSchema, CreateMessageSchema
from app.services.gpt_service import GPTService
from app.validation.chat_validation import validate_chat_data
from app.validation.user_validation import validate_user_data_by_id


class ChatService:
    def __init__(self):
        self.chat_repository = ChatRepository()

    async def create_chat(
            self, context: ApplicationContext, data: CreateChatSchema
    ) -> Chat:
        """Создание чата"""
        async with context.database.session_context() as session:
            await validate_user_data_by_id(session, user_id=data.user_id)
            return await self.chat_repository.create_chat(session, data)

    async def get_user_chats(self, context: ApplicationContext, user_id) -> List[Chat]:
        async with context.database.session_context() as session:
            return await self.chat_repository.get_chats(session, user_id=user_id)

    async def delete_user_chat(
            self, context: ApplicationContext, user_id: int, chat_id: int
    ) -> Response:
        async with context.database.session_context() as session:
            await validate_user_data_by_id(session, user_id=user_id)
            await validate_chat_data(session, chat_id=chat_id)
            await self.chat_repository.delete_chat(session, chat_id)
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    async def add_message_to_chat(
            self, context: ApplicationContext, data: CreateMessageSchema, chat_id: int
    ) -> Message:
        """Добавление сообщения в чат"""
        async with context.database.session_context() as session:
            await validate_chat_data(session, chat_id=chat_id)
            message = await self.chat_repository.create_message(
                session,
                chat_id=chat_id,
                message=data.message,
                message_type=MessageTypeEnum.USER,
            )
        return message

    async def get_message_from_chat(
            self, context: ApplicationContext, chat_id: int
    ) -> List[Message]:
        """Получение сообщения"""
        async with context.database.session_context() as session:
            await validate_chat_data(session, chat_id=chat_id)
            return await self.chat_repository.get_message(session, chat_id=chat_id)
