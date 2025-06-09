# 📘 MVP Technical Document

### Debt Snowball / Avalanche Repayment Tracker

**Frontend**: ReactJS
**Backend**: FastAPI (Python)
**No Authentication (for MVP)**

---

## 🎯 Goal:

Allow users to:

* Enter debts
* Specify an extra payment amount
* Choose repayment strategy: **Snowball** or **Avalanche**
* Display debts reordered based on the chosen method

---

## 🧱 Project Structure

```
project-root/
├── client/                   # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
├── server/                   # FastAPI Backend
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── routes/
│       └── debt_routes.py
├── requirements.txt
├── README.md
└── package.json
```

---

## 🖼️ Frontend Pages (ReactJS)

### 1. `/` – Landing Page

* **Description**: App intro and "Get Started" CTA
* **Components**:

  * `Header`
  * `IntroSection`
  * `GetStartedButton` (navigates to `/tracker`)

### 2. `/tracker` – Debt Tracker

* **Components**:

  * `DebtForm` (input name, balance, min payment, interest rate)
  * `ExtraPaymentInput` (default \$50)
  * `StrategyToggle` (radio or toggle between snowball/avalanche)
  * `DebtList` (display reordered debts)
  * `DebtCard` (one per debt, highlights first target)

> Use `useState` and `useEffect` to manage form data and API interaction.

---

## 📦 Backend (FastAPI)

### ✔️ Endpoints

| Method   | Endpoint      | Description               |
| -------- | ------------- | ------------------------- |
| `GET`    | `/debts`      | Return list of all debts  |
| `POST`   | `/debts`      | Add a new debt            |
| `DELETE` | `/debts/{id}` | Delete a debt             |
| `POST`   | `/calculate`  | Calculate repayment order |

---

### 📤 Sample `POST /calculate` Input

```json
{
  "debts": [
    {
      "name": "Credit Card 1",
      "balance": 3000,
      "min_payment": 100,
      "interest_rate": 18.5
    },
    {
      "name": "Loan A",
      "balance": 2000,
      "min_payment": 150,
      "interest_rate": 8.0
    }
  ],
  "strategy": "avalanche",
  "extra_payment": 50
}
```

### 📥 Sample Response

```json
[
  {
    "name": "Credit Card 1",
    "balance": 3000,
    "min_payment": 100,
    "interest_rate": 18.5,
    "target": true
  },
  {
    "name": "Loan A",
    "balance": 2000,
    "min_payment": 150,
    "interest_rate": 8.0,
    "target": false
  }
]
```

---

## 🧠 Logic Implementation

### Snowball:

```python
sorted_debts = sorted(debts, key=lambda d: d.balance)
```

### Avalanche:

```python
sorted_debts = sorted(debts, key=lambda d: d.interest_rate, reverse=True)
```

* Return sorted list
* Add `"target": True` to the first debt in the repayment order

---

## 🗃️ Data Model (In-memory for MVP)

### FastAPI Schema (`schemas.py`)

```python
from pydantic import BaseModel

class Debt(BaseModel):
    name: str
    balance: float
    min_payment: float
    interest_rate: float

class CalculationRequest(BaseModel):
    debts: list[Debt]
    strategy: str
    extra_payment: float
```

> No database is needed for the MVP. Debts can be stored in a simple list.

---

## 🧪 React Component Layout

```
src/
├── pages/
│   ├── LandingPage.jsx
│   └── TrackerPage.jsx
├── components/
│   ├── DebtForm.jsx
│   ├── ExtraPaymentInput.jsx
│   ├── StrategyToggle.jsx
│   ├── DebtList.jsx
│   └── DebtCard.jsx
```


## 🎯 Stretch Features (If Time Allows)

| Feature            | Description                                 |
| ------------------ | ------------------------------------------- |
| Amortization Table | Month-wise payoff simulation                |
| Charts             | Use Chart.js for balance tracking           |
| Export             | Download repayment plan as PDF              |
| localStorage Sync  | Save user session locally                   |
| Deployment         | Host on Vercel (frontend), Render (backend) |


