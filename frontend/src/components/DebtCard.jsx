import React from "react";

function DebtCard({ debt, isTarget, onRemove }) {
  const cardStyle = {
    border: isTarget ? "2px solid #1976d2" : "1px solid #222c37",
    background: isTarget ? "#101a24" : "#181f29",
    padding: "1.5rem 1.5rem 1.25rem 1.5rem",
    marginBottom: "1.5rem",
    borderRadius: 16,
    position: "relative",
    transition: "all 0.3s ease",
    boxShadow: isTarget
      ? "0 4px 16px rgba(25, 118, 210, 0.18)"
      : "0 2px 8px rgba(0,0,0,0.10)",
    color: "#fff"
  };

  const titleStyle = {
    fontSize: "1.35rem",
    marginBottom: "1.2rem",
    color: isTarget ? "#42a5f5" : "#fff",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  };

  const infoGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.2rem",
    marginBottom: "0.5rem"
  };

  const infoItemStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: isTarget ? "#182a3a" : "#202a36",
    padding: "1rem 1.2rem",
    borderRadius: "10px",
    minWidth: 0
  };

  const labelStyle = {
    fontSize: "0.95rem",
    color: "#b0b8c1",
    marginBottom: "0.3rem",
    fontWeight: 500
  };

  const valueStyle = {
    fontWeight: 700,
    fontSize: "1.15rem",
    color: isTarget ? "#42a5f5" : "#fff"
  };

  const targetBadgeStyle = {
    backgroundColor: "#1976d2",
    color: "#fff",
    padding: "0.7rem 1.2rem",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "0.5rem",
    boxShadow: "0 2px 5px rgba(25, 118, 210, 0.18)"
  };

  const removeButtonStyle = {
    position: "absolute",
    top: 18,
    right: 18,
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px 18px",
    cursor: "pointer",
    transition: "background 0.2s ease",
    fontWeight: 600,
    fontSize: "1rem",
    boxShadow: "0 2px 5px rgba(244, 67, 54, 0.18)"
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>
        {isTarget && <span style={{fontSize: "1.3rem"}}>🎯</span>}
        {debt.name}
      </div>
      <div style={infoGridStyle}>
        <div style={infoItemStyle}>
          <span style={labelStyle}>Balance</span>
          <span style={valueStyle}>${debt.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
        </div>
        <div style={infoItemStyle}>
          <span style={labelStyle}>Minimum Payment</span>
          <span style={valueStyle}>${debt.min_payment.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
        </div>
        <div style={infoItemStyle}>
          <span style={labelStyle}>Interest Rate</span>
          <span style={valueStyle}>{debt.interest_rate.toFixed(2)}%</span>
        </div>
        <div style={infoItemStyle}>
          <span style={labelStyle}>Status</span>
          {isTarget ? (
            <span style={targetBadgeStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.45 12.15l-12 12-5.5-5.5 1.4-1.4 4.1 4.1 10.6-10.6 1.4 1.4z"></path>
              </svg>
              Target Debt
            </span>
          ) : (
            <span style={{color: "#b0b8c1", fontWeight: 500}}>—</span>
          )}
        </div>
      </div>
      <button onClick={onRemove} style={removeButtonStyle}>
        Remove
      </button>
    </div>
  );
}

export default DebtCard;