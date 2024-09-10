from typing import List

from fastapi import UploadFile


class DataService:

    async def process_data_files(self, files: [UploadFile]) -> None:
        for file in files:
            print(file.filename)
