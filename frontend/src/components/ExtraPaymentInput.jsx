import React, { useState } from "react";

function ExtraPaymentInput({ value, onChange }) {
  const [error, setError] = useState("");
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Validate the input
    if (newValue === "" || isNaN(newValue)) {
      setError("Please enter a valid number");
      return;
    }
    
    const numValue = Number(newValue);
    if (numValue < 0) {
      setError("Extra payment cannot be negative");
      return;
    }
    
    // Clear any previous error and update the value
    setError("");
    onChange(numValue);
  };
  
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Extra Payment: $
        <input
          type="number"
          value={value}
          min={0}
          step="0.01"
          onChange={handleChange}
          style={{ 
            width: 100, 
            marginLeft: 8, 
            padding: "0.3rem",
            border: error ? "1px solid #c62828" : "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
      </label>
      {error && (
        <div style={{ 
          color: "#c62828", 
          fontSize: "0.8rem",
          marginTop: "0.3rem"
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default ExtraPaymentInput;