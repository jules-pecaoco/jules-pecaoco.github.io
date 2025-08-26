import "../css/Footer.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
  const [isSun, setIsSun] = useState(true);

  const toggleTheme = () => {
    setIsSun(!isSun);
    document.body.classList.toggle("dark-theme");
  };

  return <FontAwesomeIcon onClick={toggleTheme} icon={isSun ? faSun : faMoon} className="theme" />;
};

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

const SpotifyPlaylist = () => {
  return (
    <>
      <iframe
        src="https://open.spotify.com/embed/album/7xCcuTA3abKwxj8HwgxP7R?utm_source=generator"
        width="100%"
        height="300"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </>
  );
};

function Footer() {
  return (
    <footer>
      <div className="footer__top">
        <div className="__spotify">
          <SpotifyPlaylist />
        </div>
        <div className="__contact">
          <p>
            <h5>Socials</h5>
            <a href="https://github.com/jules-pecaoco">Github</a>
            <a href="https://www.linkedin.com/in/julesalfonzpecaoco/">LinkedIn</a>
            <a href="">CV</a>
            <a href="https://www.facebook.com/julesalfonzp">Facebook</a>
          </p>
          <p>
            <h5>Contact</h5>
            <a href="https://m.me/julesalfonzp">Messenger</a>
            <a href="mailto:jules.pecaoco.dev@gmail.com">jules.pecaoco.dev@gmail.com</a>
          </p>
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
