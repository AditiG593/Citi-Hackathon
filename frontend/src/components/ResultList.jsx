import React from "react";
import DebtCard from "./DebtCard";

function ResultList({ debts, onRemoveDebt }) {
  if (!debts || debts.length === 0) {
    return (
      <div className="no-results">
        <p>No debts to display. Add some debts to see your repayment plan.</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h3>Your Repayment Plan</h3>
      <p>Pay the minimum payment on all debts, plus the extra amount on your target debt.</p>
      
      <div className="debt-cards">
        {debts.map((debt) => (
          <DebtCard
            key={debt.id}
            debt={debt}
            isTarget={debt.target}
            onRemove={() => onRemoveDebt(debt.id)}
          />
        ))}
      </div>
    </div>
  );

export default ResultList;