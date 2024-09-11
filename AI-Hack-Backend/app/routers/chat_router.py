from typing import List, Optional

from fastapi import APIRouter, Depends, Path
from fastapi.openapi.models import Response
from starlette.requests import Request

from app.core.context import ApplicationContext
from app.schemas.chat import (CreateChatSchema, CreateMessageSchema,
                              ResponseChatSchema, ResponseMessageSchema)
from app.services.chat_service import ChatService

chat_router = APIRouter(prefix="/api", tags=["chat"])


@chat_router.post("/chat", description="Создание чата")
async def create_chat(
        request: Request,
        chat_data: CreateChatSchema,
        service: ChatService = Depends(),
        context: ApplicationContext = Depends(ApplicationContext.get_context),
):
    return await service.create_chat(context, chat_data)


@chat_router.post("/chat/{chat_id}/create_message", description="Создание сообщения")
async def create_message(
        request: Request,
        chat_data: CreateMessageSchema,
        chat_id: int = Path(...),
        service: ChatService = Depends(),
        context: ApplicationContext = Depends(ApplicationContext.get_context),
) -> ResponseMessageSchema:
    return await service.add_message_to_chat(context, chat_data, chat_id)


@chat_router.get(
    "/user/{user_id}/chats", description="Получение чатов конкретного пользователя"
)
async def get_chats(
        request: Request,
        user_id: int = Path(...),
        service: ChatService = Depends(),
        context: ApplicationContext = Depends(ApplicationContext.get_context),
        search_text: Optional[str] = None
) -> List[ResponseChatSchema]:
    return await service.get_user_chats(context, user_id, search_text=search_text)


@chat_router.get(
    "/chat/{chat_id}/messages", description="Получение чатов конкретного пользователя"
)
async def get_messages(
        request: Request,
        chat_id: int = Path(...),
        service: ChatService = Depends(),
        context: ApplicationContext = Depends(ApplicationContext.get_context),
) -> List[ResponseMessageSchema]:
    return await service.get_message_from_chat(context, chat_id)


@chat_router.delete(
    "/user/{user_id}/chat/{chat_id}",
    description="Удаление чата конкретного пользователя",
)
async def delete_chat(
        request: Request,
        user_id: int = Path(...),
        chat_id: int = Path(...),
        service: ChatService = Depends(),
        context: ApplicationContext = Depends(ApplicationContext.get_context),
) -> Response:
    return await service.delete_user_chat(context, user_id, chat_id)
