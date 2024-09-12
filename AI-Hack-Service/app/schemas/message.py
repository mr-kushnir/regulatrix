from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class ResponseMessageSchema(BaseModel):
    id: int
    message: Optional[str] = None
    message_type: str
    date_created: datetime


class DataSchema(BaseModel):
    message: str
    context: List[ResponseMessageSchema] = []
