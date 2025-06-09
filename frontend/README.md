# Debt Snowball/Avalanche Frontend

This is the frontend application for the Debt Snowball/Avalanche Repayment Tracker.

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable React components
│   │   ├── DebtForm.jsx     # Form for entering debt information
│   │   ├── DebtList.jsx     # List of debts
│   │   ├── DebtCard.jsx     # Individual debt card
│   │   ├── ExtraPaymentInput.jsx   # Input for extra payment amount
│   │   └── StrategyToggle.jsx      # Toggle between strategies
│   ├── pages/           # Page components
│   │   ├── LandingPage.jsx  # Home page
│   │   └── TrackerPage.jsx  # Main debt tracker page
│   ├── services/        # API and other services
│   │   └── api.js       # API integration with backend
│   └── styles/          # CSS files
```

## Installation and Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Make sure the backend server is running (see backend README)

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:5173

## Features

- Add and remove debts with name, balance, minimum payment, and interest rate
- Choose between Snowball (pay smallest balance first) or Avalanche (pay highest interest first) methods
- Specify extra payment amount to apply to target debt
- View sorted repayment plan with target debt highlighted

## Integration with Backend API

The frontend communicates with the backend API using the following endpoints:

- `GET /api/debts` - Fetches all debts
- `POST /api/debts` - Adds a new debt (with auto-generated ID)
- `DELETE /api/debts/{id}` - Removes a debt
- `POST /api/calculate` - Calculates repayment order based on strategy

## Building for Production

```
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
