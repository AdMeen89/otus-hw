from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.service.auth_service import AuthService


security = HTTPBearer(auto_error=False)
auth_service = AuthService()


async def get_current_user_id(credentials: HTTPAuthorizationCredentials | None = Depends(security)) -> int:
    if credentials is None or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Not authenticated", headers={"WWW-Authenticate": "Bearer"})
    token = credentials.credentials
    try:
        return auth_service._jwt_verify_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token", headers={"WWW-Authenticate": "Bearer"})