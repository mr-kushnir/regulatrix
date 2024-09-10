from sqlalchemy import Column, Integer
from sqlalchemy.ext.declarative import declarative_base

from app.models.base.mixins import DeclareMixin

Base = declarative_base()


class BaseModel(Base, DeclareMixin):
    __abstract__ = True

    id = Column(Integer, primary_key=True, autoincrement=True, comment="Идентификатор")
