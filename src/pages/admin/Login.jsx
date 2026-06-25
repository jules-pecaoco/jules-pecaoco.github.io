import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../../firebase/auth";
import { seedDatabase } from "../../firebase/seed";
import "../../css/Admin.css";

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

  return (
    <div className="admin-login-page">
      <form onSubmit={handleSubmit} className="admin-login-card">
        <h2>Admin Login</h2>
        {error && <p className="admin-login-error">{error}</p>}
        <div className="admin-login-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="admin-login-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="admin-login-button"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      
      <div className="admin-seed-panel">
        <button 
          onClick={handleSeed}
          className="admin-seed-button"
        >
          Seed Database (First Time Setup)
        </button>
        {seedStatus && <p className="admin-seed-status">{seedStatus}</p>}
      </div>
    </div>
  );
};

export default Login;
