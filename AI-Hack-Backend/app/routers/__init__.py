from app.routers.chat_router import chat_router
from app.routers.documentation import documentation
from app.routers.gpt_router import gpt_router
from app.routers.user_router import user_router

ROUTERS = [user_router, chat_router, gpt_router, documentation]
