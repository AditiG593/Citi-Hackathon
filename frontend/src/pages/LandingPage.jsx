import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
        padding: "2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Header />
      <IntroSection />
      <GetStartedButton onClick={() => navigate("/tracker")} />
    </div>
  );
}

function Header() {
  return (
    <h1
      style={{
        fontSize: "3rem",
        marginBottom: "1.5rem",
        color: "#1a202c",
        textAlign: "center",
      }}
    >
      Debt Snowball / Avalanche Repayment Tracker
    </h1>
  );
}

function IntroSection() {
  return (
    <p
      style={{
        fontSize: "1.2rem",
        maxWidth: "600px",
        textAlign: "center",
        marginBottom: "2.5rem",
        color: "#4a5568",
        lineHeight: "1.6",
      }}
    >
      Easily organize your debts and visualize your path to financial freedom. Choose your strategy, add extra payments, and see your progress with confidence.
    </p>
  );
}

function GetStartedButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "1rem 2.5rem",
        fontSize: "1.1rem",
        background: "#2b6cb0",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "background 0.3s, transform 0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.background = "#2c5282")}
      onMouseLeave={(e) => (e.target.style.background = "#2b6cb0")}
    >
      Get Started
    </button>
  );
}

export default LandingPage;
