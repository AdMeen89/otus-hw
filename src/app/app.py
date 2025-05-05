from fastapi import FastAPI
import uvicorn

from src.app.routers.v1.v1 import v1_router

app = FastAPI()

app.include_router(v1_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
