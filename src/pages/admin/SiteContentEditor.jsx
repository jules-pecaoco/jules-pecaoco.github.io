import React, { useState, useEffect } from "react";
import { useSiteContent } from "../../hooks/useSiteContent";
import { updateDocument } from "../../hooks/useFirestore";
import ImageUpload from "../../components/ImageUpload";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import "../../css/Admin.css";

const SiteContentEditor = () => {
  const { siteContent, loading } = useSiteContent();
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (siteContent) {
      setFormData({
        heroGreeting: siteContent.hero?.greeting || "",
        heroTagline: siteContent.hero?.tagline || "",
        heroTypingWords: siteContent.hero?.typingWords?.join(", ") || "",
        aboutName: siteContent.about?.name || "",
        aboutHeading: siteContent.about?.heading || "",
        aboutBio: siteContent.about?.bio || "",
        aboutProfileImageUrl: siteContent.about?.profileImageUrl || "",
        aboutOtherToolsYear: siteContent.about?.otherTools?.year || "",
        aboutOtherToolsTitle: siteContent.about?.otherTools?.title || "",
        aboutOtherToolsTech: siteContent.about?.otherTools?.tech || "",
        aboutOtherToolsIcons: siteContent.about?.otherTools?.icons || "",
        spotifyUrl: siteContent.spotify?.embedUrl || "",
        socials: siteContent.socials || [],
      });
    }
  }, [siteContent]);

  if (loading || !formData) {
    return <LoadingSpinner />;
  }

  const handleSocialChange = (index, field, value) => {
    const updatedSocials = [...formData.socials];
    updatedSocials[index] = { ...updatedSocials[index], [field]: value };
    setFormData({ ...formData, socials: updatedSocials });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const typingWordsArr = formData.heroTypingWords
        .split(",")
        .map((w) => w.trim())
        .filter(Boolean);

      const updatePayload = {
        hero: {
          greeting: formData.heroGreeting,
          tagline: formData.heroTagline,
          typingWords: typingWordsArr,
        },
        about: {
          name: formData.aboutName,
          heading: formData.aboutHeading,
          bio: formData.aboutBio,
          profileImageUrl: formData.aboutProfileImageUrl,
          otherTools: {
            year: formData.aboutOtherToolsYear,
            title: formData.aboutOtherToolsTitle,
            tech: formData.aboutOtherToolsTech,
            icons: formData.aboutOtherToolsIcons,
          },
        },
        spotify: {
          embedUrl: formData.spotifyUrl,
        },
        socials: formData.socials,
      };

      await updateDocument("siteContent", "main", updatePayload);
      setMessage("Site configuration updated successfully!");
    } catch (err) {
      setMessage(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="section-header">
        <h2>Edit Site Content</h2>
      </div>

      {message && (
        <div className={`status-message ${message.includes("failed") ? "error" : "success"}`} style={{ marginBottom: "2rem" }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="admin-form-card">
        <h3 style={{ fontFamily: "var(--heading-font)", borderBottom: "1px solid var(--secondary)", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
          Hero Section Config
        </h3>
        <div className="admin-form-grid" style={{ marginBottom: "2.5rem" }}>
          <div className="form-group">
            <label>Hero Greeting Title</label>
            <input
              type="text"
              value={formData.heroGreeting}
              onChange={(e) => setFormData({ ...formData, heroGreeting: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Typing Animation Words (Comma separated)</label>
            <input
              type="text"
              value={formData.heroTypingWords}
              onChange={(e) => setFormData({ ...formData, heroTypingWords: e.target.value })}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Hero Tagline / Subtitle</label>
            <input
              type="text"
              value={formData.heroTagline}
              onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
              required
            />
          </div>
        </div>

        <h3 style={{ fontFamily: "var(--heading-font)", borderBottom: "1px solid var(--secondary)", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
          About Profile Config
        </h3>
        <div className="admin-form-grid" style={{ marginBottom: "2.5rem" }}>
          <div className="form-group">
            <label>DisplayName / Name</label>
            <input
              type="text"
              value={formData.aboutName}
              onChange={(e) => setFormData({ ...formData, aboutName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Subheading / Status</label>
            <input
              type="text"
              value={formData.aboutHeading}
              onChange={(e) => setFormData({ ...formData, aboutHeading: e.target.value })}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Biography Description</label>
            <textarea
              value={formData.aboutBio}
              onChange={(e) => setFormData({ ...formData, aboutBio: e.target.value })}
              rows="6"
              required
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label>Profile Image</label>
            <ImageUpload
              initialImageUrl={formData.aboutProfileImageUrl}
              onUploadComplete={(url) => setFormData({ ...formData, aboutProfileImageUrl: url })}
              storagePath="portfolio/about"
            />
          </div>
        </div>

        <h3 style={{ fontFamily: "var(--heading-font)", borderBottom: "1px solid var(--secondary)", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
          Progression / Skills Panel Config
        </h3>
        <div className="admin-form-grid" style={{ marginBottom: "2.5rem" }}>
          <div className="form-group">
            <label>Skill Years (e.g. 2021~)</label>
            <input
              type="text"
              value={formData.aboutOtherToolsYear}
              onChange={(e) => setFormData({ ...formData, aboutOtherToolsYear: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Skills Block Title</label>
            <input
              type="text"
              value={formData.aboutOtherToolsTitle}
              onChange={(e) => setFormData({ ...formData, aboutOtherToolsTitle: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Skills Description (Text list)</label>
            <input
              type="text"
              value={formData.aboutOtherToolsTech}
              onChange={(e) => setFormData({ ...formData, aboutOtherToolsTech: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Skillicons Queries (e.g. sass,figma,photoshop)</label>
            <input
              type="text"
              value={formData.aboutOtherToolsIcons}
              onChange={(e) => setFormData({ ...formData, aboutOtherToolsIcons: e.target.value })}
            />
          </div>
        </div>

        <h3 style={{ fontFamily: "var(--heading-font)", borderBottom: "1px solid var(--secondary)", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
          Spotify Integration
        </h3>
        <div className="admin-form-grid" style={{ marginBottom: "2.5rem" }}>
          <div className="form-group full-width">
            <label>Spotify Player Embed URL</label>
            <input
              type="url"
              value={formData.spotifyUrl}
              onChange={(e) => setFormData({ ...formData, spotifyUrl: e.target.value })}
              required
            />
          </div>
        </div>

        <h3 style={{ fontFamily: "var(--heading-font)", borderBottom: "1px solid var(--secondary)", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
          Socials & Contact Links
        </h3>
        <div className="admin-form-grid" style={{ marginBottom: "2.5rem" }}>
          {formData.socials.map((link, idx) => (
            <div key={link.label} className="form-group" style={{ border: "1px solid rgba(from var(--secondary) r g b / 15%)", padding: "1rem", borderRadius: "0.5rem" }}>
              <label style={{ textTransform: "capitalize", fontWeight: "bold" }}>{link.label} URL</label>
              <input
                type="text"
                value={link.url}
                onChange={(e) => handleSocialChange(idx, "url", e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" className="action-btn" disabled={saving}>
            <FontAwesomeIcon icon={faSave} /> {saving ? "Saving Changes..." : "Save Configuration"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SiteContentEditor;
