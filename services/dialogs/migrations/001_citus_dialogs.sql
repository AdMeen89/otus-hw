-- Create schema if not exists
CREATE SCHEMA IF NOT EXISTS otus_hw;

-- Create dialogs table
CREATE TABLE IF NOT EXISTS otus_hw.dialogs (
    id BIGSERIAL,
    pair_key BIGINT NOT NULL,
    from_user INT NOT NULL,
    to_user INT NOT NULL,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id, pair_key)
);

-- Create distributed table (shard by pair_key)
SELECT create_distributed_table('otus_hw.dialogs', 'pair_key');
