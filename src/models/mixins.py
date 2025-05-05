from pydantic import field_validator
import bcrypt


class PasswordHashMixin:
    @field_validator("password", mode="before")
    @classmethod
    def hash_password(cls, password: str):
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode(), salt).decode()
