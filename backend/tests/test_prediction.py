from fastapi.testclient import TestClient

from app.main import app


def test_health_returns_ok():
    with TestClient(app) as client:
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict_returns_price():
    payload = {
        "area_sqft": 1200,
        "floor_num": 3,
        "bathroom_num": 2,
        "balcony_num": 1,
        "location": "bangalore",
        "furnishing": "Semi-Furnished",
        "transaction": "New Property",
        "ownership": "Freehold",
        "facing": "East",
    }

    with TestClient(app) as client:
        response = client.post("/predict", json=payload)

    assert response.status_code == 200
    body = response.json()
    assert "predicted_price" in body
    assert isinstance(body["predicted_price"], float)


def test_predict_rejects_invalid_area():
    payload = {
        "area_sqft": 0,
        "floor_num": 3,
        "bathroom_num": 2,
        "balcony_num": 1,
        "location": "bangalore",
        "furnishing": "Semi-Furnished",
        "transaction": "New Property",
        "ownership": "Freehold",
        "facing": "East",
    }

    with TestClient(app) as client:
        response = client.post("/predict", json=payload)

    assert response.status_code == 422