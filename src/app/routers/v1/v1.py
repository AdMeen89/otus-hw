from fastapi import APIRouter

from src.app.routers.v1.auth import auth_router
from src.app.routers.v1.users import users_router
from src.app.routers.v1.tools import router as tools_router
from src.helpers.settings import settings

v1_router = APIRouter(prefix="/api/v1")

v1_router.include_router(auth_router)
v1_router.include_router(users_router)
v1_router.include_router(tools_router, prefix="/tools")

# Load balancer endpoints только при включенной репликации
if settings.enable_replication:
    from src.app.routers.v1.load_balancer import router as load_balancer_router
    v1_router.include_router(load_balancer_router, prefix="/load-balancing")