from fastapi import HTTPException
from sqlalchemy import select
from starlette import status

from app.core.context import ApplicationContext
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import AuthorizeUserSchema, CreateUserSchema
from app.validation.user_validation import validate_user_data_by_login


class UserService:
    def __init__(self):
        self.user_repository = UserRepository()

    async def get_user(self, context: ApplicationContext, user_login: str) -> User:
        async with context.database.session_context() as session:
            user = await self.user_repository.get_user_by_login(session, user_login)
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Данный пользователь не найден",
                )
        return user

    async def create_user(
        self, context: ApplicationContext, data: CreateUserSchema
    ) -> User:
        async with context.database.session_context() as session:
            await validate_user_data_by_login(session, data.login)
            return await self.user_repository.create_user(session, data)

    async def authorize(
        self, context: ApplicationContext, data: AuthorizeUserSchema
    ) -> User:
        async with context.database.session_context() as session:
            user = (
                await session.execute(select(User).where(User.login == data.login))
            ).scalar()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Данный пользователь не найден",
            )
        if not self.user_repository.check_password(data.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Неправильный пароль",
            )
        return user
