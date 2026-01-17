import "../css/About.css";
import Profile from "../assets/images/profile.png";
import { projects, otherTools } from "../projects"; // Import both projects and otherTools

function About() {
  const projectsByYear = projects.reduce((acc, project) => {
    if (!acc[project.year]) {
      acc[project.year] = [];
    }
    acc[project.year].push(project);
    return acc;
  }, {});

  const sortedYears = Object.keys(projectsByYear).sort().reverse();

  return (
    <div className="about">
      <h1>I'm Jules.</h1>
      <div className="profile">
        <div className="img">
          <img src={Profile} alt="Jules Pecaoco" />
        </div>
        <div className="content">
          <h6>I'm a Web and Mobile Application Developer from Bacolod, Philippines.</h6>
          <p>
            Experienced in building production-ready web and mobile applications used by real users, including large-scale attendance systems and
            data-driven mobile apps. Comfortable working remotely, collaboration, and delivering features independently.
          </p>
        </div>
      </div>

      <div className="progress">
        <h2>Project & Tools Progression</h2>
        <div className="wrap">
          {/* Dynamically create a section for each year */}
          {sortedYears.map((year, index) => (
            <>
              <div className="pro" key={year}>
                <h3>{year}</h3>
                {/* Map over the projects for the current year */}
                {projectsByYear[year].map((project) => (
                  <div className="jects" key={project.id}>
                    <h4>{project.title}</h4>
                    <p className="tech">Tech used: {project.technologies.join(", ")}</p>
                    <img src={`https://skillicons.dev/icons?i=${project.techIcons}`} alt={`${project.title} tech icons`} className="icon" />
                  </div>
                ))}
              </div>
              {/* Add a vertical divider between year sections, but not after the last one */}
              {index < sortedYears.length - 1 && <div className="vertical"></div>}
            </>
          ))}

          {/* Divider for the "Other Tools" section */}
          <div className="vertical"></div>

          {/* Dynamically add the "Other Tools" section */}
          <div className="pro">
            <h3>{otherTools.year}</h3>
            <div className="jects">
              <h4>{otherTools.title}</h4>
              <p className="tech">{otherTools.tech}</p>
              <img src={`https://skillicons.dev/icons?i=${otherTools.icons}`} alt="Other tools icons" className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
