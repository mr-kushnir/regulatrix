import logging
from contextlib import asynccontextmanager
from io import BufferedReader
from typing import AsyncGenerator, Union

import aioboto3
from aiobotocore.response import StreamingBody
from aiobotocore.session import ClientCreatorContext
from botocore.config import Config
from dynaconf import LazySettings


class Ceph:
    def __init__(self, settings: LazySettings) -> None:
        self._settings = settings
        self._session = aioboto3.Session(
            aws_access_key_id=settings.access_key,
            aws_secret_access_key=settings.secret_key,
        )
        self.bucket = self._settings.bucket_name
        self._client_params = {
            "service_name": "s3",
            "endpoint_url": f"{self._settings.protocol}://{self._settings.host}:{self._settings.port}",
            "config": Config(
                signature_version=self._settings.version,
            ),
            "verify": self._settings.verify,
        }

    @asynccontextmanager
    async def client_creator(self) -> AsyncGenerator[ClientCreatorContext, None]:
        async with self._session.client(**self._client_params) as s3_client:
            yield s3_client

    @asynccontextmanager
    async def get_object(self, key: str) -> AsyncGenerator[StreamingBody, None]:
        logging.info("Получение объекта. Bucket: '%s'. Key: '%s'", self.bucket, key)
        async with self.client_creator() as client:
            file_object = await client.get_object(Bucket=self.bucket, Key=key)
            yield file_object["Body"]

    async def put_object(self, key: str, data: Union[BufferedReader, bytes]) -> None:
        logging.info("Загрузка объекта. Bucket: '%s'. Key: '%s'", self.bucket, key)
        async with self.client_creator() as client:
            await client.put_object(Body=data, Bucket=self.bucket, Key=key)

    async def download_fileobj(self, key: str, file_stream) -> None:
        logging.info("Скачивание объекта. Bucket: '%s'. Key: '%s'", self.bucket, key)
        async with self.client_creator() as client:
            await client.download_fileobj(
                Bucket=self._settings.bucket_name, Key=key, Fileobj=file_stream
            )

    async def generate_presigned_url(
            self, key: str, response_content_disposition: str = None
    ) -> str:
        logging.info(
            "Создание url-адреса для загрузки. Bucket: '%s'. Key: '%s'",
            self.bucket,
            key,
        )
        params = {
            "Bucket": self.bucket,
            "Key": key,
        }
        if response_content_disposition:
            params["ResponseContentDisposition"] = response_content_disposition
        async with self.client_creator() as client:
            return await client.generate_presigned_url(
                "get_object",
                Params=params,
                ExpiresIn=self._settings.expiration_time_link_object,
            )

    async def delete_object(self, key: str) -> None:
        logging.info("Удаление объекта. Bucket: '%s'. Key: '%s'", self.bucket, key)
        async with self.client_creator() as client:
            await client.delete_object(Bucket=self.bucket, Key=key)
