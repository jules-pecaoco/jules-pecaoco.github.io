import React from "react";
import "../css/Resume.css";

const Resume = () => {
  return (
    <div className="resume-container" style={{ padding: "100px 20px", minHeight: "80vh", fontFamily: "var(--main-font)", color: "var(--text)", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Resume</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        View and download my latest CV / Resume.
      </p>
      <div style={{ width: "100%", maxWidth: "800px", height: "600px", margin: "0 auto", border: "1px solid var(--secondary)", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(from var(--secondary) r g b / 10%)" }}>
        <p style={{ fontSize: "1.2rem" }}>PDF Viewer coming soon after Firebase Storage integration.</p>
      </div>
    </div>
  );
};

export default Resume;
