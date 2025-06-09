import React from "react";

function ResultList({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Debt Names</h3>
      <ul>
        {results.map((debt, idx) => (
          <li key={idx}>{debt.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResultList;