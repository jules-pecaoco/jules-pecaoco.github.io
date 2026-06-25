import React from "react";
import "../css/Events.css";

const Events = () => {
  return (
    <div className="events-container" style={{ padding: "100px 20px", minHeight: "80vh", fontFamily: "var(--main-font)", color: "var(--text)", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Studies & Events</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
        Coming soon: A catalog of studies, research papers, tech conferences, news features, and events I have attended, participated in, or conducted.
      </p>
    </div>
  );
};

export default Events;
