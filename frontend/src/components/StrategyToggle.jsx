import React from "react";

function StrategyToggle({ value, onChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        <input
          type="radio"
          name="strategy"
          value="snowball"
          checked={value === "snowball"}
          onChange={() => onChange("snowball")}
        />
        Snowball
      </label>
      <label style={{ marginLeft: 16 }}>
        <input
          type="radio"
          name="strategy"
          value="avalanche"
          checked={value === "avalanche"}
          onChange={() => onChange("avalanche")}
        />
        Avalanche
      </label>
    </div>
  );
}

export default StrategyToggle;