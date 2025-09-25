from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import os


security = HTTPBearer(auto_error=False)


def _get_secret() -> str:
    secret = os.getenv("SECRET_KEY")
    if not secret:
        raise RuntimeError("SECRET_KEY not set")
    return secret


async def get_current_user_id(credentials: HTTPAuthorizationCredentials | None = Depends(security)) -> int:
    if credentials is None or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Not authenticated", headers={"WWW-Authenticate": "Bearer"})
    token = credentials.credentials
    try:
        return jwt.decode(token, _get_secret(), algorithms=["HS256"])['user_id']
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token", headers={"WWW-Authenticate": "Bearer"})


