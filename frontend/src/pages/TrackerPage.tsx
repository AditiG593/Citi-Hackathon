import React, { useState } from "react";
import DebtForm from "../components/DebtForm";
import ExtraPaymentInput from "../components/ExtraPaymentInput";
import StrategyToggle from "../components/StrategyToggle";
import DebtList from "../components/DebtList";
import ResultList from "../components/ResultList";

function TrackerPage() {
  type Debt = {
    name: string;
    amount: number;
    interestRate: number;
  };

  const [debts, setDebts] = useState<Debt[]>([]);
  const [extraPayment, setExtraPayment] = useState(50);
  const [strategy, setStrategy] = useState("snowball");
  const [results, setResults] = useState<Debt[]>([]);

  const handleAddDebt = (debt) => {
    setDebts([...debts, debt]);
  };

  const handleRemoveDebt = (index) => {
    setDebts(debts.filter((_, i) => i !== index));
  };

  const handleStrategyChange = (newStrategy) => {
    setStrategy(newStrategy);
  };

  const handleExtraPaymentChange = (value) => {
    setExtraPayment(value);
  };

  // Simulate calculation and set results
  const handleSubmit = () => {
    let sortedDebts = [...debts];
    if (strategy === "snowball") {
      sortedDebts.sort((a, b) => a.amount - b.amount);
    } else {
      sortedDebts.sort((a, b) => b.interestRate - a.interestRate);
    }
    // Mark the first as target
    sortedDebts = sortedDebts.map((debt, idx) => ({
      ...debt,
      target: idx === 0,
    }));
    setResults(sortedDebts);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "2.5rem",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2.5rem",
          fontSize: "2rem",
          color: "#2d3748",
        }}
      >
        Debt Tracker
      </h2>

      <section style={{ marginBottom: "2rem" }}>
        <DebtForm onAddDebt={handleAddDebt} />
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <ExtraPaymentInput value={extraPayment} onChange={handleExtraPaymentChange} />
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <StrategyToggle value={strategy} onChange={handleStrategyChange} />
      </section>

      <section>
        <DebtList
          debts={debts}
          strategy={strategy}
          extraPayment={extraPayment}
          onRemoveDebt={handleRemoveDebt}
        />
      </section>
      {/* Submit Button */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
   {/* Result List */}
      <ResultList results={results} />
    </div>
  );
}

export default TrackerPage;