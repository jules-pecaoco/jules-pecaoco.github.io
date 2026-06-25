import React, { useState, useEffect, useRef } from "react";
import { useFirestoreDoc, updateDocument } from "../../hooks/useFirestore";
import { uploadFile } from "../../firebase/storage";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faExternalLinkAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import "../../css/Admin.css";

const ResumeManager = () => {
  const { data: resumeData, loading } = useFirestoreDoc("resume", "current");
  const [formState, setFormState] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (resumeData) {
      setFormState({
        fileUrl: resumeData.fileUrl || "",
        fileName: resumeData.fileName || "Jules_Pecaoco_Resume.pdf",
        showDownloadButton: resumeData.showDownloadButton !== false,
        visible: resumeData.visible !== false,
      });
    }
  }, [resumeData]);

  if (loading || !formState) {
    return <LoadingSpinner />;
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    setUploading(true);
    setProgress(30);

    try {
      const storagePath = `portfolio/resume/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      setProgress(60);
      const { url } = await uploadFile(storagePath, file);
      setProgress(100);

      setFormState((prev) => ({
        ...prev,
        fileUrl: url,
        fileName: file.name,
      }));
      setMessage("Resume PDF uploaded to storage successfully! Click Save to apply changes.");
    } catch (err) {
      console.error(err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateDocument("resume", "current", formState);
      setMessage("Resume details updated successfully!");
    } catch (err) {
      setMessage(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="section-header">
        <h2>Manage Resume</h2>
      </div>

      {message && (
        <div className={`status-message ${message.includes("failed") ? "error" : "success"}`} style={{ marginBottom: "2rem" }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="admin-form-card">
        <div className="admin-form-grid">
          <div className="form-group full-width">
            <label>Upload PDF Document</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              style={{ display: "none" }}
            />
            <div
              onClick={triggerFileSelect}
              style={{
                border: "2px dashed var(--secondary)",
                borderRadius: "1rem",
                padding: "40px",
                textAlign: "center",
                cursor: "pointer",
                background: "rgba(from var(--secondary) r g b / 5%)",
              }}
            >
              {uploading ? (
                <div>
                  <p style={{ fontWeight: "bold" }}>Uploading Document...</p>
                  <div style={{ width: "150px", height: "6px", background: "var(--secondary)", borderRadius: "3px", margin: "10px auto", overflow: "hidden" }}>
                    <div style={{ width: `${progress}%`, height: "100%", background: "var(--primary)" }}></div>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ fontWeight: "bold" }}>
                    <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: "8px" }} />
                    Click to select and upload a new Resume PDF
                  </p>
                  {formState.fileName && (
                    <p style={{ fontSize: "0.8rem", color: "var(--accent)", marginTop: "10px" }}>
                      Current file: {formState.fileName}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {formState.fileUrl && (
            <div className="form-group full-width">
              <label>Download Link Preview</label>
              <a
                href={formState.fileUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--primary)", fontWeight: "bold", textDecoration: "underline" }}
              >
                View Current File Link <FontAwesomeIcon icon={faExternalLinkAlt} style={{ fontSize: "0.8rem", marginLeft: "2px" }} />
              </a>
            </div>
          )}

          <div className="form-group">
            <label className="switch-label">
              <input
                type="checkbox"
                checked={formState.showDownloadButton}
                onChange={(e) => setFormState({ ...formState, showDownloadButton: e.target.checked })}
              />
              Show direct download button?
            </label>
          </div>

          <div className="form-group">
            <label className="switch-label">
              <input
                type="checkbox"
                checked={formState.visible}
                onChange={(e) => setFormState({ ...formState, visible: e.target.checked })}
              />
              Visible to public site visitors?
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="action-btn" disabled={saving || uploading}>
            <FontAwesomeIcon icon={faSave} /> {saving ? "Saving Details..." : "Save Resume Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeManager;
