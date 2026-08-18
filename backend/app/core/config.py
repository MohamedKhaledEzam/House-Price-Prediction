from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = BASE_DIR / "models" / "house_price.pkl"
LOCATIONS_PATH = BASE_DIR / "models" / "locations.json"

FRONTEND_ORIGIN = "http://localhost:5173"