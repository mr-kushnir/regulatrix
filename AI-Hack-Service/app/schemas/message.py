from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel

from app.core.enums import MessageTypeEnum


class ResponseMessageSchema(BaseModel):
    id: int
    message: Optional[str] = None
    message_type: MessageTypeEnum
    date_created: datetime


class DataSchema(BaseModel):
    message: str
    context: List[ResponseMessageSchema] = []
