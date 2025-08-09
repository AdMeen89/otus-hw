from fastapi import FastAPI
import uvicorn
from contextlib import asynccontextmanager

from src.app.routers.v1.v1 import v1_router
from src.database.connection import init_database, close_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Управление жизненным циклом приложения"""
    # Startup
    await init_database()
    yield
    # Shutdown
    await close_database()


app = FastAPI(lifespan=lifespan)

app.include_router(v1_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
