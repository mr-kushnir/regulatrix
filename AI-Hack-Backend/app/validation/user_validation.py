from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.models.user import User
from app.utils.session import fetch_instance


async def validate_user_data_by_login(session: AsyncSession, login: str) -> None:
    user = (await session.execute(select(User).where(User.login == login))).scalar()
    if user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Аккаунт с данным логином уже существует",
        )


async def validate_user_data_by_id(session: AsyncSession, user_id: int) -> User:
    user = await fetch_instance(session, model=User, instance_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Аккаунт с данным идентификатором отсутствует",
        )
    return user
