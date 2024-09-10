import asyncio
from typing import Optional

import pytest
from alembic.command import upgrade
from fastapi import FastAPI
from fastapi.testclient import TestClient
from yarl import URL

from app.config import settings
from app.core.context import ApplicationContext
from app.core.database import Database, get_db_url
from app.models import Food, FoodCategory, Topping
from app.models.base.base import BaseModel
from app.models.references.topping_food_references import ToppingFoodReference
from app.routers import foods
from app.tests.utils import alembic_config_from_url, tmp_database

MIGRATION_TASK: Optional[asyncio.Task] = None


@pytest.fixture()
def pg_url() -> URL:
    """
    Provides base PostgreSQL URL for creating temporary databases.
    """

    return URL(get_db_url(settings.POSTGRES))


@pytest.fixture
async def empty_temp_db(pg_url):
    """
    Создаем пустую временную БД для теста миграций
    """

    async with tmp_database(db_url=pg_url, suffix="pytest_migration") as tmp_url:
        yield tmp_url


@pytest.fixture
def test_db_alembic_config(empty_temp_db):
    """
    Связываем конфигурационный файл alembic с пустой временной БД
    """

    return alembic_config_from_url(pg_url=empty_temp_db)


@pytest.fixture()
async def migrated_postgres_template(pg_url):
    """
    Creates temporary database and applies migrations.
    Has "session" scope, so is called only once per tests run.
    """

    async with tmp_database(pg_url, "migrated_template") as tmp_url:
        alembic_config = alembic_config_from_url(tmp_url)
        upgrade(alembic_config, "head")
        await MIGRATION_TASK
        yield tmp_url


@pytest.fixture
async def migrated_temp_db(pg_url, migrated_postgres_template):
    """
    Copy a clean database with migrations using a database template.
    The fixture is used for tests where a clean database with migrations is needed.
    """

    template_db_name = URL(migrated_postgres_template).name
    async with tmp_database(
        db_url=pg_url, suffix="pytest_db", template=template_db_name
    ) as tmp_url:
        yield tmp_url


@pytest.fixture
async def db_context(migrated_temp_db):
    database = Database(settings.POSTGRES, db_url=migrated_temp_db)
    database._connect()
    yield database
    await database._close()


@pytest.fixture
async def db_session(db_context):
    async with db_context.session_context() as session:
        yield session
        await session.rollback()


@pytest.fixture
def client_context(db_context) -> ApplicationContext:
    return ApplicationContext(database=db_context)


@pytest.fixture
def make_food_category(db_session):
    async def create_food_category(**_kwargs) -> FoodCategory:
        food_category = FoodCategory(name="Наименование категории", is_publish=False)
        db_session.add(food_category)
        await db_session.commit()
        return food_category

    return create_food_category


@pytest.fixture
def make_food(db_session, make_food_category):
    async def create_food(**_kwargs) -> FoodCategory:
        food_category = await make_food_category()
        food = Food(
            name="Наименование блюда",
            description="Описание блюда",
            price=200,
            is_special=False,
            is_vegan=True,
            is_publish=True,
            category_id=food_category.id,
        )
        db_session.add(food)
        await db_session.commit()
        return food

    return create_food


@pytest.fixture
def rest_client(client_context):
    app = FastAPI()
    app.include_router(foods.router)
    app.extra["context"] = client_context
    with TestClient(app, raise_server_exceptions=False) as client:
        yield client
