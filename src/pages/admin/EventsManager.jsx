import { useState } from "react";
import { useEvents } from "../../hooks/useEvents";
import { addDocument, updateDocument, deleteDocument } from "../../hooks/useFirestore";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faArrowLeft,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import "../../css/Admin.css";

const EventsManager = () => {
  const { events, loading } = useEvents();
  const [formState, setFormState] = useState(null); 
  const [saving, setSaving] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleEdit = (item) => {
    let formattedDate = "";
    if (item.date) {
      const dateObj = item.date.toDate ? item.date.toDate() : new Date(item.date);
      formattedDate = dateObj.toISOString().split("T")[0];
    }

    setFormState({
      ...item,
      date: formattedDate,
    });
  };

  const handleAddNew = () => {
    setFormState({
      title: "",
      description: "",
      type: "event",
      role: "participant",
      date: new Date().toISOString().split("T")[0],
      location: "",
      externalUrl: "",
      visible: true,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDocument("events", id);
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { id, ...data } = formState;
      data.date = new Date(data.date);

      if (id) {
        await updateDocument("events", id, data);
      } else {
        await addDocument("events", data);
      }
      setFormState(null);
    } catch (err) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div>
      <div className="section-header">
        <h2>Manage Events & Papers</h2>
        {!formState && (
          <button className="action-btn" onClick={handleAddNew}>
            <FontAwesomeIcon icon={faPlus} /> Add New Item
          </button>
        )}
      </div>

      {formState ? (
        <div className="admin-form-card">
          <h3 style={{ fontFamily: "var(--heading-font)", fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            {formState.id ? "Edit Item" : "Add New Item"}
          </h3>
          <form onSubmit={handleSave}>
            <div className="admin-form-grid">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formState.date}
                  onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select
                  value={formState.type}
                  onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                  style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--secondary)", background: "var(--background)", color: "var(--text)" }}
                >
                  <option value="event">Event</option>
                  <option value="paper">Research Paper</option>
                  <option value="study">Academic Study</option>
                  <option value="news">News Mention</option>
                </select>
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={formState.role}
                  onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                  style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--secondary)", background: "var(--background)", color: "var(--text)" }}
                >
                  <option value="participant">Participant</option>
                  <option value="speaker">Speaker</option>
                  <option value="organizer">Organizer</option>
                  <option value="author">Author</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Location / Venue</label>
                <input
                  type="text"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  placeholder="e.g. Bacolod City, Philippines"
                />
              </div>

              <div className="form-group">
                <label>External URL (Details, Publisher Link)</label>
                <input
                  type="url"
                  value={formState.externalUrl}
                  onChange={(e) => setFormState({ ...formState, externalUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={formState.visible}
                    onChange={(e) => setFormState({ ...formState, visible: e.target.checked })}
                  />
                  Visible on public site?
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setFormState(null)} disabled={saving}>
                <FontAwesomeIcon icon={faArrowLeft} /> Cancel
              </button>
              <button type="submit" className="action-btn" disabled={saving}>
                <FontAwesomeIcon icon={faSave} /> {saving ? "Saving..." : "Save Item"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Type</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((item) => (
                <tr key={item.id}>
                  <td data-label="Date">{formatDate(item.date)}</td>
                  <td data-label="Title" style={{ fontWeight: "bold" }}>{item.title}</td>
                  <td data-label="Type" style={{ textTransform: "capitalize" }}>{item.type}</td>
                  <td data-label="Role" style={{ textTransform: "capitalize" }}>{item.role}</td>
                  <td data-label="Status">
                    <span className={`status-indicator ${item.visible ? "online" : "offline"}`}></span>
                    {item.visible ? "Visible" : "Hidden"}
                  </td>
                  <td data-label="Actions">
                    <button className="btn-icon" onClick={() => handleEdit(item)} title="Edit">
                      <FontAwesomeIcon icon={faEdit} style={{ color: "var(--accent)" }} />
                    </button>
                    <button className="btn-icon" onClick={() => handleDelete(item.id)} title="Delete">
                      <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventsManager;
