import uuid
from typing import Callable
from fastapi import Request, Response


async def request_id_middleware(request: Request, call_next: Callable):
    request_id = request.headers.get("x-request-id") or str(uuid.uuid4())
    response: Response = await call_next(request)
    response.headers["x-request-id"] = request_id
    return response


