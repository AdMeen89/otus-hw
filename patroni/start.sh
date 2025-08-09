#!/usr/bin/env bash
set -euo pipefail

export PATRONI_KUBERNETES_USE_ENDPOINTS=false

# Ensure correct ownership and permissions for PGDATA
mkdir -p /var/lib/postgresql/data
chown -R postgres:postgres /var/lib/postgresql
chmod 700 /var/lib/postgresql/data || true

exec gosu postgres /opt/patroni-venv/bin/patroni /etc/patroni/patroni.yml

