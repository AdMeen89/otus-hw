from fastapi import APIRouter

from src.models.user import UserObject, CreateUserRequest
from src.service.user_service import UserService

users_router = APIRouter(prefix="/user", tags=["Users"])
user_service = UserService()


@users_router.get("/get/{user_id}", response_model=UserObject)
async def get_user(user_id: int):
    return await user_service.get_user(user_id)


@users_router.post("/register", response_model=UserObject)
async def create_user(user: CreateUserRequest):
    return await user_service.create_user(user)
