
# Debt Snowball/Avalanche Calculator & Tracker


## Project Structure

```bash
root dir/
├── backend/         # FastAPI backend
│   ├── app/
│   ├── requirements.txt
│   └── uvicorn.config.json
├── frontend/        # Vite + React frontend
│   ├── src/
│   └── package.json
└── README.md        # This file

```


## Run backend

```bash
# 1. Navigate to backend
cd backend

# 2. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. (Optional) Ensure `__init__.py` exists
touch app/__init__.py

# 5. Run the development server
fastapi dev app/main.py --app app
# OR use uvicorn:
# uvicorn app.main:app --reload
```


## Run frontend
```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

```


