from fastapi import APIRouter, Request, Depends

from app.services.message_service import MessageService
from app.core.context import ApplicationContext
from app.schemas.message import MessageSchema

message_router = APIRouter(prefix="/api", tags=["message"])


@message_router.post("/message")
async def listen_message(
        request: Request,
        message: MessageSchema,
        service: MessageService = Depends(),
        context: ApplicationContext = Depends(ApplicationContext.get_context)
):
    return await service.process_message(context,message)
