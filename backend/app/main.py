import os
from contextlib import asynccontextmanager
from datetime import datetime
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017/vsacia")

class VoidResponse(BaseModel):
    message: str
    count: int
    timestamp: datetime

client: AsyncIOMotorClient = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client
    client = AsyncIOMotorClient(MONGODB_URL)
    yield
    client.close()

app = FastAPI(lifespan=lifespan)

@app.get("/void", response_model=VoidResponse)
async def get_void():
    db = client.vsacia
    collection = db.void_collection
    
    # Get the most recent entry
    doc = await collection.find_one(sort=[("_id", -1)])
    
    if doc:
        return VoidResponse(
            message="",
            count=doc.get("count", 0),
            timestamp=doc.get("timestamp", datetime.utcnow())
        )
    else:
        return VoidResponse(
            message="",
            count=0,
            timestamp=datetime.utcnow()
        )

@app.post("/void", response_model=VoidResponse)
async def post_void():
    db = client.vsacia
    collection = db.void_collection
    
    # Increment the counter
    last_doc = await collection.find_one(sort=[("_id", -1)])
    new_count = 1 if not last_doc else last_doc.get("count", 0) + 1
    
    # Insert new document with incremented counter
    new_doc = {
        "count": new_count,
        "timestamp": datetime.utcnow()
    }
    await collection.insert_one(new_doc)
    
    return VoidResponse(
        message="",
        count=new_count,
        timestamp=new_doc["timestamp"]
    )