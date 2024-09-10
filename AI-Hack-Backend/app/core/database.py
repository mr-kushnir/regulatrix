import logging
from contextlib import asynccontextmanager
from typing import Any, Dict, Optional

from sqlalchemy import NullPool
from sqlalchemy.ext.asyncio import (AsyncEngine, AsyncSession,
                                    async_engine_from_config)
from sqlalchemy.ext.asyncio import create_async_engine as _create_async_engine
from sqlalchemy.orm import sessionmaker

from app.config import settings


def get_db_url(settings) -> str:
    return f"{settings.driver}://{settings.user}:{settings.password}@{settings.host}:{settings.port}/{settings.database}"


def create_async_engine(
    settings,
    db_url: Optional[str] = None,
    configuration: Optional[Dict[str, Any]] = None,
) -> AsyncEngine:
    if not configuration:
        async_engine = _create_async_engine(
            url=db_url or get_db_url(settings),
            echo=settings.echo,
            future=True,
            pool_pre_ping=settings.pool_pre_ping,
            pool_recycle=settings.pool_recycle,
            poolclass=NullPool,
        )
    else:
        async_engine = async_engine_from_config(
            configuration,
            prefix="sqlalchemy.",
            poolclass=NullPool,
        )
    return async_engine


class Database:
    def __init__(self, settings, db_url: Optional[str] = None):
        self.settings = settings
        self.db_url = db_url
        self._session = None
        self._engine = None

    def _connect(self):
        """Инициализация подключения к базе данных"""
        logging.info("Инициализировано подключение к базе данных")
        self._engine = create_async_engine(settings.POSTGRES, db_url=self.db_url)
        self._session = sessionmaker(
            bind=self._engine,
            expire_on_commit=False,
            autoflush=False,
            autocommit=False,
            class_=AsyncSession,
        )

    async def _close(self) -> None:
        """Закрытие подключения к базе данных"""
        logging.info("Закрытие подключения к базе данных")
        if self._engine:
            await self._engine.dispose()

    @asynccontextmanager
    async def session_context(self):
        session = self._session()
        try:
            yield session
            await session.commit()
        except Exception as exc:
            await session.rollback()
            logging.info("Необработанное исключение: %s", str(exc))
            raise exc
        finally:
            await session.close()
