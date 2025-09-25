Dialogs microservice
====================

Run
---
- uvicorn dialogs_app.app:app --host 0.0.0.0 --port 8081

Config
------
- SECRET_KEY
- DIALOGS_CITUS_URL
- DIALOGS_HOT_CITUS_URL
- REDIS_URL
- HOT_PAIR_RATE_LIMIT (default 30/min)
- HOT_PAIR_WINDOW_SEC (default 60)
- HOT_PAIR_TTL_SEC (default 180)

Testing hotness
---------------
1) Авторизуйтесь токеном из монолита (клейм user_id).
2) POST /tools/messages/create — с небольшим rps добиться превышения порога.
3) GET /admin/hot/users — пользователь появится в списке горячих.
4) Новые сообщения будут маршрутизированы в hot‑кластер до истечения TTL.


