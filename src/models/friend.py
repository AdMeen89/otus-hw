from datetime import datetime
from pydantic import BaseModel

class UserFriend(BaseModel):
    user_id: int
    friend_id: int
    created_at: datetime
    updated_at: datetime