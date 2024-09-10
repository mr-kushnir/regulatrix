from dataclasses import dataclass
from typing import Optional

from starlette.requests import Request

from app.core.ceph import Ceph


@dataclass
class ApplicationContext:
    ceph: Optional[Ceph] = None

    @staticmethod
    async def get_context(request: Request) -> "ApplicationContext":
        return request.app.extra["context"]
