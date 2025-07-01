#!/usr/bin/env python3
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import csv
import glob
import asyncio
import asyncpg
from src.helpers.settings import app_settings

async def create_table(conn):
    """Создает таблицу для результатов JMeter"""
    await conn.execute("DROP TABLE IF EXISTS jmeter_results")
    await conn.execute("""
    CREATE TABLE jmeter_results (
        id SERIAL PRIMARY KEY,
        timestamp_ms BIGINT,
        response_time INTEGER,
        thread_count INTEGER,
        index_status VARCHAR(10),
        success BOOLEAN
    )
    """)

async def process_jtl_file(conn, file_path, index_status):
    """Обрабатывает JTL файл и вставляет данные в БД"""
    thread_count = int(file_path.split('aggregate-')[1].split('.jtl')[0])
    rows_imported = 0
    
    with open(file_path, 'r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            await conn.execute("""
            INSERT INTO jmeter_results (timestamp_ms, response_time, thread_count, index_status, success)
            VALUES ($1, $2, $3, $4, $5)
            """, 
                int(row['timeStamp']),
                int(row['elapsed']),
                thread_count,
                index_status,
                bool(row['success'] == 'true')
            )
            rows_imported += 1
    
    print(f"Импортированы данные из {file_path}: {rows_imported} записей")
    return rows_imported

async def main():
    # Отладочная информация
    print(f"Текущая рабочая директория: {os.getcwd()}")
    print(f"Содержимое текущей директории: {os.listdir('.')}")
    
    # Подключение к базе данных
    db_url = app_settings.db_url.replace('postgresql+asyncpg://', 'postgresql://')
    conn = await asyncpg.connect(db_url)
    
    try:
        # Очистка предыдущих результатов
        print("Очистка предыдущих результатов...")
        await create_table(conn)
        
        total_rows = 0
        
        # Обработка файлов "до индекса"
        print("Импорт данных ДО индекса...")
        before_files = glob.glob('search/from/aggregate-*.jtl')
        print(f"Найдено файлов ДО индекса: {len(before_files)}")
        for file_path in before_files:
            print(f"Обрабатываем файл: {file_path}")
            total_rows += await process_jtl_file(conn, file_path, 'before')
        
        # Обработка файлов "после индекса"
        print("Импорт данных ПОСЛЕ индекса...")
        after_files = glob.glob('search/to/aggregate-*.jtl')
        print(f"Найдено файлов ПОСЛЕ индекса: {len(after_files)}")
        for file_path in after_files:
            print(f"Обрабатываем файл: {file_path}")
            total_rows += await process_jtl_file(conn, file_path, 'after')
        
        print(f"Импорт завершен. Всего записей: {total_rows}")
        
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(main()) 