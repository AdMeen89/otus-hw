from pydantic import BaseModel
from datetime import datetime

class Dialog(BaseModel):
    id: int
    pair_key: int
    from_user: int
    to_user: int
    message: str
    created_at: datetime

class MessageCreate(BaseModel):
    pair_key: int
    from_user: int
    to_user: int
    message: str