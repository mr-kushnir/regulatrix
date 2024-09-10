from fastapi import APIRouter, Depends
from starlette.requests import Request

from app.core.context import ApplicationContext
from app.schemas.user import (AuthorizeUserSchema, CreateUserResponseSchema,
                              CreateUserSchema, ResponseUserSchema)
from app.services.user_service import UserService

user_router = APIRouter(prefix="/api", tags=["user"])


@user_router.get("/user/{user_login}", description="Получение пользователя")
async def get_user(
    request: Request,
    user_login: str,
    service: UserService = Depends(),
    context: ApplicationContext = Depends(ApplicationContext.get_context),
) -> ResponseUserSchema:
    return await service.get_user(context, user_login)


@user_router.post("/user/registration", description="Создание пользователя")
async def registration(
    request: Request,
    user_data: CreateUserSchema,
    service: UserService = Depends(),
    context: ApplicationContext = Depends(ApplicationContext.get_context),
) -> CreateUserResponseSchema:
    return await service.create_user(context, data=user_data)


@user_router.post("/user/authorize", description="Авторизация пользователя")
async def authorize(
    request: Request,
    user_data: AuthorizeUserSchema,
    service: UserService = Depends(),
    context: ApplicationContext = Depends(ApplicationContext.get_context),
) -> ResponseUserSchema:
    return await service.authorize(context, data=user_data)
