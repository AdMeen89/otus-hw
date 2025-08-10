#!/bin/bash
set -e

# Устанавливаем PYTHONPATH для корректных импортов
export PYTHONPATH=/app

# Запускаем миграции всегда через write endpoint HAProxy (упрощаем и делаем надёжнее)
DB_HOST_FOR_MIGRATIONS="${DB_HOST:-haproxy}"

MIGRATION_DB_URL="postgresql://${DB_USER:-otus_hw}:${DB_PASSWORD:-otus_hw}@${DB_HOST_FOR_MIGRATIONS}:${DB_PORT:-5432}/${DB_NAME:-otus_hw}"

# Ждем готовности БД (через HAProxy write endpoint)
echo "Waiting for database to be ready at ${DB_HOST_FOR_MIGRATIONS}:${DB_PORT:-5432}..."
for i in {1..60}; do
  if pg_isready -h "${DB_HOST_FOR_MIGRATIONS}" -p "${DB_PORT:-5432}" -d "${DB_NAME:-otus_hw}" >/dev/null 2>&1; then
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