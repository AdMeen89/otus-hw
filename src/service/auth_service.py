import bcrypt
import jwt
from fastapi import HTTPException
from src.models.login import LoginRequest
from src.providers.user_provider import UserProvider
from src.helpers.settings import settings


class AuthService:
    def __init__(self):
        self.user_provider = UserProvider()

    async def login(self, user_in: LoginRequest) -> str:
        user = await self.user_provider.get_by_id(user_in.id)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        if not bcrypt.checkpw(user_in.password.encode(), user["password_hash"].encode()):
            raise HTTPException(status_code=401, detail="Invalid password")
        return self._jwt_create_token(user["id"])

    def _jwt_create_token(self, user_id: int) -> str:
        return jwt.encode({"user_id": user_id}, settings.secret_key, algorithm="HS256")

    def _jwt_verify_token(self, token: str) -> int:
        return jwt.decode(token, settings.secret_key, algorithms=["HS256"])["user_id"]
