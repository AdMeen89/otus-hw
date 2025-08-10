from fastapi import APIRouter

from src.app.routers.v1.auth import auth_router
from src.app.routers.v1.users import users_router
from src.app.routers.v1.tools import router as tools_router
from src.app.routers.v1.friend import router as friend_router
from src.app.routers.v1.post import router as post_router

v1_router = APIRouter(prefix="/api/v1")

v1_router.include_router(auth_router)
v1_router.include_router(users_router)
v1_router.include_router(friend_router)
v1_router.include_router(tools_router, prefix="/tools")
v1_router.include_router(post_router)