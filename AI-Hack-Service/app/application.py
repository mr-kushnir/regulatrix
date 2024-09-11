from logging.config import dictConfig

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers.message_router import message_router
from app.core.ceph import Ceph
from app.core.context import ApplicationContext
from app.core.artificial_intelligence import AIService


class Application:
    def __init__(self):
        self.app = FastAPI()
        self.ceph = Ceph(settings.S3)
        self.AI = AIService()

    def _init_logger(self) -> None:
        """Инициализация логгера"""
        dictConfig(settings.LOGGING)

    def _add_middlewares(self) -> None:
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=[
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://0.0.0.0:5173",
                "http://portainer.regulatrix.ru:5167",
            ],
            allow_credentials=True,
            allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
            allow_headers=["*"],
        )

    def _init_context(self):
        return ApplicationContext(
            ceph=self.ceph,
            AI=self.AI,
        )

    def _add_routers(self) -> None:
        """Добавление роутеров"""
        self.app.include_router(message_router)

    def init_app(self) -> FastAPI:
        self._add_middlewares()
        self._add_routers()
        self._init_logger()
        self.app.extra["context"] = self._init_context()
        return self.app


app = Application().init_app()
