import { useState } from "react";
import type { FormEvent } from "react";

import { getPrediction } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";

type PredictionFormProps = {
  onPrediction: (predictedPrice: number) => void;
};

const locations = [
  "Whitefield",
  "Electronic City",
  "Marathahalli",
  "HSR Layout",
  "Koramangala",
  "Indiranagar",
  "Other",
];

const furnishingOptions = [
  "Furnished",
  "Semi-Furnished",
  "Unfurnished",
];

const transactionOptions = [
  "New Property",
  "Resale",
];

const ownershipOptions = [
  "Freehold",
  "Leasehold",
  "Co-operative Society",
  "Power Of Attorney",
];

const facingOptions = [
  "East",
  "West",
  "North",
  "South",
  "North-East",
  "North-West",
  "South-East",
  "South-West",
];

const initialForm: PredictionRequest = {
  area_sqft: 1200,
  floor_num: 1,
  bathroom_num: 2,
  balcony_num: 1,
  location: "",
  furnishing: "",
  transaction: "",
  ownership: "",
  facing: "",
};

export default function PredictionForm({
  onPrediction,
}: PredictionFormProps) {
  const [form, setForm] = useState<PredictionRequest>(initialForm);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function updateField<K extends keyof PredictionRequest>(
    field: K,
    value: PredictionRequest[K],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (
      form.area_sqft <= 0 ||
      !form.location ||
      !form.furnishing ||
      !form.transaction ||
      !form.ownership ||
      !form.facing
    ) {
      setError("Please complete every field and enter an area greater than 0.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await getPrediction(form);
      onPrediction(result.predicted_price);
    } catch {
      setError(
        "Unable to get a prediction. Check that the backend is running on port 8000.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      <label>
        Location
        <select
          value={form.location}
          onChange={(event) => updateField("location", event.target.value)}
          required
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      <label>
        Area (sq ft)
        <input
          type="number"
          min="1"
          value={form.area_sqft}
          onChange={(event) =>
            updateField("area_sqft", Number(event.target.value))
          }
          required
        />
      </label>

      <label>
        Floor number
        <input
          type="number"
          min="0"
          value={form.floor_num}
          onChange={(event) =>
            updateField("floor_num", Number(event.target.value))
          }
          required
        />
      </label>

      <label>
        Bathrooms
        <input
          type="number"
          min="1"
          value={form.bathroom_num}
          onChange={(event) =>
            updateField("bathroom_num", Number(event.target.value))
          }
          required
        />
      </label>

      <label>
        Balconies
        <input
          type="number"
          min="0"
          value={form.balcony_num}
          onChange={(event) =>
            updateField("balcony_num", Number(event.target.value))
          }
          required
        />
      </label>

      <label>
        Furnishing
        <select
          value={form.furnishing}
          onChange={(event) => updateField("furnishing", event.target.value)}
          required
        >
          <option value="">Select furnishing</option>
          {furnishingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Transaction
        <select
          value={form.transaction}
          onChange={(event) => updateField("transaction", event.target.value)}
          required
        >
          <option value="">Select transaction type</option>
          {transactionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Ownership
        <select
          value={form.ownership}
          onChange={(event) => updateField("ownership", event.target.value)}
          required
        >
          <option value="">Select ownership type</option>
          {ownershipOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Facing
        <select
          value={form.facing}
          onChange={(event) => updateField("facing", event.target.value)}
          required
        >
          <option value="">Select facing</option>
          {facingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Calculating..." : "Predict Price"}
      </button>
    </form>
  );
}