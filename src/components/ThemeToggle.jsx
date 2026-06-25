import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
  const [isSun, setIsSun] = useState(true);

  const toggleTheme = () => {
    setIsSun(!isSun);
    document.body.classList.toggle("dark-theme");
  };

  return <FontAwesomeIcon onClick={toggleTheme} icon={isSun ? faSun : faMoon} className="theme" />;
};

export default ThemeToggle;
