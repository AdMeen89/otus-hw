from fastapi import APIRouter

from src.models.login import LoginRequest, LoginResponse
from src.service.auth_service import AuthService

auth_router = APIRouter(tags=["Authentication"])
auth_service = AuthService()


@auth_router.post("/login", response_model=LoginResponse)
async def login(user: LoginRequest):
    token = await auth_service.login(user)
    return LoginResponse(token=token)
