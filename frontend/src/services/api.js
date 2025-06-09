// API Service for communicating with the backend
const API_URL = 'http://localhost:8000/api';

/**
 * Get all debts from the API
 * @returns {Promise<Array>} Array of debt objects
 */
export const getDebts = async () => {
  const response = await fetch(`${API_URL}/debts`);
  if (!response.ok) {
    throw new Error(`Error fetching debts: ${response.statusText}`);
  }
  return response.json();
};

/**
 * Add a new debt
 * @param {Object} debt Debt object without ID
 * @returns {Promise<Object>} Response with success message and ID
 */
export const addDebt = async (debt) => {
  // Generate a UUID for the debt
  const debtWithId = {
    ...debt,
    id: crypto.randomUUID() // Modern browsers support this natively
  };
  
  const response = await fetch(`${API_URL}/debts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(debtWithId),
  });
  
  if (!response.ok) {
    throw new Error(`Error adding debt: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Delete a debt by ID
 * @param {string} id Debt ID to delete
 * @returns {Promise<Object>} Response with success message
 */
export const deleteDebt = async (id) => {
  const response = await fetch(`${API_URL}/debts/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Error deleting debt: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Calculate debt repayment based on strategy
 * @param {Array} debts Array of debt objects
 * @param {string} strategy "snowball" or "avalanche"
 * @param {number} extraPayment Extra payment amount
 * @returns {Promise<Array>} Sorted array of debts with target flag
 */
export const calculateRepayment = async (debts, strategy, extraPayment) => {
  const payload = {
    debts,
    strategy,
    extra_payment: extraPayment
  };
  
  const response = await fetch(`${API_URL}/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    throw new Error(`Error calculating repayment: ${response.statusText}`);
  }
  
  return response.json();
};
