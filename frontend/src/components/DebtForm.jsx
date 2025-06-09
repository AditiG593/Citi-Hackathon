import React, { useState } from "react";

function DebtForm({ onAddDebt, isLoading }) {
  const [form, setForm] = useState({
    name: "",
    balance: "",
    min_payment: "",
    interest_rate: "",
    target: false // Initialize with default value matching backend model
  });

  const [errors, setErrors] = useState({
    name: "",
    balance: "",
    min_payment: "",
    interest_rate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate balance
    if (!form.balance) {
      newErrors.balance = "Balance is required";
      isValid = false;
    } else if (parseFloat(form.balance) <= 0) {
      newErrors.balance = "Balance must be greater than 0";
      isValid = false;
    }

    // Validate minimum payment
    if (!form.min_payment) {
      newErrors.min_payment = "Minimum payment is required";
      isValid = false;
    } else if (parseFloat(form.min_payment) <= 0) {
      newErrors.min_payment = "Minimum payment must be greater than 0";
      isValid = false;
    } else if (parseFloat(form.min_payment) > parseFloat(form.balance)) {
      newErrors.min_payment = "Minimum payment cannot be greater than balance";
      isValid = false;
    }

    // Validate interest rate
    if (!form.interest_rate) {
      newErrors.interest_rate = "Interest rate is required";
      isValid = false;
    } else if (parseFloat(form.interest_rate) < 0) {
      newErrors.interest_rate = "Interest rate cannot be negative";
      isValid = false;
    } else if (parseFloat(form.interest_rate) > 100) {
      newErrors.interest_rate = "Interest rate cannot exceed 100%";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddDebt({
        name: form.name,
        balance: parseFloat(form.balance),
        min_payment: parseFloat(form.min_payment),
        interest_rate: parseFloat(form.interest_rate),
        target: false // Ensure this is sent to backend
      });
      setForm({ name: "", balance: "", min_payment: "", interest_rate: "", target: false });
    }
  };
  const containerStyle = {
    background: "#f9f9f9",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    marginBottom: "1.5rem"
  };

  const formGroupStyle = {
    marginBottom: "1.25rem",
    position: "relative"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#555"
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "#495057",
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
    border: "1px solid #ced4da",
    borderRadius: "8px",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05) inset"
  };

  const errorStyle = {
    color: "#c62828",
    fontSize: "0.85rem",
    marginTop: "0.4rem",
    marginBottom: "0.2rem",
    display: "flex",
    alignItems: "center"
  };

  return (
    <form onSubmit={handleSubmit} style={containerStyle}>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Debt Name</label>
        <input 
          name="name" 
          placeholder="e.g. Credit Card, Student Loan, Mortgage" 
          value={form.name} 
          onChange={handleChange} 
          style={inputStyle}
        />
        {errors.name && <div style={errorStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#c62828" style={{marginRight: "6px"}}>
            <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
          {errors.name}
        </div>}
      </div>
      
      <div style={formGroupStyle}>
        <label style={labelStyle}>Balance ($)</label>
        <input 
          name="balance" 
          type="number" 
          placeholder="Current balance amount" 
          value={form.balance} 
          onChange={handleChange} 
          style={inputStyle}
          step="0.01"
          min="0"
        />
        {errors.balance && <div style={errorStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#c62828" style={{marginRight: "6px"}}>
            <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
          {errors.balance}
        </div>}
      </div>
      
      <div style={formGroupStyle}>
        <label style={labelStyle}>Minimum Payment ($)</label>
        <input 
          name="min_payment" 
          type="number" 
          placeholder="Monthly minimum payment required" 
          value={form.min_payment} 
          onChange={handleChange}
          style={inputStyle}
          step="0.01"
          min="0"
        />
        {errors.min_payment && <div style={errorStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#c62828" style={{marginRight: "6px"}}>
            <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
          {errors.min_payment}
        </div>}
      </div>
      
      <div style={formGroupStyle}>
        <label style={labelStyle}>Interest Rate (%)</label>
        <input 
          name="interest_rate" 
          type="number" 
          placeholder="Annual interest rate percentage" 
          value={form.interest_rate} 
          onChange={handleChange}
          style={inputStyle}
          step="0.01"
          min="0"
          max="100"
        />
        {errors.interest_rate && <div style={errorStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#c62828" style={{marginRight: "6px"}}>
            <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
          {errors.interest_rate}
        </div>}
      </div>      <button 
        type="submit" 
        disabled={isLoading}
        style={{
          background: isLoading ? "#b0bec5" : "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "0.8rem 1.5rem",
          cursor: isLoading ? "not-allowed" : "pointer",
          fontSize: "1rem",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease",
          width: "fit-content"
        }}
      >
        {isLoading ? (
          <>
            <span style={{ 
              display: "inline-block", 
              width: "18px", 
              height: "18px", 
              border: "2px solid #fff",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginRight: "10px"
            }}></span>
            Adding Debt...
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: "8px"}}>
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg>
            Add Debt
          </>
        )}
      </button>
    </form>
  );
}

export default DebtForm;