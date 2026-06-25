import React from "react";

const LoadingSpinner = ({ fullScreen }) => {
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: fullScreen ? "100vh" : "200px",
    background: fullScreen ? "var(--background)" : "transparent",
    color: "var(--primary)",
    fontFamily: "var(--main-font)",
    flexDirection: "column",
    gap: "1rem",
  };

  const ringStyle = {
    width: "50px",
    height: "50px",
    border: "5px solid var(--secondary)",
    borderTop: "5px solid var(--primary)",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={spinnerStyle}>
      <div style={ringStyle}></div>
      <p style={{ fontSize: "1.2rem", fontWeight: 500 }}>Loading...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
