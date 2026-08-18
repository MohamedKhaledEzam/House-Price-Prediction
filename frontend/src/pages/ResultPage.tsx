import { Link, useLocation } from "react-router-dom";

type ResultLocationState = {
  predictedPrice?: number;
};

export default function ResultPage() {
  const location = useLocation();
  const state = location.state as ResultLocationState | null;
  const predictedPrice = state?.predictedPrice;

  if (predictedPrice === undefined) {
    return (
      <main className="page-container">
        <section className="card result-card">
          <h1>No prediction available</h1>
          <p>Please submit the property form before opening this page.</p>
          <Link className="secondary-button" to="/">
            Go to prediction form
          </Link>
        </section>
      </main>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(predictedPrice);

  return (
    <main className="page-container">
      <section className="card result-card">
        <p className="eyebrow">Prediction result</p>
        <h1>Estimated property price</h1>
        <p className="predicted-price">{formattedPrice}</p>
        <p className="intro">
          This is a model estimate based on the property information you
          provided. Actual prices can vary with market conditions and listing
          details.
        </p>

        <Link className="secondary-button" to="/">
          Make another prediction
        </Link>
      </section>
    </main>
  );
}