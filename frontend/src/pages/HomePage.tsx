import { useNavigate } from "react-router-dom";

import PredictionForm from "../components/PredictionForm";

export default function HomePage() {
  const navigate = useNavigate();

  function handlePrediction(predictedPrice: number) {
    navigate("/result", {
      state: {
        predictedPrice,
      },
    });
  }

  return (
    <main className="page-container">
      <section className="card">
        <p className="eyebrow">House Price Prediction</p>
        <h1>Estimate a property price</h1>
        <p className="intro">
          Enter the property details to receive a prediction from the trained
          machine-learning model.
        </p>

        <PredictionForm onPrediction={handlePrediction} />
      </section>
    </main>
  );
}