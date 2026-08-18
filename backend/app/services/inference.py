import json

import joblib
import pandas as pd
from sklearn.pipeline import Pipeline

from app.core.config import LOCATIONS_PATH, MODEL_PATH


def load_model() -> Pipeline:
    return joblib.load(MODEL_PATH)


def load_allowed_locations() -> list[str]:
    with open(LOCATIONS_PATH, "r", encoding="utf-8") as file:
        return json.load(file)


def predict_price(model: Pipeline, model_input: pd.DataFrame) -> float:
    prediction = model.predict(model_input)[0]
    return float(prediction)