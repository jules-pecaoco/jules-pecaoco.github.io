import React from "react";
import "../css/About.css";
import ProfileFallback from "../assets/images/profile.png";
import { useProjects } from "../hooks/useProjects";
import { useSiteContent } from "../hooks/useSiteContent";
import LoadingSpinner from "./LoadingSpinner";

function About() {
  const { projects, loading: projectsLoading } = useProjects();
  const { siteContent, loading: contentLoading } = useSiteContent();

  if (projectsLoading || contentLoading) {
    return <LoadingSpinner />;
  }

  const aboutData = siteContent?.about || {
    name: "I'm Jules.",
    heading: "I'm a Web and Mobile Application Developer from Bacolod, Philippines.",
    bio: "Experienced in building production-ready web and mobile applications used by real users, including large-scale attendance systems and data-driven mobile apps. Comfortable working remotely, collaboration, and delivering features independently.",
    otherTools: {
      year: "2021~",
      title: "OTHER LANGUAGES AND TOOLS I USED",
      tech: "SASS, Figma, Photoshop, Python, API's, Firebase, HTML, Javascript",
      icons: "sass,figma,photoshop,python,firebase,html,javascript&perline=4"
    }
  };

  const projectsByYear = projects.reduce((acc, project) => {
    if (!acc[project.year]) {
      acc[project.year] = [];
    }
    acc[project.year].push(project);
    return acc;
  }, {});

  const sortedYears = Object.keys(projectsByYear).sort().reverse();
  const profileImageSrc = aboutData.profileImageUrl || ProfileFallback;

  return (
    <div className="about">
      <h1>{aboutData.name}</h1>
      <div className="profile">
        <div className="img">
          <img src={profileImageSrc} alt="Jules Pecaoco" />
        </div>
        <div className="content">
          <h6>{aboutData.heading}</h6>
          <p>{aboutData.bio}</p>
        </div>
      </div>

      <div className="progress">
        <h2>Project & Tools Progression</h2>
        <div className="wrap">
          {sortedYears.map((year, index) => (
            <React.Fragment key={year}>
              <div className="pro">
                <h3>{year}</h3>
                {projectsByYear[year].map((project) => (
                  <div className="jects" key={project.id || project.title}>
                    <h4>{project.title}</h4>
                    <p className="tech">Tech used: {project.technologies.join(", ")}</p>
                    <img src={`https://skillicons.dev/icons?i=${project.techIcons}`} alt={`${project.title} tech icons`} className="icon" />
                  </div>
                ))}
              </div>
              {index < sortedYears.length - 1 && <div className="vertical"></div>}
            </React.Fragment>
          ))}

          <div className="vertical"></div>

          <div className="pro">
            <h3>{aboutData.otherTools?.year}</h3>
            <div className="jects">
              <h4>{aboutData.otherTools?.title}</h4>
              <p className="tech">{aboutData.otherTools?.tech}</p>
              <img src={`https://skillicons.dev/icons?i=${aboutData.otherTools?.icons}`} alt="Other tools icons" className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
