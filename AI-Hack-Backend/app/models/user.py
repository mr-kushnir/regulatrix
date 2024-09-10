from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.models.base.base import BaseModel
from app.models.chat import ChatFile


class User(BaseModel):
    """Пользователь"""

    login = Column(String, comment="Логин пользователя")
    user_name = Column(String, comment="Имя пользователя")
    password = Column(String, comment="Пароль")
    file_url = Column(String, comment="Ссылка на изображение пользователя")
    file_name = Column(String, comment="Наименование изображения")
    chats = relationship(
        "Chat",
        lazy="subquery",
        order_by="Chat.date_updated",
    )
