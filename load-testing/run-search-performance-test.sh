#!/bin/bash

echo "=== Тестирование производительности поиска БЕЗ индексов ==="
echo "Используем данные из CSV файла: search_params.csv"

# ВАЖНО: Сначала удаляем все индексы для честного тестирования
echo "🗑️ Удаляем индексы для тестирования БЕЗ оптимизации..."
./load-testing/remove-indexes.sh

echo ""
echo "🧪 Начинаем тестирование БЕЗ индексов..."

# Создаем директорию для результатов
mkdir -p load-testing/results/before-index

echo "1. Тест с 1 потоком (БЕЗ индексов)"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=1 -Jloops=10 \
  -l /results/before-index-1thread.jtl \
  -e -o /results/before-index-1thread-report

echo "2. Тест с 10 потоками (БЕЗ индексов)"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=10 -Jloops=10 \
  -l /results/before-index-10threads.jtl \
  -e -o /results/before-index-10threads-report

echo "3. Тест с 100 потоками (БЕЗ индексов)"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=100 -Jloops=5 \
  -l /results/before-index-100threads.jtl \
  -e -o /results/before-index-100threads-report

echo "4. Тест с 1000 потоками (БЕЗ индексов)"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=1000 -Jloops=2 \
  -l /results/before-index-1000threads.jtl \
  -e -o /results/before-index-1000threads-report

echo ""
echo "=== Тестирование БЕЗ индексов завершено ==="
echo "Результаты сохранены в load-testing/results/before-index/"
echo ""
echo "📊 Проверка что индексы действительно НЕ используются:"
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
  "EXPLAIN SELECT * FROM otus_hw.users WHERE first_name LIKE 'Мок%' AND last_name LIKE 'Гол%' ORDER BY id ASC;"
echo ""
echo "Теперь выполните add-indexes.sh и затем run-search-after-index.sh" 