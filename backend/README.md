# Debt Snowball/Avalanche API

This is the backend API for the Debt Snowball/Avalanche Repayment Tracker application.

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── routes.py           # FastAPI route handlers
│   ├── core/
│   │   ├── models.py           # Pydantic models (Debt, CalculationRequest)
│   │   └── logic.py            # Core calculation logic (snowball/avalanche)
│   ├── main.py                 # FastAPI entry point
│   └── __init__.py
├── requirements.txt            # Python dependencies
└── uvicorn.config.json         # Server configuration
```

## API Endpoints

| Method   | Endpoint                 | Description                      |
|----------|--------------------------|----------------------------------|
| `GET`    | `/api/debts`             | Return list of all debts         |
| `POST`   | `/api/debts`             | Add a new debt                   |
| `DELETE` | `/api/debts/{id}`        | Delete a debt                    |
| `POST`   | `/api/calculate`         | Calculate repayment order        |
| `GET`    | `/`                      | Health check endpoint            |

## Installation and Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the server:
   ```
   uvicorn app.main:app --reload
   ```

5. Access the API documentation at:
   - http://localhost:8000/docs (Swagger UI)
   - http://localhost:8000/redoc (ReDoc)

## Development

API models are defined using Pydantic in `app/core/models.py`.

Core business logic for the debt repayment strategies is in `app/core/logic.py`.

API routes are defined in `app/api/routes.py`.

## Data Model

### Debt

```json
{
  "id": "string",
  "name": "string",
  "balance": 0.0,
  "min_payment": 0.0,
  "interest_rate": 0.0,
  "target": false
}
```

### CalculationRequest

```json
{
  "debts": [
    {
      "id": "string",
      "name": "string",
      "balance": 0.0,
      "min_payment": 0.0,
      "interest_rate": 0.0,
      "target": false
    }
  ],
  "strategy": "string",
  "extra_payment": 0.0
}
```
