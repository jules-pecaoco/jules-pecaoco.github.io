import React from "react";
import "../css/Projects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import { useProjects } from "../hooks/useProjects";
import { useSiteContent } from "../hooks/useSiteContent";
import LoadingSpinner from "./LoadingSpinner";

// Static fallback images for Phase 2 -> Phase 3 transition
import Calculator from "../assets/images/calculator.png";
import Portfolio from "../assets/images/portfolio.png";
import PowerFitness from "../assets/images/gymsite.png";
import JavaCrud from "../assets/images/javacrud.png";

const fallbackImages = {
  "MY PORTFOLIO": Portfolio,
  "POWERFITNESS": PowerFitness,
  "CRUD MEMORIAL PLAN": JavaCrud,
  "JAVA CALCULATOR": Calculator
};

function Projects() {
  const { projects, loading: projectsLoading } = useProjects();
  const { siteContent, loading: contentLoading } = useSiteContent();

  if (projectsLoading || contentLoading) {
    return <LoadingSpinner />;
  }

  const heroData = siteContent?.hero || {
    greeting: "Hi I'm Jules.",
    tagline: "Sic Parvis Magna"
  };

  // Only display projects marked as visible
  const visibleProjects = projects.filter(p => p.visible !== false);

  return (
    <>
      <div className="hero">
        <FontAwesomeIcon icon={faMugSaucer} className="mug" />
        <FontAwesomeIcon icon={faCode} className="code" />
        <h1>{heroData.greeting}</h1>
        <h1 className="text-animation">
          A <span></span>
        </h1>
        <p>{heroData.tagline}</p>
      </div>
      <div className="card__wrap">
        {visibleProjects.map((project) => {
          const imageSrc = project.imageUrl || fallbackImages[project.title] || "";
          return (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              img={imageSrc}
              technologies={project.technologies}
              scrollY={project.scrollY}
              links={{ github: project.githubUrl, live: project.liveUrl }}
              live={project.isLive}
              rev={project.reverseLayout}
            />
          );
        })}
      </div>
    </>
  );
}

export default Projects;
