# Домашнее задание курса Highload Architect

## Описание проекта

Высоконагруженное веб-приложение с PostgreSQL master-slave репликацией, написанное на Python с использованием FastAPI.

## Технологический стек

- **Python 3.12** + **FastAPI** (асинхронный веб-фреймворк)
- **PostgreSQL 14** с репликацией (1 master + 2 slaves)
- **Docker** + **Docker Compose** (контейнеризация)
- **Автоматическая балансировка нагрузки** между базами данных
- **Grafana** (мониторинг)

## Установка и запуск

### Предварительные требования
- Docker
- Docker Compose

### 🚀 Режим 1: Обычное развертывание (без репликации)

```bash
# Простой запуск с одной базой данных
docker-compose up -d
```

**Доступные сервисы:**
- **API**: http://localhost:8000
- **Swagger документация**: http://localhost:8000/docs  
- **PostgreSQL**: localhost:5432

### 🏗️ Режим 2: С репликацией (1 master + 2 slaves)

```bash
# Запуск с репликацией и балансировкой нагрузки
docker-compose -f docker-compose-replication.yml up -d
```

**Доступные сервисы:**
- **API**: http://localhost:8000
- **Swagger документация**: http://localhost:8000/docs
- **PostgreSQL Master** (запись): localhost:5432
- **PostgreSQL Slave 1** (чтение): localhost:5433
- **PostgreSQL Slave 2** (чтение): localhost:5434
- **Grafana мониторинг**: http://localhost:3000

**🤖 Автоматическая балансировка:**
- **SELECT запросы** → распределяются между слейвами (50%/50%)
- **INSERT/UPDATE/DELETE** → выполняются на мастере
- **Транзакции** → выполняются на мастере

## API Endpoints

### 🛠️ Tools
- **`GET /api/v1/tools/health/db`** - Проверка состояния всех баз данных
- **`POST /api/v1/tools/generate-users/{count}`** - Генерация тестовых пользователей

### ⚖️ Load Balancing
- **`GET /api/v1/load-balancing/stats`** - Статистика балансировки нагрузки
- **`POST /api/v1/load-balancing/reset-stats`** - Сброс статистики
- **`POST /api/v1/load-balancing/test/{count}`** - Тестирование балансировки

### 👥 Users
- **`GET /api/v1/users/search`** - Поиск пользователей по имени и фамилии
- **`GET /api/v1/users/{user_id}`** - Получение пользователя по ID
- **`POST /api/v1/users/register`** - Регистрация нового пользователя
- **`POST /api/v1/auth/login`** - Аутентификация пользователя

## Тестирование

### Коллекция Postman
Импортируйте коллекцию: `./docs/Otus_Homework.postman_collection.json`

### Проверка работы репликации
```bash
# Генерируем пользователей (запись в master)
curl -X POST http://localhost:8000/api/v1/tools/generate-users/10

# Проверяем статистику балансировки (чтение со slaves)
curl http://localhost:8000/api/v1/load-balancing/stats

# Тестируем балансировку
curl -X POST http://localhost:8000/api/v1/load-balancing/test/20
```
