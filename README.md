## Архитектура и компоненты

Коротко: FastAPI-приложение с PostgreSQL (Patroni + HAProxy), кэш ленты в Redis, события через Kafka (Redpanda). Лента друзей формируется fan-out on write.

### Компоненты
- FastAPI приложение (uvicorn)
- PostgreSQL кластер (Patroni 3 ноды) + HAProxy:
  - 5432 — write (master)
  - 5433 — read (replicas)
- Redis — кэш ленты и постов
- Kafka (Redpanda) — события PostCreated/PostDeleted и FriendAdded/FriendRemoved
- Feed worker (Kafka consumer) — раскладывает посты в ленты, бэкфилл при дружбе, чистка при удалении

### Как работает кэш
- Кэш ленты: Redis ZSET `feed:{user_id}`
  - member = `post_id`, score = `created_at` (unix timestamp)
  - ограничение размера: `FEED_MAX_SIZE` с обрезкой (trim)
- Кэш постов: Redis key `post:{post_id}` = JSON поста с TTL (7 дней)

Потоки:
- Создание поста -> запись в БД -> событие PostCreated -> feed-worker: ZADD post_id в `feed:{follower_id}` всех подписчиков автора (score = created_at) -> TRIM
- Обновление поста -> перезапись `post:{id}` (SETEX)
- Удаление поста -> DEL `post:{id}` + событие PostDeleted -> feed-worker: ZREM post_id из `feed:{follower_id}`
- Добавление друга -> событие FriendAdded -> feed-worker: бэкфилл последних M постов друга в `feed:{user_id}` с корректным score
- Удаление друга -> событие FriendRemoved -> feed-worker: удаление последних M постов друга из `feed:{user_id}`

Чтение ленты (GET /api/v1/feed):
1) Берём список post_id из `feed:{user_id}` по offset/limit (ZREVRANGE)
2) MGET `post:{id}` батчем
3) Промахи (нет в кэше) -> SELECT из БД по id IN (...) и прогрев `post:{id}` (SETEX JSON)
4) Возвращаем посты в правильном порядке

### Запуск
- docker compose -f docker-compose-dev.yml up -d

