import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: "transparent",
    transition: "background-color 350ms linear",
  });
  
  const location = useLocation();
  const navListRef = useRef(null);

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
        backgroundColor: "rgb(from var(--secondary) r g b / 40%)",
        transition: "background-color 350ms linear",
      });
    } else {
      setNavbarStyle({
        backgroundColor: "transparent",
        transition: "background-color 350ms linear",
      });
    }
  }, [scrollPosition]);

  // Adjust indicator position based on active link
  useEffect(() => {
    const updateIndicator = () => {
      if (!navListRef.current) return;
      const activeLink = navListRef.current.querySelector(".nav_btn.active");
      const indicator = navListRef.current.querySelector(".indicator");
      
      if (activeLink && indicator) {
        const linkPosition = activeLink.getBoundingClientRect();
        const li = activeLink.parentNode;
        const ul = navListRef.current.getBoundingClientRect();
        const offsetLeft = linkPosition.left - ul.left;
        indicator.style.cssText = `left: ${offsetLeft - 3}px; width: ${li.offsetWidth + 6}px; opacity: 1;`;
      } else if (indicator) {
        // Hide indicator if no nav item is active
        indicator.style.opacity = "0";
      }
    };

    const timeoutId = setTimeout(updateIndicator, 50);
    window.addEventListener("resize", updateIndicator);

    // Update document title dynamically
    let sectionTitle = "Dev";
    if (location.pathname === "/") sectionTitle = "Projects";
    else if (location.pathname === "/about") sectionTitle = "About";
    else if (location.pathname === "/events") sectionTitle = "Events";
    else if (location.pathname === "/contact") sectionTitle = "Contact";
    else if (location.pathname === "/resume") sectionTitle = "Resume";
    document.title = `Jules Pecaoco • ${sectionTitle}`;

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [location]);

  return (
    <nav>
      <ul ref={navListRef} style={navbarStyle}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav_btn active" : "nav_btn"}>
            Projects /
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav_btn active" : "nav_btn"}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" className={({ isActive }) => isActive ? "nav_btn active" : "nav_btn"}>
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "nav_btn active" : "nav_btn"}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/resume" className={({ isActive }) => isActive ? "nav_btn active" : "nav_btn"}>
            Resume
          </NavLink>
        </li>
        <li className="indicator"></li>
      </ul>
    </nav>
  );
};

export default Header;
