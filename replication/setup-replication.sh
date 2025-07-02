#!/bin/bash
set -e

echo "Setting up replication configuration..."

# Копируем pg_hba.conf для репликации
if [ -f /docker-entrypoint-initdb.d/pg_hba.conf ]; then
    echo "Installing pg_hba.conf..."
    cp /docker-entrypoint-initdb.d/pg_hba.conf /var/lib/postgresql/data/pg_hba.conf
    chmod 600 /var/lib/postgresql/data/pg_hba.conf
    chown postgres:postgres /var/lib/postgresql/data/pg_hba.conf
    echo "pg_hba.conf configured for replication"
fi

echo "Replication setup completed" 