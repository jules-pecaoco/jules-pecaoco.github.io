import { useState, useRef } from "react";
import { uploadFile } from "../firebase/storage";
import "../css/Admin.css";

const ImageUpload = ({ onUploadComplete, initialImageUrl = "", storagePath = "portfolio/images" }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file) => {
    // Basic image validation
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, WebP).");
      return;
    }

    setError("");
    setUploading(true);
    setProgress(20); // Simulating initial progress

    try {
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const path = `${storagePath}/${fileName}`;
      setProgress(50);
      
      const { url } = await uploadFile(path, file);
      
      setProgress(100);
      setImageUrl(url);
      if (onUploadComplete) {
        onUploadComplete(url);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image. Please check your storage rules.");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clearImage = () => {
    setImageUrl("");
    if (onUploadComplete) {
      onUploadComplete("");
    }
  };

  return (
    <div className="image-upload">
      {imageUrl ? (
        <div className="image-upload-preview-wrap">
          <img src={imageUrl} alt="Uploaded preview" className="image-upload-preview" />
          <button
            type="button"
            onClick={clearImage}
            className="image-upload-clear"
            aria-label="Remove uploaded image"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`image-upload-dropzone${dragActive ? " is-active" : ""}`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            style={{ display: "none" }}
            accept="image/*"
          />
          {uploading ? (
            <div>
              <p style={{ fontWeight: "bold" }}>Uploading...</p>
              <div className="upload-progress">
                <div className="upload-progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: "bold" }}>Drag & drop your image here</p>
              <p style={{ fontSize: "0.8rem", opacity: 0.8, marginTop: "5px" }}>or click to browse files</p>
            </div>
          )}
          {error && <p className="upload-error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
