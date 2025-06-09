import React from "react";

function StrategyToggle({ value, onChange }) {
  const radioStyle = {
    marginRight: "8px"
  };
  
  const labelStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    margin: "0 8px 0 0",
    borderRadius: "4px",
    cursor: "pointer",
    border: "1px solid #ccc",
    transition: "all 0.2s ease-in-out"
  };
  
  const activeStyle = {
    ...labelStyle,
    backgroundColor: "#e3f2fd",
    borderColor: "#1976d2",
    color: "#1976d2",
    fontWeight: "500"
  };
  
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", marginBottom: "0.5rem" }}>
        <label style={value === "snowball" ? activeStyle : labelStyle}>
          <input
            type="radio"
            name="strategy"
            value="snowball"
            checked={value === "snowball"}
            onChange={() => onChange("snowball")}
            style={radioStyle}
          />
          Snowball
        </label>
        <label style={value === "avalanche" ? activeStyle : labelStyle}>
          <input
            type="radio"
            name="strategy"
            value="avalanche"
            checked={value === "avalanche"}
            onChange={() => onChange("avalanche")}
            style={radioStyle}
          />
          Avalanche
        </label>
      </div>
    </div>
  );
}

export default StrategyToggle;