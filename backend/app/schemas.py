from pydantic import BaseModel
from datetime import datetime

class VoidResponse(BaseModel):
    message: str
    count: int
    timestamp: datetime

class VoidCreate(BaseModel):
    message: str = ""