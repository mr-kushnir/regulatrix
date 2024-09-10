from typing import List, Optional

from fastapi import UploadFile

from app.schemas.base.base import BaseSchema
from app.schemas.chat import ResponseChatSchema


class BaseUserSchema(BaseSchema):
    user_name: str


class CreateUserSchema(BaseUserSchema):
    login: str
    password: str


class AuthorizeUserSchema(BaseSchema):
    login: str
    password: str


class CreateUserResponseSchema(BaseUserSchema):
    user_name: str
    id: int


class ResponseUserSchema(BaseUserSchema):
    id: int
    file_url: Optional[str] = None
    chats: List[ResponseChatSchema] = []
