from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    location: str = Field(..., min_length=1)
    area_sqft: float = Field(..., gt=0)
    floor_num: float
    bathroom_num: float = Field(..., ge=0)
    balcony_num: float = Field(..., ge=0)
    furnishing: str = Field(..., min_length=1)
    transaction: str = Field(..., min_length=1)
    ownership: str = Field(..., min_length=1)
    facing: str = Field(..., min_length=1)


class PredictionResponse(BaseModel):
    predicted_price: float