import functools
import logging
from typing import Callable

from starlette.requests import Request

from app.core.context import ApplicationContext


def handle_request(func: Callable) -> Callable:
    @functools.wraps(func)
    async def wrapper(instance, request: Request, *args, **kwargs):
        context: ApplicationContext = request.app.extra["context"]
        async with context.database.session_context() as session:
            context.session = session
            try:
                return await func(instance, context, *args, **kwargs)
            except Exception as error:
                logging.info(error)

    return wrapper
