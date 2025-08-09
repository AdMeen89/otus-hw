-- Создание пользователя для репликации
CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD 'repl_password';

-- Настройка pg_hba.conf для репликации
-- Разрешаем подключение для репликации
-- (это будет добавлено автоматически при запуске)

-- Создание слота репликации для каждого слейва
SELECT pg_create_physical_replication_slot('slave1_slot');
SELECT pg_create_physical_replication_slot('slave2_slot');

-- Информационный запрос для проверки
SELECT slot_name, slot_type, active FROM pg_replication_slots; 