-- Create schema if not exists
CREATE SCHEMA IF NOT EXISTS otus_hw;

-- Create dialogs table
CREATE TABLE IF NOT EXISTS otus_hw.dialogs (
    id BIGSERIAL,
    pair_key BIGINT NOT NULL,
    from_user INT NOT NULL,
    to_user INT NOT NULL,
    last_message TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create distributed table (shard by pair_key)
SELECT create_distributed_table('otus_hw.dialogs', 'pair_key');

-- Add unique constraint that includes partition column
ALTER TABLE otus_hw.dialogs ADD CONSTRAINT dialogs_unique_pair 
UNIQUE (pair_key, from_user, to_user);
