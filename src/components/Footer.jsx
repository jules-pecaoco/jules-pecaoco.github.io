import React from "react";
import "../css/Footer.css";
import ThemeToggle from "./ThemeToggle";
import { useSiteContent } from "../hooks/useSiteContent";
import LoadingSpinner from "./LoadingSpinner";

const Line = () => {
  const lines = [];

  for (let i = 0; i < 15; i++) {
    lines.push(<RandomHeightLine key={i} />);
  }

  return <>{lines}</>;
};

const RandomHeightLine = () => {
  const getRandomHeight = () => {
    return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
  };

  const increaseHeight = (currentHeight) => {
    return currentHeight * 1.2;
  };

  const decreaseheight = (currentHeight) => {
    return currentHeight * 0.8;
  };

  const initialHeight = getRandomHeight();
  const lineStyle = {
    height: `${initialHeight}px`,
    width: "1.5rem",
    backgroundColor: "var(--secondary)",
    borderRadius: "1px",
    transition: "height 250ms linear",
  };

  const handleHover = (e) => {
    e.target.style.height = `${increaseHeight(initialHeight)}px`;
    e.target.style.backgroundColor = "var(--accent)";
  };

  const handleHoverOut = (e) => {
    e.target.style.height = `${decreaseheight(initialHeight)}px`;
    e.target.style.backgroundColor = "var(--secondary)";
  };

  return (
    <div className="line-holder">
      <div className="line" style={lineStyle} onMouseEnter={handleHover} onMouseLeave={handleHoverOut}></div>
    </div>
  );
};

const SpotifyPlaylist = ({ embedUrl }) => {
  return (
    <>
      <iframe
        src={embedUrl}
        width="100%"
        height="300"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
      ></iframe>
    </>
  );
};

function Footer() {
  const { siteContent, loading } = useSiteContent();

  if (loading) {
    return <LoadingSpinner />;
  }

  const spotifyUrl = siteContent?.spotify?.embedUrl || "https://open.spotify.com/embed/album/7xCcuTA3abKwxj8HwgxP7R?utm_source=generator";
  const socials = siteContent?.socials || [
    { label: "Github", url: "https://github.com/jules-pecaoco", category: "social" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/julesalfonzpecaoco/", category: "social" },
    { label: "Facebook", url: "https://www.facebook.com/julesalfonzp", category: "social" },
    { label: "CV", url: "/resume", category: "social" },
    { label: "Messenger", url: "https://m.me/julesalfonzp", category: "contact" },
    { label: "Email", url: "mailto:jules.pecaoco.dev@gmail.com", category: "contact" }
  ];

  const socialLinks = socials.filter(s => s.category === "social");
  const contactLinks = socials.filter(s => s.category === "contact");

  return (
    <footer>
      <div className="footer__top">
        <div className="__spotify">
          <SpotifyPlaylist embedUrl={spotifyUrl} />
        </div>
        <div className="__contact">
          <div>
            <h5>Socials</h5>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {socialLinks.map((link) => (
                <a key={link.label} href={link.url === "/resume" ? "/resume" : link.url} target={link.url === "/resume" ? "_self" : "_blank"} rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5>Contact</h5>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {contactLinks.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <Line />
        <ThemeToggle />
      </div>
      <p className="copyright">&copy; {new Date().getFullYear()} Jules Alfonz Pecaoco. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
