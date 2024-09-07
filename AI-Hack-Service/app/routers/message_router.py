from fastapi import APIRouter, Request, Depends

from app.services.message_service import MessageService

message_router = APIRouter(prefix="/api", tags=["message"])


@message_router.post("/message")
async def listen_message(
        request: Request,
        message: str,
        service: MessageService = Depends(),
):
    return await service.process_message(message)
