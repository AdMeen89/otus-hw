#!/bin/bash
set -e

# Устанавливаем PYTHONPATH для корректных импортов
export PYTHONPATH=/app

# Упрощенная версия URL для миграций
MIGRATION_DB_URL="postgresql://otus_hw:otus_hw@db:5432/otus_hw"

# Применяем миграции (без проверки соединения, которая иногда зависает)
echo "Running database migrations..."
cd /app && yoyo apply --database "$MIGRATION_DB_URL" ./migrations || true

# Запуск приложения
echo "Starting application..."
cd /app && uvicorn src.app.app:app --host 0.0.0.0 --port 8000