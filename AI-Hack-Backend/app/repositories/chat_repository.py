from datetime import datetime
from typing import List, Optional
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy import delete, desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.core.ceph import Ceph
from app.core.enums import MessageTypeEnum
from app.models.chat import Chat, ChatFile, Message
from app.schemas.chat import CreateChatSchema


class ChatRepository:

    async def get_chats(
            self,
            session: AsyncSession,
            user_id: Optional[int] = None,
            start_datetime: Optional[datetime] = None,
            end_datetime: Optional[datetime] = None,
            limit: Optional[int] = None,
            offset: Optional[int] = None,
    ) -> List[Chat]:

        stmt = select(Chat)
        if user_id:
            stmt = stmt.where(Chat.user_id == user_id)
        if start_datetime:
            stmt = stmt.where(Chat.date_updated >= start_datetime)
        if end_datetime:
            stmt = stmt.where(Chat.date_updated <= end_datetime)

        # Пагинация
        if limit:
            stmt = stmt.limit(limit)
        if offset:
            stmt = stmt.offset(offset)

        stmt = stmt.order_by(desc(Chat.date_updated))
        result = await session.execute(stmt)
        return result.scalars().fetchall()

    async def create_chat(self, session: AsyncSession, data: CreateChatSchema) -> Chat:
        """Создание чата"""
        chat = Chat(
            title=data.message[:50],
            user_id=data.user_id,
        )
        session.add(chat)
        await session.flush()

        await self.create_message(
            session,
            chat_id=chat.id,
            message=data.message,
            message_type=MessageTypeEnum.USER,
        )
        return chat

    async def delete_chat(self, session: AsyncSession, chat_id: int) -> None:
        stmt = delete(Chat).where(Chat.id == chat_id)
        await session.execute(stmt)
        await session.commit()

    async def create_chat_file(
            self, session: AsyncSession, ceph: Ceph, file_object: UploadFile, chat_id: int
    ):
        """Создание файла чата"""
        file_url = f"{settings.S3.chat_file_folder}/{uuid4()}/{file_object.filename}"
        await ceph.put_object(data=file_object.file, key=file_url)
        chat_file = ChatFile(
            chat_id=chat_id, file_url=file_url, file_name=file_object.filename
        )
        session.add(chat_file)

    async def create_message(
            self,
            session: AsyncSession,
            chat_id: int,
            message: str,
            message_type: MessageTypeEnum,
    ) -> Message:
        """Создание сообщения"""
        message = Message(
            chat_id=chat_id,
            message=message,
            message_type=message_type,
        )
        session.add(message)
        return message

    async def get_message(self, session: AsyncSession, chat_id: int) -> List[Message]:
        """Создание сообщения"""
        stmt = select(Message).where(Message.chat_id == chat_id)

        result = await session.execute(stmt)
        return result.scalars().fetchall()
