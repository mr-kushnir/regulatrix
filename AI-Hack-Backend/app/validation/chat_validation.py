from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.chat import Chat
from app.utils.session import fetch_instance


async def validate_chat_data(session: AsyncSession, chat_id: int) -> Chat:
    chat = await fetch_instance(session, model=Chat, instance_id=chat_id)
    if not chat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Данный чат не существует"
        )
    return chat
