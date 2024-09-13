from typing import (
    Any,
    Dict,
)

from fastapi import (
    APIRouter,
    Request,
)
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi
from starlette.responses import HTMLResponse

documentation = APIRouter(prefix="/api", tags=["documentation"])


@documentation.get("/wiki", include_in_schema=False)
async def get_documentation(request: Request) -> HTMLResponse:
    return get_swagger_ui_html(openapi_url="/api/openapi.json", title="docs")


@documentation.get("/openapi.json", include_in_schema=False)
async def openapi(request: Request) -> Dict[str, Any]:
    from app.application import app

    return get_openapi(title=app.title, version=app.version, routes=app.routes)
