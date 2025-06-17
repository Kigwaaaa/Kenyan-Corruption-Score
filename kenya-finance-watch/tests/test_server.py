import pytest
import json
from server import app
import os

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture
def sample_data():
    return [
        {
            "id": 1,
            "name": "Ministry of Health",
            "allocation": 1000000000,
            "financialTracking": {
                "efficiencyScore": 85,
                "corruptionIndex": 0.15
            }
        },
        {
            "id": 2,
            "name": "Ministry of Education",
            "allocation": 2000000000,
            "financialTracking": {
                "efficiencyScore": 90,
                "corruptionIndex": 0.10
            }
        }
    ]

def test_cors_headers(client):
    """Test that CORS headers are properly set"""
    response = client.options('/api/ministries')
    assert response.status_code == 200
    assert 'Access-Control-Allow-Origin' in response.headers
    assert response.headers['Access-Control-Allow-Origin'] == '*'
    assert 'Access-Control-Allow-Methods' in response.headers
    assert 'GET' in response.headers['Access-Control-Allow-Methods']

def test_get_ministries(client, sample_data, tmp_path):
    """Test the /api/ministries endpoint"""
    # Create a temporary data.json file
    data_file = tmp_path / "data.json"
    data_file.write_text(json.dumps(sample_data))
    
    # Temporarily change the working directory
    original_dir = os.getcwd()
    os.chdir(tmp_path)
    
    try:
        response = client.get('/api/ministries')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert len(data) == 2
        assert data[0]['name'] == 'Ministry of Health'
        assert data[1]['name'] == 'Ministry of Education'
    finally:
        os.chdir(original_dir)

def test_get_data(client, sample_data, tmp_path):
    """Test the /data.json endpoint"""
    # Create a temporary data.json file
    data_file = tmp_path / "data.json"
    data_file.write_text(json.dumps(sample_data))
    
    # Temporarily change the working directory
    original_dir = os.getcwd()
    os.chdir(tmp_path)
    
    try:
        response = client.get('/data.json')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert len(data) == 2
        assert data[0]['name'] == 'Ministry of Health'
        assert data[1]['name'] == 'Ministry of Education'
    finally:
        os.chdir(original_dir)

def test_file_not_found(client):
    """Test handling of missing data.json file"""
    response = client.get('/api/ministries')
    assert response.status_code == 500
    data = json.loads(response.data)
    assert 'error' in data

def test_invalid_json(client, tmp_path):
    """Test handling of invalid JSON in data.json"""
    # Create a temporary data.json file with invalid JSON
    data_file = tmp_path / "data.json"
    data_file.write_text("invalid json")
    
    # Temporarily change the working directory
    original_dir = os.getcwd()
    os.chdir(tmp_path)
    
    try:
        response = client.get('/api/ministries')
        assert response.status_code == 500
        data = json.loads(response.data)
        assert 'error' in data
    finally:
        os.chdir(original_dir)

def test_static_file_serving(client):
    """Test serving of static files"""
    response = client.get('/')
    assert response.status_code == 200
    assert b'<!DOCTYPE html>' in response.data 