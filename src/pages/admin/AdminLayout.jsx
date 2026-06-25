import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { useAuth } from "../../hooks/useAuth";

const AdminLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "var(--main-font)",
    background: "var(--background)",
    color: "var(--text)",
  };

  const sidebarStyle = {
    width: "250px",
    background: "var(--primary)",
    color: "var(--background)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  };

  const navLinkStyle = {
    color: "var(--background)",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background 0.2s",
  };

  return (
    <div style={layoutStyle}>
      <aside style={sidebarStyle}>
        <div>
          <h2 style={{ color: "var(--background)", margin: 0, fontFamily: "var(--heading-font)" }}>Admin Panel</h2>
          <p style={{ fontSize: "0.8rem", opacity: 0.8 }}>Logged in as: {user?.email}</p>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link to="/admin" style={navLinkStyle}>Dashboard</Link>
          <Link to="/admin/projects" style={navLinkStyle}>Projects</Link>
          <Link to="/admin/events" style={navLinkStyle}>Events</Link>
          <Link to="/admin/site" style={navLinkStyle}>Site Content</Link>
          <Link to="/admin/resume" style={navLinkStyle}>Resume</Link>
          <Link to="/admin/messages" style={navLinkStyle}>Messages</Link>
          <a href="/" target="_blank" style={navLinkStyle}>View Site ↗</a>
        </nav>
        <button
          onClick={handleLogout}
          style={{ marginTop: "auto", padding: "0.8rem", background: "var(--secondary)", color: "var(--primary)", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
        >
          Logout
        </button>
      </aside>
      <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
