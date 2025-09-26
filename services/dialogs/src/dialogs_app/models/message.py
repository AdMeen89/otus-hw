from datetime import datetime
from pydantic import BaseModel


class SendMessageRequest(BaseModel):
    text: str


class DialogResponse(BaseModel):
    id: int
    pair_key: int
    from_user: int
    to_user: int
    last_message: str
    updated_at: datetime


class GenerateMessagesRequest(BaseModel):
    from_user: int
    to_user: int
    count: int = 100
    rps: int = 50


class GenerateMessagesResponse(BaseModel):
    from_user: int
    to_user: int
    generated: int
    rps: int
    duration_sec: float
