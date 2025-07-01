#!/bin/bash

function remove_indexes() {
    echo "Удаление индекса idx_users_names_pattern..."
    docker-compose exec db psql -U otus_hw -d otus_hw -c "DROP INDEX IF EXISTS idx_users_names_pattern;"
    echo "Индекс idx_users_names_pattern удален"
}

function create_indexes() {
    echo "Создание индекса idx_users_names_pattern..."
    docker-compose exec db psql -U otus_hw -d otus_hw -c "CREATE INDEX idx_users_names_pattern ON users (first_name text_pattern_ops, last_name text_pattern_ops);"
    echo "Индекс idx_users_names_pattern создан"
}

function check_indexes() {
    docker-compose exec db psql -U otus_hw -d otus_hw -c "SELECT * FROM pg_indexes WHERE tablename = 'users';"
}

function show_explain() {
    fname=$1
    lname=$2
    docker-compose exec db psql -U otus_hw -d otus_hw -c "EXPLAIN ANALYZE SELECT * FROM users WHERE first_name LIKE '$fname%' AND last_name LIKE '$lname%';"
}

echo "Выберите действие: "
echo "1. Удалить индекс idx_users_names_pattern"
echo "2. Создать индекс idx_users_names_pattern"
echo "3. Показать план выполнения запроса"
echo "4. Проверить наличие индекса idx_users_names_pattern"
read action

if [ "$action" == "1" ]; then
    remove_indexes
elif [ "$action" == "2" ]; then
    create_indexes
elif [ "$action" == "3" ]; then
    echo "Введите имя: "
    read fname
    echo "Введите фамилию: "
    read lname
    show_explain $fname $lname
elif [ "$action" == "4" ]; then
    check_indexes
fi

exit 0