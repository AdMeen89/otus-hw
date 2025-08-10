from fastapi import APIRouter, Depends

from src.models.common import SuccessResponse
from src.models.post import CreatePostRequest, UpdatePostRequest
from src.service.post_service import PostService
from src.database.deps import get_current_user_id

router = APIRouter(prefix="/posts", tags=["Posts"])
service = PostService()

@router.post("/post/create")
async def create_post(request: CreatePostRequest, user_id: int = Depends(get_current_user_id)):
    return await service.create_post(user_id, request.text)

@router.put("/post/update")
async def update_post(request: UpdatePostRequest, user_id: int = Depends(get_current_user_id)):
    return await service.update_post(user_id, request.text)

@router.delete("/post/delete/{post_id}")
async def delete_post(post_id: int, user_id: int = Depends(get_current_user_id)):
    await service.delete_post(user_id, post_id)
    return SuccessResponse()

@router.get("/post/get/{post_id}")
async def get_post(post_id: int):
    return await service.get_post(post_id)