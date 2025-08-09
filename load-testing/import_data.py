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
    # Определяем количество потоков из имени файла
    if 'aggregate-' in file_path:
        thread_count = int(file_path.split('aggregate-')[1].split('.jtl')[0])
    elif 'results-' in file_path:
        thread_count = int(file_path.split('results-')[1].split('.jtl')[0])
    else:
        print(f"⚠️  Не удалось определить количество потоков из {file_path}, используем 0")
        thread_count = 0
    
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
    
    print(f"✅ Импортированы данные из {file_path}: {rows_imported} записей")
    return rows_imported

def get_available_test_folders():
    """Находит доступные папки с тестовыми данными (содержащие from и to)"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    test_folders = []
    
    # Проверяем все папки в той же директории, где лежит скрипт
    for item in os.listdir(script_dir):
        item_path = os.path.join(script_dir, item)
        
        # Пропускаем файлы
        if not os.path.isdir(item_path):
            continue
            
        # Проверяем наличие подпапок from и to
        from_path = os.path.join(item_path, 'from')
        to_path = os.path.join(item_path, 'to')
        
        if os.path.exists(from_path) and os.path.exists(to_path):
            # Подсчитываем количество .jtl файлов
            from_files = len(glob.glob(f"{from_path}/*.jtl"))
            to_files = len(glob.glob(f"{to_path}/*.jtl"))
            
            if from_files > 0 and to_files > 0:
                test_folders.append({
                    'name': item,
                    'path': item_path,
                    'from_files': from_files,
                    'to_files': to_files
                })
    
    return sorted(test_folders, key=lambda x: x['name'])

def select_test_folder():
    """Интерактивный выбор папки для импорта"""
    available_folders = get_available_test_folders()
    
    if not available_folders:
        print("❌ Не найдено папок с тестовыми данными!")
        print("💡 Убедитесь, что папки содержат подпапки 'from' и 'to' с .jtl файлами")
        return None
    
    print("\n📁 Доступные наборы тестовых данных:")
    print("=" * 60)
    for i, folder in enumerate(available_folders, 1):
        print(f"  {i}. {folder['name']}")
        print(f"     📂 from: {folder['from_files']} файлов")
        print(f"     📂 to:   {folder['to_files']} файлов")
        print()
    
    # Выбор папки
    while True:
        try:
            choice = int(input(f"Выберите набор данных [1-{len(available_folders)}]: ")) - 1
            if 0 <= choice < len(available_folders):
                selected_folder = available_folders[choice]
                return selected_folder
            else:
                print("❌ Неверный номер!")
        except ValueError:
            print("❌ Введите число!")

async def main():
    print("🚀 Импорт данных нагрузочного тестирования в PostgreSQL")
    print("=" * 60)
    
    # Выбор папки с тестами
    selected_folder = select_test_folder()
    if not selected_folder:
        return
    
    folder_name = selected_folder['name']
    from_path = os.path.join(selected_folder['path'], 'from')
    to_path = os.path.join(selected_folder['path'], 'to')
    
    print(f"\n📊 Начинаем импорт данных: {folder_name}")
    print(f"   📂 FROM (до изменений): {selected_folder['from_files']} файлов")
    print(f"   📂 TO (после изменений): {selected_folder['to_files']} файлов")
    
    # Подключение к базе данных
    print("\n🔌 Подключение к базе данных...")
    db_url = app_settings.db_master_url.replace('postgresql+asyncpg://', 'postgresql://')
    conn = await asyncpg.connect(db_url)
    
    try:
        # Очистка предыдущих результатов
        print("🧹 Очистка предыдущих результатов...")
        await create_table(conn)
        print("✅ Таблица очищена и пересоздана")
        
        total_rows = 0
        
        # Обработка файлов FROM (до изменений)
        print("\n📥 Импорт данных до изменений...")
        from_files = sorted(glob.glob(f'{from_path}/*.jtl'))
        for file_path in from_files:
            total_rows += await process_jtl_file(conn, file_path, 'before')
        
        # Обработка файлов TO (после изменений)
        print("\n📥 Импорт данных после изменений...")
        to_files = sorted(glob.glob(f'{to_path}/*.jtl'))
        for file_path in to_files:
            total_rows += await process_jtl_file(conn, file_path, 'after')
        
        print("\n🎉 Импорт завершен успешно!")
        print(f"   📊 Набор данных: {folder_name}")
        print(f"   📈 Всего записей: {total_rows:,}")
        print("\n🔗 Дашборды доступны в Grafana:")
        print("   📊 Home Work 3: http://localhost:3000")
        print("   📈 Performance Comparison: http://localhost:3000")
        
    except Exception as e:
        print(f"❌ Ошибка при импорте: {e}")
        raise
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(main()) 