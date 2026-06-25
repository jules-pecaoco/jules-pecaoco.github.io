import React, { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import LoadingSpinner from "../components/LoadingSpinner";
import "../css/Events.css";

const Events = () => {
  const { events, loading } = useEvents();
  const [filter, setFilter] = useState("all");

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  // Filter events list
  const filteredEvents = events.filter((item) => {
    if (item.visible === false) return false;
    if (filter === "all") return true;
    return item.type?.toLowerCase() === filter.toLowerCase();
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getFilterClass = (type) => {
    return filter === type ? "filter-tab active" : "filter-tab";
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Studies & Events</h1>
        <p>Research papers, conferences, studies, and events I have attended, participated in, or conducted.</p>
      </div>

      <div className="filter-tabs">
        <button className={getFilterClass("all")} onClick={() => setFilter("all")}>All</button>
        <button className={getFilterClass("event")} onClick={() => setFilter("event")}>Events</button>
        <button className={getFilterClass("paper")} onClick={() => setFilter("paper")}>Papers</button>
        <button className={getFilterClass("study")} onClick={() => setFilter("study")}>Studies</button>
        <button className={getFilterClass("news")} onClick={() => setFilter("news")}>News</button>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="no-events">
          <p>No items found in this category.</p>
        </div>
      ) : (
        <div className="timeline">
          {filteredEvents.map((item, index) => {
            const sideClass = index % 2 === 0 ? "left" : "right";
            return (
              <div 
                className={`timeline-item ${sideClass}`} 
                key={item.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="timeline-card">
                  <div className="event-date">{formatDate(item.date)}</div>
                  <h3 className="event-title">{item.title}</h3>
                  <div className="badges">
                    {item.type && <span className="badge type">{item.type}</span>}
                    {item.role && <span className="badge role">{item.role}</span>}
                  </div>
                  <p className="event-desc">{item.description}</p>
                  {item.location && <div className="event-meta">📍 {item.location}</div>}
                  {item.externalUrl && (
                    <a href={item.externalUrl} target="_blank" rel="noreferrer" className="event-link">
                      Read Details ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Events;
