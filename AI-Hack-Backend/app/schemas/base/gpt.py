from app.schemas.base.base import BaseSchema


class GetMessageSchema(BaseSchema):
    message: str
    chat_id: int
