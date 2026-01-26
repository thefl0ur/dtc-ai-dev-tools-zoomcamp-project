import pytest
from httpx import AsyncClient
from unittest.mock import AsyncMock, patch, MagicMock
from app.main import app
from motor.motor_asyncio import AsyncIOMotorClient


@pytest.mark.asyncio
async def test_get_void_empty():
    # Mock the database client before the app starts
    mock_client = AsyncMock(spec=AsyncIOMotorClient)
    mock_db = AsyncMock()
    mock_collection = AsyncMock()

    # Set up the mock relationships
    mock_client.__getitem__.return_value = mock_db
    mock_db.__getitem__.return_value = mock_collection
    # Return None when no documents exist
    mock_collection.find_one = AsyncMock(return_value=None)

    # Configure the mock to allow attribute access like 'vsacia'
    type(mock_client).vsacia = mock_db
    # Also configure the db to have a void_collection attribute
    type(mock_db).void_collection = mock_collection

    # Patch the client in the app module
    with patch('app.main.client', mock_client):
        async with AsyncClient(app=app, base_url="http://testserver") as ac:
            response = await ac.get("/void")

    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 0
    assert data["message"] == ""


@pytest.mark.asyncio
async def test_post_void():
    # Mock the database client before the app starts
    mock_client = AsyncMock(spec=AsyncIOMotorClient)
    mock_db = AsyncMock()
    mock_collection = AsyncMock()

    # Create a mock document that behaves like a dict
    mock_last_doc = MagicMock()
    mock_last_doc.get.return_value = 0  # Return 0 for count

    # Set up the mock relationships
    mock_client.__getitem__.return_value = mock_db
    mock_db.__getitem__.return_value = mock_collection
    mock_collection.find_one = AsyncMock(return_value=mock_last_doc)
    mock_collection.insert_one = AsyncMock()

    # Configure the mock to allow attribute access like 'vsacia'
    type(mock_client).vsacia = mock_db
    # Also configure the db to have a void_collection attribute
    type(mock_db).void_collection = mock_collection

    # Patch the client in the app module
    with patch('app.main.client', mock_client):
        async with AsyncClient(app=app, base_url="http://testserver") as ac:
            response = await ac.post("/void")

    assert response.status_code == 200
    data = response.json()
    assert data["count"] == 1  # 0 + 1 = 1
    assert data["message"] == ""