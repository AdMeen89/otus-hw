FROM python:3.12-slim

WORKDIR /app

# Установка системных зависимостей для psycopg2 и утилиты psql
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Копирование файлов зависимостей
COPY pyproject.toml setup.py ./

# Установка зависимостей
RUN pip install --no-cache-dir -e .

# Копирование исходного кода
COPY src/ ./src/
COPY migrations/ ./migrations/
COPY yoyo.ini ./

# Установка дополнительных зависимостей для миграций
RUN pip install --no-cache-dir python-dotenv yoyo-migrations psycopg2-binary

# Создание файла для запуска приложения и миграций
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Запуск приложения
ENTRYPOINT ["./entrypoint.sh"] 