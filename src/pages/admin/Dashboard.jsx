import React from "react";
import { useProjects } from "../../hooks/useProjects";
import { useEvents } from "../../hooks/useEvents";
import { useFirestoreCollection } from "../../hooks/useFirestore";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendarAlt,
  faSlidersH,
  faEnvelope,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/Admin.css";

const Dashboard = () => {
  const { projects, loading: projectsLoading } = useProjects();
  const { events, loading: eventsLoading } = useEvents();
  const { data: messages, loading: messagesLoading } = useFirestoreCollection("contactMessages", "createdAt", "desc");

  if (projectsLoading || eventsLoading || messagesLoading) {
    return <LoadingSpinner />;
  }

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="section-header">
        <h2>Dashboard</h2>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-value">{projects.length}</div>
          <div className="metric-label">
            <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: "5px" }} />
            Projects
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{events.length}</div>
          <div className="metric-label">
            <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: "5px" }} />
            Events & Papers
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-value" style={{ color: unreadMessagesCount > 0 ? "var(--admin-warning)" : "inherit" }}>
            {unreadMessagesCount}
          </div>
          <div className="metric-label">
            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "5px" }} />
            Unread Messages
          </div>
        </div>
      </div>

      <div className="admin-form-card">
        <h3 style={{ marginBottom: "1.25rem" }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link to="/admin/projects" className="action-btn" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faBriefcase} /> Projects <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.7rem", opacity: 0.7 }} />
          </Link>
          <Link to="/admin/events" className="action-btn" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faCalendarAlt} /> Events <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.7rem", opacity: 0.7 }} />
          </Link>
          <Link to="/admin/site" className="action-btn" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faSlidersH} /> Site Config <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.7rem", opacity: 0.7 }} />
          </Link>
          <Link to="/admin/messages" className="action-btn" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faEnvelope} /> Inbox ({unreadMessagesCount}) <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.7rem", opacity: 0.7 }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
