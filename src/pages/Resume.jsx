import React from "react";
import { useFirestoreDoc } from "../hooks/useFirestore";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import "../css/Resume.css";

const Resume = () => {
  const { data: resumeData, loading } = useFirestoreDoc("resume", "current");

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const hasResume = resumeData && resumeData.fileUrl && resumeData.visible !== false;

  return (
    <div className="resume-page">
      <div className="resume-header">
        <h1>Curriculum Vitae</h1>
        <p>View or download my professional resume and qualifications.</p>
      </div>

      {hasResume ? (
        <>
          <div className="actions-bar">
            <a
              href={resumeData.fileUrl}
              target="_blank"
              rel="noreferrer"
              download={resumeData.fileName || "Jules_Pecaoco_Resume.pdf"}
              className="download-btn"
            >
              Download PDF 📥
            </a>
          </div>

          <div className="pdf-container">
            <object
              data={resumeData.fileUrl}
              type="application/pdf"
              className="pdf-viewer"
              title="Resume PDF Viewer"
            >
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(resumeData.fileUrl)}&embedded=true`}
                className="pdf-viewer"
                title="Google Docs PDF Viewer"
              ></iframe>
            </object>
          </div>
        </>
      ) : (
        <div className="no-pdf">
          <h3>Resume Pending</h3>
          <p>
            The downloadable resume document is currently being updated. Please check back soon or reach out via the Contact page if you need to request my CV.
          </p>
          <Link to="/contact" className="download-btn" style={{ display: "inline-flex" }}>
            Contact Me ✉️
          </Link>
        </div>
      )}
    </div>
  );
};

export default Resume;
