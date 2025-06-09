# 🔧 Debt Snowball/Avalanche Tracker – MVP Technical Document

> **Tech Stack**: React + Express.js (no authentication)
> **Goal**: Help users plan and visualize debt repayment using Snowball or Avalanche strategy.

---

## 📄 Pages & Components (React)

### 1. **`/` – Landing Page**

* Purpose: Explain the tool briefly and provide a "Start Tracking" button.
* Components:

  * `Header`
  * `IntroSection`
  * `GetStartedButton`

---

### 2. **`/tracker` – Debt Tracker Page**

* Purpose: Core functionality for input and visualization.
* Components:

  * `DebtForm` – Inputs for debt name, balance, min payment, interest rate.
  * `ExtraPaymentInput` – Field to input extra monthly payment (default = 50).
  * `StrategyToggle` – Toggle between "Snowball" and "Avalanche".
  * `DebtList` – Display debts in calculated repayment order.
  * `DebtCard` – Individual debt summary with highlight if targeted.

> All state can be managed with React `useState` + `useEffect`.

---

## 🧱 Backend Overview (Express.js)

### ✅ Base Folder Structure:

```
debt-tracker/
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI app entry point
│   │   ├── api/
│   │   │   └── routes.py   # Routes and logic
│   │   └── models.py       # Pydantic models
│   ├── requirements.txt
│   └── uvicorn.config.json
├── frontend/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
├── .gitignore
├── README.md

```

---

## 🗃️ Data Model (In-Memory – No Auth for MVP)

### Example Debt Object:

```js
{
  id: "uuid",
  name: "Credit Card A",
  balance: 3200,
  minPayment: 150,
  interestRate: 18.5
}
```

> Store in `debts = []` in memory (for MVP). Could switch to MongoDB or SQLite later.

---

## 📊 Database Structure (Optional Future)

### If SQL:

**Table: debts**

| Column         | Type    |
| -------------- | ------- |
| id             | UUID    |
| name           | TEXT    |
| balance        | DECIMAL |
| min\_payment   | DECIMAL |
| interest\_rate | DECIMAL |

### If MongoDB:

```js
{
  _id: ObjectId,
  name: String,
  balance: Number,
  minPayment: Number,
  interestRate: Number
}
```

---

## 🔁 Express API Routes

| Method | Endpoint         | Description                      |
| ------ | ---------------- | -------------------------------- |
| GET    | `/api/debts`     | Get list of debts                |
| POST   | `/api/debts`     | Add a new debt                   |
| DELETE | `/api/debts/:id` | Delete a specific debt           |
| POST   | `/api/calculate` | Calculate repayment order (core) |

---

### 📥 Example `POST /api/calculate` Input

```json
{
  "debts": [
    { "name": "Loan A", "balance": 1000, "minPayment": 50, "interestRate": 12.0 },
    ...
  ],
  "strategy": "snowball",
  "extraPayment": 50
}
```

### 📤 Example Response

```json
[
  {
    "name": "Loan A",
    "balance": 1000,
    "minPayment": 50,
    "interestRate": 12.0,
    "target": true
  },
  ...
]
```

---

## ⚙️ Logic: Snowball vs Avalanche

### Snowball

```js
debts.sort((a, b) => a.balance - b.balance);
```

### Avalanche

```js
debts.sort((a, b) => b.interestRate - a.interestRate);
```

### Optionally Add:

* Flag the top item with `target: true`
* Return ordered list to frontend for display

---

## 🧠 Optional Calculation: Months to Payoff

```js
function monthsToPayoff(balance, minPayment, extra, rate) {
  let months = 0;
  const monthlyRate = rate / 12 / 100;
  while (balance > 0 && months < 1000) {
    let interest = balance * monthlyRate;
    balance = balance + interest - (minPayment + extra);
    months++;
  }
  return months;
}
```

---

## 🧪 Sample Component Structure (React)

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

## 🔮 Stretch Features (Post-MVP)

| Feature               | Description                        |
| --------------------- | ---------------------------------- |
| Amortization Schedule | Month-by-month repayment breakdown |
| Charts                | Visualize progress (Chart.js)      |
| Payment History       | Track which months are paid        |
| Export                | Download plan as PDF               |
| Data Persistence      | Use localStorage or MongoDB        |

