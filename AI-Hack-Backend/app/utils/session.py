from typing import (Any, Dict, Iterable, List, Optional, Sequence, Set, Type,
                    Union)

from sqlalchemy import Select, delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import ColumnProperty

from app.models.base.base import Base, BaseModel


async def fetch_instances(
    session: AsyncSession,
    instance_ids: Optional[Iterable[int]] = None,
    model: Optional[Type[BaseModel]] = None,
    attribute: Optional[str] = "id",
    unique: bool = False,
    stmt: Optional[Select] = None,
) -> Sequence[BaseModel]:
    """Получение списка записей
    @param session: Сессия базы данных
    @param instance_ids: Идентификаторы искомых записей
    @param model: Модель искомой записи
    @param attribute: Поле поиска
    @param unique: Флаг, отвечающий за уникальность получения записей
    @param stmt: Кастомный SQL запрос

    Варианты необходимых аргументов для создания запроса:
    – С аргументом model (получение полного списка записей)
    – С аргументом model + instance_id (получение списка записей с конкретными идентификаторами)
    – С аргументом stmt (select(CoastalWarning).where(..)) (получение списка записей, удовлетворяющие условию)
    """
    if instance_ids is not None and model is None:
        raise ValueError(
            "Для формирования запроса с конкретными идентификаторами, требуется модель искомой записи"
        )

    if model is not None and stmt is not None:
        raise ValueError("Для формирования запроса используется кастомный SQL запрос")

    if stmt is None:
        stmt = select(model)

    if instance_ids is not None:
        stmt = stmt.where(getattr(model, attribute).in_(instance_ids))

    result = await session.execute(stmt)
    if unique:
        result = result.unique()
    return result.scalars().all()


async def fetch_instance(
    session: AsyncSession, model: Type[BaseModel], instance_id: int
) -> BaseModel:
    """Получение конкретной записи
    @param session: Сессия базы данных
    @param model: Модель искомой записи
    @param instance_id: Идентификатор искомой записи
    """
    return (
        await session.execute(select(model).where(model.id == instance_id))
    ).scalar_one_or_none()


async def delete_instance(
    session: AsyncSession,
    instance_id: int,
    model: Base,
) -> None:
    """Удаление записи"""
    await session.execute(delete(model).where(model.id == instance_id))


def update_instance_fields(instance: BaseModel, new_fields: Dict[str, Any]) -> None:
    """Обновление полей модели"""
    model = type(instance)
    for attribute, new_value in new_fields.items():
        model_field = model.__dict__.get(attribute)
        if model_field and isinstance(model_field.property, ColumnProperty):
            if getattr(instance, attribute) != new_value:
                setattr(instance, attribute, new_value)
