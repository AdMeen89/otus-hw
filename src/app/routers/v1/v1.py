from fastapi import APIRouter

from src.app.routers.v1.auth import auth_router
from src.app.routers.v1.users import users_router

v1_router = APIRouter(prefix="/api/v1")

v1_router.include_router(auth_router)
v1_router.include_router(users_router)
