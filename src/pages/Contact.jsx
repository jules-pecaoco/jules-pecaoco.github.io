import React, { useState } from "react";
import { addDocument } from "../hooks/useFirestore";
import { sendContactEmail } from "../services/emailjs";
import "../css/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    // Validate fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ type: "error", text: "All fields are required." });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setLoading(true);

    try {
      // 1. Send email notification via EmailJS
      let emailSentResult = false;
      try {
        await sendContactEmail(formData);
        emailSentResult = true;
      } catch (err) {
        console.error("EmailJS sending failed, fallback to Firestore only", err);
      }

      // 2. Save message details into Firestore database
      await addDocument("contactMessages", {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        read: false,
        emailSent: emailSentResult,
      });

      // Show response feedback
      if (emailSentResult) {
        setStatus({ type: "success", text: "Your message has been sent successfully! I'll get back to you shortly." });
      } else {
        setStatus({ type: "success", text: "Message received! (Notification delivery is currently pending)." });
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to submit contact request: ", error);
      setStatus({ type: "error", text: error.message || "Failed to submit message. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>Feel free to reach out for collaborations, inquiries, or just to say hello!</p>
      </div>

      <div className="contact-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message goes here..."
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status.text && (
          <div className={`status-message ${status.type}`}>
            {status.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
