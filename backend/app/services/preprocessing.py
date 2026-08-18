import pandas as pd

from app.schemas.prediction import PredictionRequest


def build_model_input(
    request: PredictionRequest,
    allowed_locations: list[str],
) -> pd.DataFrame:
    location_grouped = (
        request.location
        if request.location in allowed_locations
        else "Other"
    )

    return pd.DataFrame(
        [
            {
                "area_sqft": request.area_sqft,
                "floor_num": request.floor_num,
                "bathroom_num": request.bathroom_num,
                "balcony_num": request.balcony_num,
                "location_grouped": location_grouped,
                "Furnishing": request.furnishing,
                "Transaction": request.transaction,
                "Ownership": request.ownership,
                "facing": request.facing,
            }
        ]
    )