from typing import List
from fastapi import HTTPException
from src.models.user import UserObject, CreateUserRequest
from src.providers.user_provider import UserProvider


class UserService:
    def __init__(self):
        self.user_provider = UserProvider()

    async def get_user(self, user_id: int) -> UserObject:
        user = await self.user_provider.get_by_id(user_id)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return UserObject(**dict(user))

    async def create_user(self, user: CreateUserRequest) -> UserObject:
        user = await self.user_provider.create(user.model_dump())
        return UserObject(**dict(user))
    
    async def search_users_by_first_and_last_names(self, first_name: str, last_name: str) -> List[UserObject]:
        users = await self.user_provider.search_by_first_and_last_names(first_name, last_name)
        return [UserObject(**dict(user)) for user in users]
