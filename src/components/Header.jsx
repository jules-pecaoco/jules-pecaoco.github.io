import React, { useState, useEffect } from "react";
import "../css/Header.css";

const Header = ({ handleNavClick }) => {
  // State for active section
  const [activeSection, setActiveSection] = useState("projects");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: "transparent",
    transition: "background-color 350ms linear",
  });

  // Handle nav click and set active section
  const handleEvents = (section) => {
    document.title = `Jules Pecaoco • ${section} `;
    handleNavClick(section);
    setActiveSection(section);
  };

  // Handle scroll position
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  // Navbar background color change on scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      setNavbarStyle({
        backgroundColor: "rgb(from var(--secondary) r g b / 40%)", // Use rgba for transparent colors
        transition: "background-color 350ms linear",
      });
    } else {
      setNavbarStyle({
        backgroundColor: "transparent",
        transition: "background-color 350ms linear",
      });
    }
  }, [scrollPosition]);

  // Handle nav link click effect
  const handleNavLinkClick = (e, section) => {
    e.preventDefault();
    const linkPosition = e.target.getBoundingClientRect();
    const li = e.target.parentNode;
    const ul = li.parentNode.getBoundingClientRect();
    const offsetLeft = linkPosition.left - ul.left;
    const indicator = document.querySelector(".indicator");
    indicator.style.cssText = `left: ${offsetLeft - 3}px; width: ${li.offsetWidth + 6}px;`;

    // Call handleEvents function
    handleEvents(section);
  };

  return (
    <nav>
      <ul style={navbarStyle}>
        <li>
          <a href="#" onClick={(e) => handleNavLinkClick(e, "Projects")} className={activeSection === "Projects" ? "nav_btn active" : "nav_btn"}>
            Projects /
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => handleNavLinkClick(e, "About")} className={activeSection === "About" ? "nav_btn active" : "nav_btn"}>
            About
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => handleNavLinkClick(e, "Contact")} className={activeSection === "Contact" ? "nav_btn active" : "nav_btn"}>
            Contact
          </a>
        </li>
        <li className="indicator"></li>
      </ul>
    </nav>
  );
};

export default Header;
