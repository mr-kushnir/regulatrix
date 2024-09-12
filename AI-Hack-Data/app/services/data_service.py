from typing import List  # Модуль для типов данных
from fastapi import UploadFile  # Модуль для работы с загруженными файлами в FastAPI
from take_text import TakeText  # Импорт класса TakeText из другого модуля

class DataService:
    def __init__(self, output_folder):
        """
        Инициализация класса DataService.
        
        :param output_folder: Папка для сохранения результатов обработки.
        """
        self.output_folder = output_folder
        self.take_text = TakeText(output_folder)  # Создание экземпляра класса TakeText

    async def process_data_files(self, files: List[UploadFile]) -> None:
        """
        Асинхронная обработка списка загруженных файлов.
        
        :param files: Список загруженных файлов типа UploadFile.
        :return: None
        """
        for file in files:
            if file.filename.endswith(".pdf"):  # Проверка наличия расширения .pdf
                # Обработка PDF-файла с помощью метода process класса TakeText
                # Однако, метод process класса TakeText не поддерживает асинхронность и ожидает путь к файлу,
                # поэтому необходимо сохранить файл на диске перед обработкой.
                # Для этого можно использовать метод write() из UploadFile.
                
                # Пример сохранения файла на диске:
                # with open(os.path.join(self.output_folder, file.filename), 'wb') as f:
                #     f.write(file.file.read())
                
                # Затем вызвать метод process класса TakeText:
                # self.take_text.process(os.path.join(self.output_folder, file.filename))
                
                # Но поскольку метод process не поддерживает асинхронность, его нужно вызывать синхронно.
                # Для этого можно использовать run_in_executor или аналогичные механизмы.
                
                # Пример использования run_in_executor (требует import asyncio и loop):
                # loop = asyncio.get_event_loop()
                # await loop.run_in_executor(None, self.take_text.process, os.path.join(self.output_folder, file.filename))
                
                # В данном примере это не реализовано, поэтому необходимо доработать код для корректной обработки.
                
                print(f"Файл {file.filename} является PDF-файлом, но требует доработки для корректной обработки.")
            else:
                print(f"Файл {file.filename} не является PDF-файлом и не будет обработан.")
