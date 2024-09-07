from logging.config import dictConfig

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers.message_router import message_router


class Application:
    def __init__(self):
        self.app = FastAPI()

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

    def _add_routers(self) -> None:
        """Добавление роутеров"""
        self.app.include_router(message_router)

    def init_app(self) -> FastAPI:
        self._add_middlewares()
        self._add_routers()
        self._init_logger()
        return self.app


app = Application().init_app()
