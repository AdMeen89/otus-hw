# Домашнее задание курса Highload Architect

## Описание проекта

Проект представляет собой веб-приложение, написанное на Python с использованием FastAPI и PostgreSQL 14.


## Технологический стек

- Python 3.12
- PostgreSQL 14
- FastAPI (асинхронный веб-фреймворк)
- SQLAlchemy (ORM для работы с базой данных)
- Docker и Docker Compose (для контейнеризации)
- Pydantic (для валидации данных)

## Установка и запуск

### Предварительные требования
- Docker
- Docker Compose

### Запуск с использованием Docker

1. Клонировать репозиторий
```bash
git clone <repository-url>
cd home_work
```

2. Создать файл `.env` на основе примера `.env.example`
```bash
cp .env.example .env
```

3. Запустить контейнеры
```bash
docker-compose up -d
```

После запуска приложение будет доступно по адресу:
- API: http://localhost:8000/api/v1
- Документация API (Swagger): http://localhost:8000/docs

### Запуск в локальном окружении (без Docker)

1. Убедитесь, что у вас установлены Python 3.12 и PostgreSQL 14

2. Создайте виртуальное окружение и активируйте его
```bash
python -m venv .venv
source .venv/bin/activate  # для Linux/Mac
# или
.venv\Scripts\activate  # для Windows
```

3. Установите зависимости
```bash
pip install -e .
```

4. Настройте базу данных PostgreSQL и создайте файл `.env`

5. Примените миграции
```bash
yoyo apply --database 'postgresql://username:password@localhost:5432/dbname' ./migrations
```

6. Запустите приложение
```bash
uvicorn src.app.app:app --host 0.0.0.0 --port 8000 --reload
```

## Коллекция Postman

Коллекция находится в `./docs/Otus_Homework.postman_collection.json`.
