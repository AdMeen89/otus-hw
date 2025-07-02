#!/bin/bash
set -e

# Устанавливаем PYTHONPATH для корректных импортов
export PYTHONPATH=/app

# Динамический URL для миграций (использует переменные окружения)
MIGRATION_DB_URL="postgresql://${DB_USER:-otus_hw}:${DB_PASSWORD:-otus_hw}@${DB_HOST:-db}:${DB_PORT:-5432}/${DB_NAME:-otus_hw}"

# Применяем миграции (без проверки соединения, которая иногда зависает)
echo "Running database migrations..."
cd /app && yoyo apply --batch --database "$MIGRATION_DB_URL" ./migrations || true

# Запуск приложения
echo "Starting application..."
cd /app && uvicorn src.app.app:app --host 0.0.0.0 --port 8000