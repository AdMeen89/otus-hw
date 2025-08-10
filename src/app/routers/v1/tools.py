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