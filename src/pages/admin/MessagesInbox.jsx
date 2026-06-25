import { useState } from "react";
import { useFirestoreCollection, updateDocument, deleteDocument } from "../../hooks/useFirestore";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEnvelope,
  faUser,
  faCheckCircle,
  faTimesCircle,
  faEnvelopeOpen
} from "@fortawesome/free-solid-svg-icons";
import "../../css/Admin.css";

const MessagesInbox = () => {
  const { data: messages, loading } = useFirestoreCollection("contactMessages", "createdAt", "desc");
  const [selectedMessage, setSelectedMessage] = useState(null);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleRead = async (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      try {
        await updateDocument("contactMessages", message.id, { read: true });
      } catch (err) {
        console.error("Failed to mark message as read: ", err);
      }
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteDocument("contactMessages", id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div>
      <div className="section-header">
        <h2>Inbox Messages</h2>
      </div>

      <div className="messages-layout">
        {/* Messages List */}
        <div className="messages-list">
          {messages.length === 0 ? (
            <div className="admin-form-card message-detail-empty">
              <p>Inbox is empty.</p>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                onClick={() => handleRead(m)}
                className={`message-card${selectedMessage?.id === m.id ? " is-selected" : ""}${!m.read ? " is-unread" : ""}`}
              >
                <div className="message-card-main">
                  <div className="message-date">{formatDate(m.createdAt)}</div>
                  <div className="message-subject">
                    <FontAwesomeIcon icon={m.read ? faEnvelopeOpen : faEnvelope} style={{ marginRight: "8px", opacity: 0.8 }} />
                    {m.subject}
                  </div>
                  <div className="message-meta">
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: "6px", fontSize: "0.8rem", opacity: 0.7 }} />
                    From: {m.name}
                  </div>
                </div>
                <button className="btn-icon" onClick={(e) => handleDelete(m.id, e)} title="Delete">
                  <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Selected Message Detail view */}
        <div>
          {selectedMessage ? (
            <div className="admin-form-card message-detail">
              <div className="message-detail-header">
                <div>
                  <h3>
                    {selectedMessage.subject}
                  </h3>
                  <p className="message-sender">
                    From: <strong>{selectedMessage.name}</strong> (&lt;
                    <a href={`mailto:${selectedMessage.email}`} style={{ color: "inherit" }}>
                      {selectedMessage.email}
                    </a>
                    &gt;)
                  </p>
                </div>
                <div className="message-detail-meta">
                  {formatDate(selectedMessage.createdAt)}
                  <div style={{ marginTop: "5px" }}>
                    <span className="badge" style={{ background: selectedMessage.emailSent ? "rgba(0, 128, 0, 0.1)" : "rgba(255, 0, 0, 0.1)", color: selectedMessage.emailSent ? "green" : "red", fontSize: "0.7rem", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <FontAwesomeIcon icon={selectedMessage.emailSent ? faCheckCircle : faTimesCircle} />
                      {selectedMessage.emailSent ? "Email Notification Sent" : "No Email Notification"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="message-body">
                {selectedMessage.message}
              </p>
            </div>
          ) : (
            <div className="admin-form-card message-detail-empty">
              <p>Select a message from the list to read details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesInbox;
