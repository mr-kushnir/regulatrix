from fastapi import APIRouter, Depends, Request

from app.core.context import ApplicationContext
from app.schemas.base.gpt import GetMessageSchema
from app.schemas.chat import ResponseMessageSchema
from app.services.gpt_service import GPTService

gpt_router = APIRouter(prefix="/api", tags=["chat"])


@gpt_router.post("/gpt/chat", description="Получение ответа на сообщение от AI")
async def get_response_from_gpt(
    request: Request,
    message: GetMessageSchema,
    service: GPTService = Depends(),
    context: ApplicationContext = Depends(ApplicationContext.get_context),
) -> ResponseMessageSchema:
    return await service.get_response(context, message)
