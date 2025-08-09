#!/bin/bash
set -e

# Устанавливаем PYTHONPATH для корректных импортов
export PYTHONPATH=/app

# Определяем лидера Patroni через REST и формируем URL для миграций напрямую на лидера
discover_leader() {
  for port in 8008 8009 8010; do
    role=$(curl -s http://haproxy:${port}/patroni | grep -o '"role":\s*"[^"]*"' | cut -d'"' -f4 || true)
    name=$(curl -s http://haproxy:${port}/patroni | grep -o '"name":\s*"[^"]*"' | cut -d'"' -f4 || true)
    if [ "$role" = "master" ] || [ "$role" = "leader" ]; then
      echo "$name"
      return 0
    fi
  done
  return 1
}

LEADER_HOST=$(discover_leader || true)
if [ -n "$LEADER_HOST" ]; then
  echo "Detected Patroni leader: $LEADER_HOST"
  DB_HOST_FOR_MIGRATIONS="$LEADER_HOST"
else
  echo "Leader not detected, fallback to DB_HOST=${DB_HOST:-haproxy}"
  DB_HOST_FOR_MIGRATIONS="${DB_HOST:-haproxy}"
fi

MIGRATION_DB_URL="postgresql://${DB_USER:-otus_hw}:${DB_PASSWORD:-otus_hw}@${DB_HOST_FOR_MIGRATIONS}:${DB_PORT:-5432}/${DB_NAME:-otus_hw}"

# Ждем готовности БД (через HAProxy write endpoint)
echo "Waiting for database to be ready at ${DB_HOST:-db}:${DB_PORT:-5432}..."
for i in {1..60}; do
  if pg_isready -h "${DB_HOST:-db}" -p "${DB_PORT:-5432}" -d "${DB_NAME:-otus_hw}" >/dev/null 2>&1; then
    echo "Database is ready."
    break
  fi
  sleep 1
  if [ "$i" -eq 60 ]; then
    echo "Database not ready after 60s, continuing anyway..."
  fi
done

# Применяем миграции (без проверки соединения, которая иногда зависает)
echo "Running database migrations to $DB_HOST_FOR_MIGRATIONS..."
cd /app && yoyo apply --batch --database "$MIGRATION_DB_URL" ./migrations || true

# Запуск приложения
echo "Starting application..."
cd /app && uvicorn src.app.app:app --host 0.0.0.0 --port 8000