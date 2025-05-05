from pydantic import BaseModel


class LoginRequest(BaseModel):
    id: int
    password: str


class LoginResponse(BaseModel):
    token: str
