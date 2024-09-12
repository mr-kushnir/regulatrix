from typing import List

from app.schemas.base.base import BaseSchema
from app.schemas.chat import ResponseMessageSchema


class GPTRequestContextSchema(BaseSchema):
    message: str
    context: List[ResponseMessageSchema] = []
