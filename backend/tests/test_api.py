import pytest
from httpx import AsyncClient
from unittest.mock import AsyncMock, patch
from app.main import app


@pytest.mark.asyncio
async def test_get_void_empty():
    async with AsyncClient(app=app, base_url="http://testserver") as ac:
        with patch('motor.motor_asyncio.AsyncIOMotorClient') as mock_client:
            mock_db = AsyncMock()
            mock_collection = AsyncMock()
            mock_client.return_value.__getitem__.return_value = mock_db
            mock_db.__getitem__.return_value = mock_collection
            mock_collection.find_one.return_value = None
            
            response = await ac.get("/void")
    
    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 0
    assert data["message"] == ""


@pytest.mark.asyncio
async def test_post_void():
    async with AsyncClient(app=app, base_url="http://testserver") as ac:
        with patch('motor.motor_asyncio.AsyncIOMotorClient') as mock_client:
            mock_db = AsyncMock()
            mock_collection = AsyncMock()
            mock_client.return_value.__getitem__.return_value = mock_db
            mock_db.__getitem__.return_value = mock_collection
            mock_collection.find_one.return_value = {"count": 0}
            mock_collection.insert_one = AsyncMock()
            
            response = await ac.post("/void")
    
    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 1
    assert data["message"] == ""