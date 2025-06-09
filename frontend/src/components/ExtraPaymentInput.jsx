import React from "react";

function ExtraPaymentInput({ value, onChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Extra Payment: $
        <input
          type="number"
          value={value}
          min={0}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ width: 80, marginLeft: 8 }}
        />
      </label>
    </div>
  );
}

export default ExtraPaymentInput;