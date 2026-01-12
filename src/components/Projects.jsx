import "../css/Projects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import { projects } from "../projects";

function Projects() {
  return (
    <>
      <div className="hero">
        <FontAwesomeIcon icon={faMugSaucer} className="mug" />
        <FontAwesomeIcon icon={faCode} className="code" />
        <h1>Hi I'm Jules.</h1>
        <h1 className="text-animation">
          A <span></span>
        </h1>
        <p>Sic Parvis Magna</p>
      </div>
      <div className="card__wrap">
        {projects.map((project) => (
          <Card
            key={project.id}
            title={project.title}
            description={project.description}
            img={project.img}
            technologies={project.technologies}
            scrollY={project.scrollY}
            links={project.links}
            live={project.isLive}
            rev={project.rev}
          />
        ))}
      </div>
    </>
  );
}

export default Projects;
