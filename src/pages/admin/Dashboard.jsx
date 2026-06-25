import React from "react";

const Dashboard = () => {
  const cardStyle = {
    padding: "20px",
    background: "var(--background)",
    border: "1px solid var(--secondary)",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    flex: 1,
    minWidth: "200px",
  };

  return (
    <div>
      <h1 style={{ fontFamily: "var(--heading-font)", marginBottom: "2rem" }}>Dashboard Overview</h1>
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <div style={cardStyle}>
          <h3>Projects</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "10px 0 0 0" }}>4</p>
        </div>
        <div style={cardStyle}>
          <h3>Events & Studies</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "10px 0 0 0" }}>0</p>
        </div>
        <div style={cardStyle}>
          <h3>Inbox Messages</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "10px 0 0 0" }}>0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
