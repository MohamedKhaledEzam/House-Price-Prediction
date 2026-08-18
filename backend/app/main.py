from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.prediction import router as prediction_router
from app.core.config import FRONTEND_ORIGIN
from app.services.inference import load_allowed_locations, load_model


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = load_model()
    app.state.allowed_locations = load_allowed_locations()

    yield

    app.state.model = None
    app.state.allowed_locations = None


app = FastAPI(
    title="House Price Prediction API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router)