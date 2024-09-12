from typing import List

from fastapi import UploadFile


class DataService:
    def __init__(self, output_folder):
        self.output_folder = output_folder
        self.take_text = TakeText(output_folder)

    async def process_data_files(self, files: List[UploadFile]) -> None:
        for file in files:
            if file.filename.endswith(".pdf"):
                await self.take_text.process(file)
            else:
                print(f"Файл {file.filename} не является PDF-файлом и не будет обработан.")
