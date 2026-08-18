from fastapi import APIRouter, HTTPException, Request

from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.inference import predict_price
from app.services.preprocessing import build_model_input

router = APIRouter(tags=["Prediction"])


@router.get("/health")
def health(request: Request) -> dict[str, str]:
    model_loaded = hasattr(request.app.state, "model")
    locations_loaded = hasattr(request.app.state, "allowed_locations")

    if not model_loaded or not locations_loaded:
        raise HTTPException(
            status_code=503,
            detail="Model or locations are not loaded.",
        )

    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
def predict(
    payload: PredictionRequest,
    request: Request,
) -> PredictionResponse:
    model_input = build_model_input(
        request=payload,
        allowed_locations=request.app.state.allowed_locations,
    )

    predicted_price = predict_price(
        model=request.app.state.model,
        model_input=model_input,
    )

    return PredictionResponse(predicted_price=predicted_price)