from datetime import datetime

from pydantic import BaseModel


class BaseSchema(BaseModel):
    class Config:
        json_encoders = {datetime: lambda v: v.isoformat()}
        arbitrary_types_allowed = True
