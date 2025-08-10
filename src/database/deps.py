from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.service.auth_service import AuthService

security = HTTPBearer(auto_error=True)
auth_service = AuthService()

async def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)) -> int:
    token = credentials.credentials
    try:
        return auth_service._jwt_verify_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")