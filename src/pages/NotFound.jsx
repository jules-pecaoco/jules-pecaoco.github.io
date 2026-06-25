import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "var(--main-font)",
    background: "var(--background)",
    color: "var(--text)",
    textAlign: "center",
    padding: "20px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "6rem", fontFamily: "var(--heading-font)", color: "var(--primary)" }}>404</h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ fontSize: "1.2rem", maxWidth: "500px", marginBottom: "2rem" }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" style={{ padding: "0.8rem 1.5rem", background: "var(--primary)", color: "var(--background)", textDecoration: "none", borderRadius: "2rem", fontWeight: "bold", transition: "opacity 0.2s" }}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
