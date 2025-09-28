from fastapi import APIRouter, Depends
from src.api.deps.deps import get_dialogs_service, get_rebalance_service
from src.services.dialogs_service import DialogsService 
from src.services.hot_pairs_rebalance_service import HotPairsRebalanceService

tools_router = APIRouter(prefix="/tools", tags=["Tools"])

@tools_router.get("/hot/pairs")
async def get_hot_users(dialogs_service: DialogsService = Depends(get_dialogs_service)):
    return {"pairs": await dialogs_service.get_hot_users()}

@tools_router.post("/hot/{pair_key}/rebalance")
async def rebalance_hot_pair(pair_key: int, rebalance_service: HotPairsRebalanceService = Depends(get_rebalance_service)):
    try:
        await rebalance_service.rebalance_pair(pair_key)
        return {"message": "Pair rebalanced successfully"}
    except Exception as exc:
        return {"message": f"Failed to rebalance pair {pair_key}: {exc}"}