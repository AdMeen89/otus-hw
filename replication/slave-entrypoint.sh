#!/bin/bash
set -e

# Ожидание доступности мастера
echo "Waiting for master to be ready..."
until pg_isready -h postgres-master -p 5432 -U replicator; do
  echo "Master is not ready yet. Waiting..."
  sleep 2
done

echo "Master is ready!"

# Проверяем, инициализирован ли уже слейв
if [ ! -s "$PGDATA/PG_VERSION" ]; then
    echo "Initializing slave from master..."
    
    # Создаем базовую копию с мастера
    PGPASSWORD='repl_password' pg_basebackup \
        -h postgres-master \
        -D "$PGDATA" \
        -U replicator \
        -v \
        -P \
        -R \
        -W
    
    echo "Base backup completed."
    
    # Настраиваем конфигурацию для слейва
    cat >> "$PGDATA/postgresql.conf" <<EOF

# Slave configuration
hot_standby = on
max_standby_streaming_delay = 30s
wal_receiver_status_interval = 10s
hot_standby_feedback = on
primary_slot_name = 'slave1_slot'
EOF

    # Создаем файл recovery.conf для старых версий или recovery.signal для новых
    if [ $(postgres --version | grep -oE '[0-9]+' | head -1) -ge 12 ]; then
        touch "$PGDATA/standby.signal"
    else
        cat > "$PGDATA/recovery.conf" <<EOF
standby_mode = on
primary_conninfo = 'host=postgres-master port=5432 user=replicator password=repl_password'
EOF
    fi
    
    echo "Slave configuration completed."
else
    echo "Slave already initialized."
fi

# Запускаем PostgreSQL
exec postgres 