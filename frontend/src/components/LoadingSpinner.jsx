import React from "react";

function LoadingSpinner({ size = "medium" }) {
  const sizeMap = {
    small: { width: "20px", height: "20px" },
    medium: { width: "30px", height: "30px" },
    large: { width: "50px", height: "50px" }
  };
  
  const dimensions = sizeMap[size] || sizeMap.medium;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem"
    }}>
      <div style={{
        border: "4px solid rgba(0, 0, 0, 0.1)",
        borderTopColor: "#1976d2",
        borderRadius: "50%",
        ...dimensions,
        animation: "spin 1s linear infinite"
      }}>
        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default LoadingSpinner;
