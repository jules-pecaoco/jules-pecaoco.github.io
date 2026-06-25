import React from "react";
import "../css/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container" style={{ padding: "100px 20px", minHeight: "80vh", fontFamily: "var(--main-font)", color: "var(--text)", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Get In Touch</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", marginBottom: "2rem" }}>
        Feel free to reach out for collaborations, inquiries, or just to say hello!
      </p>
      <form style={{ maxWidth: "500px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="text" placeholder="Your Name" style={{ padding: "0.8rem", borderRadius: "4px", border: "1px solid var(--secondary)", background: "var(--background)", color: "var(--text)" }} disabled />
        <input type="email" placeholder="Your Email" style={{ padding: "0.8rem", borderRadius: "4px", border: "1px solid var(--secondary)", background: "var(--background)", color: "var(--text)" }} disabled />
        <textarea placeholder="Your Message" rows="5" style={{ padding: "0.8rem", borderRadius: "4px", border: "1px solid var(--secondary)", background: "var(--background)", color: "var(--text)" }} disabled></textarea>
        <button type="button" style={{ padding: "0.8rem", background: "var(--primary)", color: "var(--background)", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }} disabled>
          Sending Disabled (Static Preview)
        </button>
      </form>
    </div>
  );
};

export default Contact;
