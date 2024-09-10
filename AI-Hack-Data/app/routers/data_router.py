from typing import List

from fastapi import APIRouter, Request, Depends, File, UploadFile, Form

from app.services.data_service import DataService

data_router = APIRouter(prefix="/api", tags=["data"])


@data_router.post("/data")
async def upload_files(
        request: Request,
        files: List[UploadFile] = File(...),
        service: DataService = Depends(),
):
    return await service.process_data_files(files)
