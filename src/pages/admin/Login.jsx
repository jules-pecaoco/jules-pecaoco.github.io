import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../../firebase/auth";
import { seedDatabase } from "../../firebase/seed";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [seedStatus, setSeedStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setSeedStatus("Seeding...");
    try {
      await seedDatabase();
      setSeedStatus("Seeding complete!");
    } catch (err) {
      setSeedStatus(`Seeding failed: ${err.message}`);
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "var(--main-font)",
    background: "var(--background)",
    color: "var(--text)",
    gap: "2rem"
  };

  const formStyle = {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    borderRadius: "12px",
    background: "var(--background)",
    boxShadow: "0px 0px 10px 0.5px var(--secondary)",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center", margin: 0, fontFamily: "var(--heading-font)" }}>Admin Login</h2>
        {error && <p style={{ color: "red", fontSize: "0.9rem", textAlign: "center", margin: 0 }}>{error}</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "0.8rem", borderRadius: "4px", border: "1px solid var(--secondary)", background: "var(--background)", color: "var(--text)" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "0.8rem", borderRadius: "4px", border: "1px solid var(--secondary)", background: "var(--background)", color: "var(--text)" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "0.8rem", background: "var(--primary)", color: "var(--background)", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <button 
          onClick={handleSeed}
          style={{ padding: "0.5rem 1rem", background: "transparent", color: "var(--primary)", border: "1px dashed var(--primary)", borderRadius: "4px", cursor: "pointer" }}
        >
          Seed Database (First Time Setup)
        </button>
        {seedStatus && <p style={{ fontSize: "0.8rem", opacity: 0.8 }}>{seedStatus}</p>}
      </div>
    </div>
  );
};

export default Login;
