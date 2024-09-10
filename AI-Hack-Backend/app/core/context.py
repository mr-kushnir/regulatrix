from dataclasses import dataclass
from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession
from starlette.requests import Request

from app.core.ceph import Ceph
from app.core.database import Database


@dataclass
class ApplicationContext:
    database: Optional[Database] = None
    ceph: Optional[Ceph] = None
    session: Optional[AsyncSession] = None

    @staticmethod
    async def get_context(request: Request) -> "ApplicationContext":
        return request.app.extra["context"]
