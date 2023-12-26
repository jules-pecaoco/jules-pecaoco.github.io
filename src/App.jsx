import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import About from "./components/About";



function App() {
  const [content, setContent] = useState("Projects");

  function handleNavClick(section) {
    setContent(section);
  }

  return (
    <>
      <Header handleNavClick={handleNavClick} />
      {content === "Projects" && <Projects />}
      {content === "About" && <About />}
      <Footer />
    </>
  );
}

export default App;
