from typing import Optional

import bcrypt
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.schemas.user import CreateUserSchema
from app.utils.session import fetch_instance

UTF = "utf-8"


class UserRepository:
    async def create_user(self, session: AsyncSession, data: CreateUserSchema) -> User:
        """Создание пользователя"""
        hashed_password = self.hash_password(data.password)
        user = User(
            **data.model_dump(exclude={"file", "password"}), password=hashed_password
        )
        session.add(user)
        return user

    @staticmethod
    async def get_user_by_id(session: AsyncSession, user_id: int) -> Optional[User]:
        """Получение пользователя по ID"""
        return await fetch_instance(session, model=User, instance_id=user_id)

    @staticmethod
    async def get_user_by_login(
            session: AsyncSession, user_login: str
    ) -> Optional[User]:
        """Получение пользователя по логину"""
        return (
            await session.execute(select(User).where(User.login == user_login))
        ).scalar_one_or_none()

    @staticmethod
    def hash_password(password: str) -> str:
        """Хеширование пароля"""
        hashed_password = bcrypt.hashpw(password.encode(UTF), bcrypt.gensalt())
        return hashed_password.decode(UTF)

    @staticmethod
    def check_password(password: str, hashed_password: str) -> bool:
        """Проверка пароля на схожесть"""
        if bcrypt.checkpw(password.encode(UTF), hashed_password.encode(UTF)):
            return True
