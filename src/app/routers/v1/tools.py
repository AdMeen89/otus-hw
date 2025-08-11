from fastapi import APIRouter

from src.service.tools_service import ToolsService

router = APIRouter(tags=["Tools"])
tools_service = ToolsService()


@router.get("/health/db")
async def get_database_health():
    return await tools_service.get_database_health()


@router.post("/generate-users/{count}")
async def generate_users(count: int, use_selectivity: bool = False):
    result = await tools_service.generate_users(count, use_selectivity)
    return {"message": result}

@router.post("/generate-posts/all/{count_per_user}")
async def generate_posts_all(count_per_user: int = 3):
    total = await tools_service.generate_posts_for_all_users(count_per_user)
    return {"created": total}


@router.post("/generate-posts/user/{user_id}/{count}")
async def generate_posts_user(user_id: int, count: int = 10):
    created = await tools_service.generate_posts_for_user(user_id, count)
    return {"user_id": user_id, "created": created}