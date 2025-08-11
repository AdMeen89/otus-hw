from datetime import date, datetime
from pydantic import BaseModel

from src.models.mixins import PasswordHashMixin

class User(BaseModel):
    first_name: str
    last_name: str
    birthday: date
    gender: str
    interests: str
    city: str

class CreateUserRequest(User):
    password: str

class CreateUserResponseAutoPassword(CreateUserRequest, PasswordHashMixin):
    pass


class UserObject(User):
    id: int
    created_at: datetime
    updated_at: datetime