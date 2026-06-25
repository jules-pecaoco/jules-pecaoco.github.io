import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faBriefcase,
  faCalendarAlt,
  faSlidersH,
  faFilePdf,
  faEnvelope,
  faExternalLinkAlt,
  faSignOutAlt,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/Admin.css";

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

  const getLinkClass = ({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link");

  // Extract initials from email for avatar
  const initials = user?.email ? user.email.substring(0, 2) : "AD";

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        {/* Brand */}
        <div className="sidebar-brand">
          <h2>
            <span className="brand-icon">
              <FontAwesomeIcon icon={faShieldAlt} />
            </span>
            Admin
          </h2>
        </div>

        {/* User Info */}
        <div className="sidebar-user">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <div className="user-name">{user?.email}</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="sidebar-nav">
            <div className="nav-section-label">Overview</div>
            <NavLink to="/admin" end className={getLinkClass}>
              <FontAwesomeIcon icon={faChartPie} className="link-icon" />
              Dashboard
            </NavLink>

            <div className="nav-section-label">Content</div>
            <NavLink to="/admin/projects" className={getLinkClass}>
              <FontAwesomeIcon icon={faBriefcase} className="link-icon" />
              Projects
            </NavLink>
            <NavLink to="/admin/events" className={getLinkClass}>
              <FontAwesomeIcon icon={faCalendarAlt} className="link-icon" />
              Events
            </NavLink>
            <NavLink to="/admin/site" className={getLinkClass}>
              <FontAwesomeIcon icon={faSlidersH} className="link-icon" />
              Site Content
            </NavLink>
            <NavLink to="/admin/resume" className={getLinkClass}>
              <FontAwesomeIcon icon={faFilePdf} className="link-icon" />
              Resume
            </NavLink>

            <div className="nav-section-label">Communication</div>
            <NavLink to="/admin/messages" className={getLinkClass}>
              <FontAwesomeIcon icon={faEnvelope} className="link-icon" />
              Messages
            </NavLink>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="view-site-link">
            <FontAwesomeIcon icon={faExternalLinkAlt} className="link-icon" />
            View Live Site
          </a>
          <button onClick={handleLogout} className="logout-btn">
            <FontAwesomeIcon icon={faSignOutAlt} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
