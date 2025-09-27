from src.domain.models.dialogs import Dialog
from pydantic import BaseModel

class DialogResponse(Dialog):
    pass

class SendMessageRequest(BaseModel):
    message: str