from fastapi import APIRouter, Depends
from typing import List
from src.models.post import Post
from src.service.feed_service import FeedService
from src.database.deps import get_current_user_id


router = APIRouter(prefix="/feed", tags=["Feed"])
service = FeedService()


@router.get("", response_model=List[Post])
async def get_my_feed(limit: int = 20, offset: int = 0, user_id: int = Depends(get_current_user_id)):
    return await service.get_feed(user_id, limit, offset)


