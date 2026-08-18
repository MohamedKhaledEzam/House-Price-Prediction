import type {
  PredictionRequest,
  PredictionResponse,
} from "../types/prediction";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getPrediction(
  payload: PredictionRequest,
): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      errorBody || "The prediction request could not be completed.",
    );
  }

  return response.json() as Promise<PredictionResponse>;
}