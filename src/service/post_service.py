from fastapi import HTTPException
from src.models.post import Post
from src.providers.post_provider import PostProvider

class PostService:
    def __init__(self) -> None:
        self.post_provider = PostProvider()

    async def create_post(self, user_id: int, text: str) -> Post:
        inserted_post = await self.post_provider.create(user_id, text)
        print(inserted_post)
        return Post(**inserted_post)

    async def update_post(self, user_id: int, text: str) -> Post:
        updated_post = await self.post_provider.update(user_id, text)
        return Post(**updated_post)
    
    async def delete_post(self, user_id: int, post_id: int) -> None:
        await self.post_provider.delete(user_id, post_id)

    async def get_post(self, post_id: int) -> Post:
        post = await self.post_provider.get(post_id)
        if post is None:
            raise HTTPException(status_code=404, detail="Post not found")
        return Post(**post)