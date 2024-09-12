from fastapi import APIRouter, Request, Depends

from app.services.message_service import MessageService
from app.core.context import ApplicationContext
from app.schemas.message import DataSchema

message_router = APIRouter(prefix="/api", tags=["message"])


@message_router.post("/message")
async def listen_message(
        request: Request,
        message: DataSchema,
        service: MessageService = Depends(),
        context: ApplicationContext = Depends(ApplicationContext.get_context)
):
    print()
    return await service.process_message(context, message)
