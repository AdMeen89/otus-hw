#!/bin/bash

echo "=== Тестирование производительности поиска С индексами ==="
echo "Используем данные из CSV файла: search_params.csv"

# ВАЖНО: Сначала создаем индексы
echo "🔧 Создаем индексы для оптимизации..."
./load-testing/add-indexes.sh

echo ""
echo "🧪 Начинаем тестирование С индексами..."

# Создаем директорию для результатов
mkdir -p load-testing/results/after-index

echo "1. Тест с 1 потоком (С индексами)"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=1 -Jloops=10 \
  -l /results/after-index-1thread.jtl \
  -e -o /results/after-index-1thread-report

echo "2. Тест с 10 потоками (С индексами)"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=10 -Jloops=10 \
  -l /results/after-index-10threads.jtl \
  -e -o /results/after-index-10threads-report

echo "3. Тест с 100 потоками (С индексами)"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=100 -Jloops=5 \
  -l /results/after-index-100threads.jtl \
  -e -o /results/after-index-100threads-report

echo "4. Тест с 1000 потоками (С индексами)"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=1000 -Jloops=2 \
  -l /results/after-index-1000threads.jtl \
  -e -o /results/after-index-1000threads-report

echo ""
echo "=== Тестирование С индексами завершено ==="
echo "Результаты сохранены в load-testing/results/after-index/"
echo ""
echo "📊 Проверка что индексы ИСПОЛЬЗУЮТСЯ:"
docker-compose exec -T db psql -U otus_hw -d otus_hw -c \
  "EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM otus_hw.users WHERE first_name LIKE 'Мок%' AND last_name LIKE 'Гол%' ORDER BY id ASC;"
echo ""
echo "Теперь можно сравнить результаты до и после добавления индексов!"
echo "Grafana доступна по адресу: http://localhost:3000 (admin/admin123)" 