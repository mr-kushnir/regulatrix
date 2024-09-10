from datetime import datetime
from typing import Dict, List, Optional

from fastapi import Body, File, Form, Path, UploadFile

from app.core.enums import MessageTypeEnum
from app.schemas.base.base import BaseSchema


class ResponseMessageSchema(BaseSchema):
    id: int
    message: Optional[str] = None
    message_type: MessageTypeEnum
    date_created: datetime


class CreateChatSchema(BaseSchema):
    user_id: int
    message: str


class ResponseChatSchema(BaseSchema):
    id: int
    title: str
    date_created: datetime
    date_updated: datetime


class CreateMessageSchema(BaseSchema):
    message: str


class GetUserChatSchema(BaseSchema):
    start_datetime: Optional[datetime] = None
    end_datetime: Optional[datetime] = None
    limit: Optional[int] = None
    offset: Optional[int] = None
