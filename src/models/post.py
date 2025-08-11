from datetime import datetime
from pydantic import BaseModel

class CreatePostRequest(BaseModel):
    text: str

class UpdatePostRequest(BaseModel):
    id: int
    text: str

class Post(BaseModel):
    id: int
    user_id: int
    text: str
    created_at: datetime