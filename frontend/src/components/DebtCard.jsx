import React from "react";

function DebtCard({ debt, isTarget, onRemove }) {
  return (
    <div
      style={{
        border: isTarget ? "2px solid #1976d2" : "1px solid #ccc",
        background: isTarget ? "#e3f2fd" : "#fff",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: 8,
        position: "relative"
      }}
    >
      <strong>{debt.name}</strong>
      <div>Balance: ${debt.balance}</div>
      <div>Min Payment: ${debt.min_payment}</div>
      <div>Interest Rate: {debt.interest_rate}%</div>
      {isTarget && <span style={{ color: "#1976d2", fontWeight: "bold" }}>🎯 Target</span>}
      <button onClick={onRemove} style={{ position: "absolute", top: 8, right: 8 }}>Remove</button>
    </div>
  );
}

export default DebtCard;