from datetime import date, datetime
from pydantic import BaseModel

from src.models.mixins import PasswordHashMixin


class CreateUserRequest(BaseModel, PasswordHashMixin):
    password: str
    first_name: str
    last_name: str
    birthday: date
    gender: str
    interests: str
    city: str


class UserObject(BaseModel):
    id: int
    first_name: str
    last_name: str
    birthday: date
    gender: str
    interests: str
    city: str
    created_at: datetime
    updated_at: datetime
