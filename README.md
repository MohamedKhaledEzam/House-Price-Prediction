# House Price Prediction

An end-to-end machine-learning web application that estimates Indian property prices from property details such as location, area, floor, bathrooms, balconies, furnishing, transaction type, ownership, and facing.

## Features

- Data cleaning and exploratory analysis in a Jupyter notebook
- Linear Regression and Random Forest model comparison
- Random Forest model served through a FastAPI backend
- REST API with `GET /health` and `POST /predict`
- React + TypeScript frontend with validation, loading state, error handling, and formatted prediction results
- Automated FastAPI endpoint tests with pytest

## Architecture

```text
React + TypeScript frontend
        |
        | POST /predict
        v
FastAPI backend
        |
        v
Scikit-learn Random Forest pipeline
```

## Tech Stack

- Python
- pandas and NumPy
- scikit-learn
- FastAPI
- pytest
- React
- TypeScript
- Vite

## Project Structure

```text
house-price-project/
├── backend/
│   ├── app/
│   ├── models/
│   │   ├── house_price.pkl
│   │   └── locations.json
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── notebooks/
│   ├── data/
│   │   └── house_prices.csv
│   └── house_price_model.ipynb
└── README.md
```

## Dataset

This project uses the [House Price dataset by Juhi Bhojani on Kaggle](https://www.kaggle.com/datasets/juhibhojani/house-price).

Download the dataset and place `house_prices.csv` in:

```text
notebooks/data/
```

The raw dataset is intentionally excluded from Git because it is large.

## Model

The notebook cleans the raw listing data, including price, area, floor, bathroom, balcony, and location fields. It groups less frequent locations into `Other`, trains and compares Linear Regression and Random Forest regression models, and selects Random Forest for deployment.

The deployed pipeline expects:

- `area_sqft`
- `floor_num`
- `bathroom_num`
- `balcony_num`
- `location_grouped`
- `Furnishing`
- `Transaction`
- `Ownership`
- `facing`

## Backend Setup

```powershell
cd backend
python -m venv ../.venv
../.venv/Scripts/activate
pip install -r requirements.txt
```

Create `backend/.env`:

```env
FRONTEND_ORIGIN=http://localhost:5173
```

Run the API:

```powershell
uvicorn app.main:app --reload
```

Open Swagger documentation at:

```text
http://127.0.0.1:8000/docs
```

Run tests:

```powershell
pytest -q
```

## Frontend Setup

```powershell
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the development server:

```powershell
npm run dev
```

Open:

```text
http://localhost:5173/
```

Create a production build:

```powershell
npm run build
```

## Environment Variables

| File | Variable | Example value | Purpose |
|---|---|---|---|
| `backend/.env` | `FRONTEND_ORIGIN` | `http://localhost:5173` | Allows the React frontend through CORS |
| `frontend/.env` | `VITE_API_BASE_URL` | `http://localhost:8000` | Defines the FastAPI API base URL |

## API Reference

### Health check

```text
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

### Predict price

```text
POST /predict
```

Example request:

```json
{
  "area_sqft": 1200,
  "floor_num": 3,
  "bathroom_num": 2,
  "balcony_num": 1,
  "location": "bangalore",
  "furnishing": "Semi-Furnished",
  "transaction": "New Property",
  "ownership": "Freehold",
  "facing": "East"
}
```

Example curl command:

```powershell
curl -X POST "http://127.0.0.1:8000/predict" `
  -H "Content-Type: application/json" `
  -d "{\"area_sqft\":1200,\"floor_num\":3,\"bathroom_num\":2,\"balcony_num\":1,\"location\":\"bangalore\",\"furnishing\":\"Semi-Furnished\",\"transaction\":\"New Property\",\"ownership\":\"Freehold\",\"facing\":\"East\"}"
```

## Model Metrics

Replace the values below with the final test-set metrics from your notebook.

| Model | MAE | RMSE | R² |
|---|---:|---:|---:|
| Linear Regression | ₹4,580,502.41 | ₹9,317,660.52 | 0.5988 |
| Random Forest | ₹1,051,386.87 | ₹5,928,642.03 | 0.8376 |

Random Forest was selected because it achieved lower MAE/RMSE and higher R² on the held-out test set.

## Demo screenshots

### Prediction form

![Prediction form](docs/screenshots/Completed%20Prediction%20Form%20before%20submitting.png)

### Prediction result

![Prediction result](docs/screenshots/Predicted%20Price.png)

### FastAPI documentation

![FastAPI Swagger documentation](docs/screenshots/API%20Doc.png)
