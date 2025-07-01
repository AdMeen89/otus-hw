#!/bin/bash
set -e

# Копируем конфигурацию pg_hba.conf
if [ -f /usr/share/postgresql/14/pg_hba.conf.sample ]; then
    echo "Setting up pg_hba.conf for replication..."
    cp /usr/share/postgresql/14/pg_hba.conf.sample /var/lib/postgresql/data/pg_hba.conf
    chmod 600 /var/lib/postgresql/data/pg_hba.conf
    chown postgres:postgres /var/lib/postgresql/data/pg_hba.conf
    echo "pg_hba.conf configured"
fi

echo "Master setup completed" 