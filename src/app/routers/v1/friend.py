from fastapi import APIRouter, Depends

from src.models.common import SuccessResponse
from src.service.friend_service import FriendService
from src.database.deps import get_current_user_id

router = APIRouter(prefix="/friends", tags=["Friends"])
service = FriendService()

@router.put("/set/{friend_id}")
async def create_friend(friend_id: int, user_id: int = Depends(get_current_user_id)):
    await service.set_friend(user_id, friend_id)
    return SuccessResponse()

@router.delete("/delete/{friend_id}")
async def delete_friend(friend_id: int, user_id: int = Depends(get_current_user_id)):
    await service.delete_friend(user_id, friend_id)
    return SuccessResponse()

@router.get("")
async def get_friends(user_id: int = Depends(get_current_user_id)):
    return await service.get_friends(user_id)