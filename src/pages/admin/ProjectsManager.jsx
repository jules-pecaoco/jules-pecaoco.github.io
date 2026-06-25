import { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { addDocument, updateDocument, deleteDocument } from "../../hooks/useFirestore";
import ImageUpload from "../../components/ImageUpload";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faChevronUp,
  faChevronDown,
  faArrowLeft,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import "../../css/Admin.css";

const ProjectsManager = () => {
  const { projects, loading } = useProjects();
  const [formState, setFormState] = useState(null); 
  const [saving, setSaving] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleEdit = (project) => {
    setFormState({ ...project });
  };

  const handleAddNew = () => {
    setFormState({
      title: "",
      description: "",
      imageUrl: "",
      technologies: [],
      techIcons: "",
      year: "",
      githubUrl: "",
      liveUrl: "",
      isLive: false,
      reverseLayout: false,
      scrollY: "-70%",
      order: projects.length + 1,
      visible: true,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDocument("projects", id);
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { id, ...data } = formState;
      // Convert technologies input from string/array to array
      if (typeof data.technologies === "string") {
        data.technologies = data.technologies.split(",").map((t) => t.trim()).filter(Boolean);
      }

      if (id) {
        await updateDocument("projects", id, data);
      } else {
        await addDocument("projects", data);
      }
      setFormState(null);
    } catch (err) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const reorderProject = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const projectA = projects[index];
    const projectB = projects[targetIndex];

    try {
      await updateDocument("projects", projectA.id, { order: projectB.order });
      await updateDocument("projects", projectB.id, { order: projectA.order });
    } catch (err) {
      console.error("Reorder failed: ", err);
    }
  };

  return (
    <div>
      <div className="section-header">
        <h2>Manage Projects</h2>
        {!formState && (
          <button className="action-btn" onClick={handleAddNew}>
            <FontAwesomeIcon icon={faPlus} /> Add New Project
          </button>
        )}
      </div>

      {formState ? (
        <div className="admin-form-card">
          <h3 style={{ fontFamily: "var(--heading-font)", fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            {formState.id ? "Edit Project" : "Add New Project"}
          </h3>
          <form onSubmit={handleSave}>
            <div className="admin-form-grid">
              <div className="form-group">
                <label>Project Title</label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Year / Duration (e.g. 2023~)</label>
                <input
                  type="text"
                  value={formState.year}
                  onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                  required
                />
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
                <label>GitHub Repository URL</label>
                <input
                  type="url"
                  value={formState.githubUrl}
                  onChange={(e) => setFormState({ ...formState, githubUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Live Deployment URL</label>
                <input
                  type="url"
                  value={formState.liveUrl}
                  onChange={(e) => setFormState({ ...formState, liveUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={Array.isArray(formState.technologies) ? formState.technologies.join(", ") : formState.technologies}
                  onChange={(e) => setFormState({ ...formState, technologies: e.target.value })}
                  placeholder="React, CSS, Node"
                />
              </div>

              <div className="form-group">
                <label>Skillicons String (e.g. react,css)</label>
                <input
                  type="text"
                  value={formState.techIcons}
                  onChange={(e) => setFormState({ ...formState, techIcons: e.target.value })}
                  placeholder="react,css"
                />
              </div>

              <div className="form-group">
                <label>Mock Image Scroll Offset (e.g. -77%)</label>
                <input
                  type="text"
                  value={formState.scrollY}
                  onChange={(e) => setFormState({ ...formState, scrollY: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="switch-label" style={{ marginTop: "2rem" }}>
                  <input
                    type="checkbox"
                    checked={formState.isLive}
                    onChange={(e) => setFormState({ ...formState, isLive: e.target.checked })}
                  />
                  Has Live Demo Link?
                </label>
              </div>

              <div className="form-group">
                <label className="switch-label" style={{ marginTop: "2.1rem" }}>
                  <input
                    type="checkbox"
                    checked={formState.reverseLayout}
                    onChange={(e) => setFormState({ ...formState, reverseLayout: e.target.checked })}
                  />
                  Reverse Placement Layout?
                </label>
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

              <div className="form-group full-width">
                <label>Project Showcase Image</label>
                <ImageUpload
                  initialImageUrl={formState.imageUrl}
                  onUploadComplete={(url) => setFormState({ ...formState, imageUrl: url })}
                  storagePath="portfolio/projects"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setFormState(null)} disabled={saving}>
                <FontAwesomeIcon icon={faArrowLeft} /> Cancel
              </button>
              <button type="submit" className="action-btn" disabled={saving}>
                <FontAwesomeIcon icon={faSave} /> {saving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Year</th>
                <th>Tech</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr key={project.id}>
                  <td data-label="Order">
                    <button className="btn-icon" onClick={() => reorderProject(idx, -1)} disabled={idx === 0}>
                      <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                    <span style={{ margin: "0 0.5rem", fontWeight: "bold" }}>{project.order}</span>
                    <button className="btn-icon" onClick={() => reorderProject(idx, 1)} disabled={idx === projects.length - 1}>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </td>
                  <td data-label="Title" style={{ fontWeight: "bold" }}>{project.title}</td>
                  <td data-label="Year">{project.year}</td>
                  <td data-label="Tech">{project.technologies?.join(", ")}</td>
                  <td data-label="Status">
                    <span className={`status-indicator ${project.visible ? "online" : "offline"}`}></span>
                    {project.visible ? "Visible" : "Hidden"}
                  </td>
                  <td data-label="Actions">
                    <button className="btn-icon" onClick={() => handleEdit(project)} title="Edit">
                      <FontAwesomeIcon icon={faEdit} style={{ color: "var(--accent)" }} />
                    </button>
                    <button className="btn-icon" onClick={() => handleDelete(project.id)} title="Delete">
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

export default ProjectsManager;
