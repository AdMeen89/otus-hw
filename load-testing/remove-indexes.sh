#!/bin/bash

echo "🗑️ Удаление индексов для тестирования БЕЗ оптимизации"
echo "=================================================="

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
echo "🗑️ Удаление всех пользовательских индексов..."

# Удаляем все наши индексы
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "DROP INDEX IF EXISTS idx_users_first_name_pattern;" && \
    echo "✅ Удален idx_users_first_name_pattern" || \
    echo "⚠️ idx_users_first_name_pattern не найден"

docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "DROP INDEX IF EXISTS idx_users_last_name_pattern;" && \
    echo "✅ Удален idx_users_last_name_pattern" || \
    echo "⚠️ idx_users_last_name_pattern не найден"

docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "DROP INDEX IF EXISTS idx_users_names_pattern;" && \
    echo "✅ Удален idx_users_names_pattern" || \
    echo "⚠️ idx_users_names_pattern не найден"

# Удаляем старые индексы если есть
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "DROP INDEX IF EXISTS idx_users_first_name, idx_users_last_name, idx_users_names;" > /dev/null 2>&1

echo ""
echo "📋 Индексы после удаления:"
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
    "SELECT indexname, tablename FROM pg_indexes WHERE tablename = 'users';"

echo ""
echo "🎯 Готово! Теперь в таблице users только PRIMARY KEY индекс"
echo "💡 Можно запускать тестирование БЕЗ индексов:"
echo "   ./load-testing/run-search-performance-test.sh" 