from fastapi import APIRouter

tools_router = APIRouter(prefix="/tools", tags=["Tools"])

@tools_router.get("/hot/users")
async def get_hot_users():
    return {"message": "Hello, World!"}