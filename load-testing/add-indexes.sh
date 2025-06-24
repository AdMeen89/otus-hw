#!/bin/bash

echo "🔧 Добавление индексов для оптимизации поиска"
echo "============================================="

# Проверяем, что база данных доступна
if ! docker-compose exec -T db psql -U otus_hw -d otus_hw -c '\l' > /dev/null 2>&1; then
    echo "❌ База данных недоступна. Убедитесь, что контейнер db запущен:"
    echo "   docker-compose up -d db"
    exit 1
fi

echo "✅ База данных доступна"
echo ""

# Показываем текущие индексы
echo "📋 Текущие индексы таблицы users:"
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "SELECT indexname, tablename FROM pg_indexes WHERE tablename = 'users';"

echo ""
echo "🔧 Создание новых индексов..."

# Удаляем старые индексы если есть
echo "🗑️ Удаление старых индексов..."
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "DROP INDEX IF EXISTS idx_users_first_name, idx_users_last_name, idx_users_names;"

# Создаем специальные индексы для LIKE поиска с text_pattern_ops
echo "📝 Создание индекса для first_name с text_pattern_ops..."
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "CREATE INDEX idx_users_first_name_pattern ON users (first_name text_pattern_ops);" && \
    echo "✅ Индекс idx_users_first_name_pattern создан" || \
    echo "❌ Ошибка создания индекса idx_users_first_name_pattern"

# Создаем индекс для last_name с text_pattern_ops
echo "📝 Создание индекса для last_name с text_pattern_ops..."
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "CREATE INDEX idx_users_last_name_pattern ON users (last_name text_pattern_ops);" && \
    echo "✅ Индекс idx_users_last_name_pattern создан" || \
    echo "❌ Ошибка создания индекса idx_users_last_name_pattern"

# Создаем составной индекс для first_name и last_name с text_pattern_ops
echo "📝 Создание составного индекса для first_name + last_name с text_pattern_ops..."
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "CREATE INDEX idx_users_names_pattern ON users (first_name text_pattern_ops, last_name text_pattern_ops);" && \
    echo "✅ Составной индекс idx_users_names_pattern создан" || \
    echo "❌ Ошибка создания составного индекса idx_users_names_pattern"

echo ""
echo "📋 Индексы после создания:"
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "SELECT indexname, tablename FROM pg_indexes WHERE tablename = 'users';"

echo ""
echo "📊 Информация о размерах индексов:"
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "SELECT 
        schemaname,
        relname as tablename,
        indexrelname as indexname,
        pg_size_pretty(pg_relation_size(indexrelid)) as index_size
    FROM pg_stat_user_indexes 
    WHERE relname = 'users'
    ORDER BY pg_relation_size(indexrelid) DESC;"

echo ""
echo "🎉 Индексы успешно созданы!"
echo "💡 Теперь можно запустить тестирование с индексами:"
echo "   ./load-testing/run-search-after-index.sh" 