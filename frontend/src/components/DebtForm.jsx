import React, { useState } from "react";

function DebtForm({ onAddDebt }) {
  const [form, setForm] = useState({ name: "", balance: "", min_payment: "", interest_rate: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.balance && form.min_payment && form.interest_rate) {
      onAddDebt({ ...form, balance: parseFloat(form.balance), min_payment: parseFloat(form.min_payment), interest_rate: parseFloat(form.interest_rate) });
      setForm({ name: "", balance: "", min_payment: "", interest_rate: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="balance" type="number" placeholder="Balance" value={form.balance} onChange={handleChange} required />
      <input name="min_payment" type="number" placeholder="Min Payment" value={form.min_payment} onChange={handleChange} required />
      <input name="interest_rate" type="number" placeholder="Interest Rate (%)" value={form.interest_rate} onChange={handleChange} required />
      <button type="submit">Add Debt</button>
    </form>
  );
}

export default DebtForm;