# Import JMeter Results

Скрипт для импорта результатов JMeter в PostgreSQL базу данных.

## Требования

- Python 3.12+
- PostgreSQL база данных

## Запуск

1. Убедитесь что PostgreSQL запущен:
```bash
docker-compose up -d
```

2. Создайте виртуальное окружение и установите зависимости:
```bash
python3.12 -m venv .venv
source .venv/bin/activate
pip install -e .
```

3. Запустите импорт данных:
```bash
cd load-testing
DB_PATH=postgresql://otus_hw:otus_hw@localhost:5432/otus_hw python import_data.py
```

## Что делает скрипт

- Очищает предыдущие результаты
- Читает JTL файлы из папок `search/from` и `search/to`
- Создает таблицу `jmeter_results` в PostgreSQL
- Импортирует данные с метками "before" и "after" для анализа производительности
- Выводит статистику импорта

## Структура данных

Создается таблица со следующими полями:
- `timestamp_ms` - время выполнения запроса
- `response_time` - время отклика в миллисекундах  
- `thread_count` - количество потоков
- `index_status` - статус индекса ('before'/'after')
- `success` - успешность выполнения запроса 