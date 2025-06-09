import React from "react";
import DebtCard from "./DebtCard";

function DebtList({ debts, strategy, extraPayment, onRemoveDebt }) {
  // Sort debts according to strategy
  let sortedDebts = [...debts];
  if (strategy === "snowball") {
    sortedDebts.sort((a, b) => a.balance - b.balance);
  } else {
    sortedDebts.sort((a, b) => b.interest_rate - a.interest_rate);
  }
  return (
    <div>
      {sortedDebts.map((debt, idx) => (
        <DebtCard
          key={idx}
          debt={debt}
          isTarget={idx === 0}
          onRemove={() => onRemoveDebt(debts.indexOf(debt))}
        />
      ))}
    </div>
  );
}

export default DebtList;