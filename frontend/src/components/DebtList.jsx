import React from "react";
import DebtCard from "./DebtCard";

function DebtList({ debts, onRemoveDebt }) {
  // The debts are already sorted and marked with target by the backend
  return (
    <div className="debt-list">
      {debts.map((debt) => (
        <DebtCard
          key={debt.id}
          debt={debt}
          isTarget={debt.target}
          onRemove={() => onRemoveDebt(debt.id)}
        />
      ))}
    </div>
  );
}

export default DebtList;