from datetime import datetime, timezone
from functools import partial

from sqlalchemy import (Column, DateTime, Enum, ForeignKey, Integer, String,
                        Text, func)
from sqlalchemy.orm import relationship

from app.core.enums import MessageTypeEnum
from app.models.base.base import BaseModel


class ChatFile(BaseModel):
    """Файл чата"""

    chat_id = Column(
        Integer, ForeignKey("chat.id", ondelete="CASCADE"), comment="Идентификатор чата"
    )
    file_url = Column(String, nullable=False, comment="Ссылка на файл")
    file_name = Column(String, nullable=False, comment="Наименование файла")


class Message(BaseModel):
    """Сообщение"""

    chat_id = Column(
        Integer, ForeignKey("chat.id", ondelete="CASCADE"), comment="Идентификатор чата"
    )
    message = Column(Text, nullable=True, comment="Сообщение")
    message_type = Column(
        Enum(MessageTypeEnum), nullable=False, comment="Тип сообщения"
    )
    date_created = Column(DateTime(timezone=True), server_default=func.now())


class Chat(BaseModel):
    """Чат"""

    context = Column(Text, nullable=True, comment="Контекст чата")
    title = Column(Text, nullable=False, comment="Заголовок чата")
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))
    date_created = Column(DateTime(timezone=True), server_default=func.now())
    date_updated = Column(
        DateTime(timezone=True),
        nullable=False,
        default=partial(datetime.now, timezone.utc),
        server_default=func.now(),
        onupdate=datetime.now(timezone.utc).astimezone,
    )
    files = relationship(
        "ChatFile",
        lazy="subquery",
        order_by="ChatFile.id",
    )
    messages = relationship(
        "Message",
        lazy="subquery",
        order_by="Message.date_created",
    )
