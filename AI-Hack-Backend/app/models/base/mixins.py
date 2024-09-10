from sqlalchemy.orm import declared_attr

from app.models.base.utils import get_snake_case


class DeclareMixin:
    @declared_attr
    def __tablename__(cls):
        return get_snake_case(cls.__name__)

    @declared_attr
    def __table_args__(cls):
        return {"comment": cls.__doc__.strip()}
