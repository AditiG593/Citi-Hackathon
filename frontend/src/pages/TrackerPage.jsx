import React, { useState, useEffect } from "react";
import DebtForm from "../components/DebtForm";
import ExtraPaymentInput from "../components/ExtraPaymentInput";
import StrategyToggle from "../components/StrategyToggle";
import DebtList from "../components/DebtList";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { getDebts, addDebt, deleteDebt, calculateRepayment } from "../services/api";
import "../styles/TrackerPage.css";

function TrackerPage() {
  const [debts, setDebts] = useState([]);
  const [extraPayment, setExtraPayment] = useState(50);
  const [strategy, setStrategy] = useState("snowball");
  const [calculatedDebts, setCalculatedDebts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  // Track different loading states
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAddingDebt, setIsAddingDebt] = useState(false);
  const [isDeletingDebt, setIsDeletingDebt] = useState(false);

  // Load debts from localStorage on initial render
  useEffect(() => {
    const loadLocalDebts = () => {
      const savedDebts = localStorage.getItem('debts');
      if (savedDebts) {
        try {
          return JSON.parse(savedDebts);
        } catch (e) {
          console.error('Failed to parse saved debts', e);
        }
      }
      return null;
    };
    
    // Fetch debts from API or localStorage
    const fetchInitialDebts = async () => {
      try {
        setIsInitialLoading(true);
        
        // Try to load from localStorage first for instant loading
        const localDebts = loadLocalDebts();
        if (localDebts && localDebts.length > 0) {
          setDebts(localDebts);
        }
        
        // Then fetch from API to ensure data is up-to-date
        const fetchedDebts = await getDebts();
        setDebts(fetchedDebts);
        
        // Save to localStorage for future use
        localStorage.setItem('debts', JSON.stringify(fetchedDebts));
        
        setError(null);
      } catch (err) {
        console.error("Failed to fetch debts:", err);
        
        // If we have local debts, use those instead of showing an error
        const localDebts = loadLocalDebts();
        if (localDebts && localDebts.length > 0) {
          setDebts(localDebts);
        } else {
          setError("Failed to load debts. Please try again later.");
        }
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialDebts();
  }, []);
  const handleAddDebt = async (newDebt) => {
    try {
      setIsAddingDebt(true);
      setError(null);
      
      // The API service will handle adding the ID
      await addDebt(newDebt);
      
      // Refresh the debt list after adding
      const updatedDebts = await getDebts();
      setDebts(updatedDebts);
    } catch (err) {
      console.error("Failed to add debt:", err);
      setError("Failed to add debt. Please try again.");
    } finally {
      setIsAddingDebt(false);
    }
  };
  const handleRemoveDebt = async (id) => {
    try {
      setIsDeletingDebt(true);
      setError(null);
      
      await deleteDebt(id);
      
      // Refresh the debt list after deletion
      const updatedDebts = await getDebts();
      setDebts(updatedDebts);
      
      // Also clear calculated debts if we've deleted a debt
      if (calculatedDebts.length > 0) {
        setCalculatedDebts([]);
      }
    } catch (err) {
      console.error("Failed to remove debt:", err);
      setError("Failed to remove debt. Please try again.");
    } finally {
      setIsDeletingDebt(false);
    }
  };

  const handleStrategyChange = (newStrategy) => {
    setStrategy(newStrategy);
  };

  const handleExtraPaymentChange = (value) => {
    setExtraPayment(value);
  };

  // Calculate debt repayment using the backend API
  const handleCalculate = async () => {
    if (debts.length === 0) {
      setError("Please add at least one debt to calculate repayment.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await calculateRepayment(debts, strategy, extraPayment);
      setCalculatedDebts(result);
      setError(null);
    } catch (err) {
      console.error("Failed to calculate repayment:", err);
      setError("Failed to calculate repayment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tracker-container">
      <h1>Debt Repayment Tracker</h1>
      
      {/* Initial Loading State */}
      {isInitialLoading ? (
        <div className="loading-container">
          <LoadingSpinner size="large" />
          <p>Loading your debt information...</p>
        </div>
      ) : (
        <>
          <section className="input-section">
            <h2>Enter Your Debts</h2>
            <DebtForm onAddDebt={handleAddDebt} />
            
            <div className="strategy-section">
              <h2>Payment Strategy</h2>
              <StrategyToggle value={strategy} onChange={handleStrategyChange} />
              <ExtraPaymentInput value={extraPayment} onChange={handleExtraPaymentChange} />
              
              <div className="strategy-explanation">
                <p><strong>Snowball Method:</strong> Pay off debts from smallest to largest balance. Good for motivation.</p>
                <p><strong>Avalanche Method:</strong> Pay off debts from highest to lowest interest rate. Saves the most money.</p>
              </div>
              
              <button 
                onClick={handleCalculate} 
                disabled={isLoading || debts.length === 0} 
                className="calculate-btn"
              >
                {isLoading ? (
                  <>
                    <span className="spinner-text">Calculating...</span>
                  </>
                ) : "Calculate Repayment Plan"}
              </button>
            </div>
          </section>

          {error && <ErrorMessage message={error} />}
          
          <section className="results-section">
            <h2>Your Debts</h2>
            {isDeletingDebt && (
              <div className="loading-indicator">
                <LoadingSpinner size="small" />
                <span>Updating...</span>
              </div>
            )}
            {debts.length === 0 ? (
              <p>No debts added yet. Use the form above to add debts.</p>
            ) : (
              <DebtList 
                debts={calculatedDebts.length > 0 ? calculatedDebts : debts} 
                onRemoveDebt={handleRemoveDebt} 
              />
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default TrackerPage;
