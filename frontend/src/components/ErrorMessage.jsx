import React from 'react';

function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <div 
      style={{
        backgroundColor: '#ffebee',
        color: '#c62828',
        padding: '10px 15px',
        borderRadius: '4px',
        marginBottom: '15px',
        borderLeft: '4px solid #c62828',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <span style={{ marginRight: '8px' }}>⚠️</span>
      {message}
    </div>
  );
}

export default ErrorMessage;
