import React from "react";
import "../css/About.css";
import Profile from "../assets/images/profile.png";
// import { projects, otherTools } from "../projects"; // Import both projects and otherTools

function About() {
  const { projects, loading: projectsLoading } = useProjects();
  const { siteContent, loading: contentLoading } = useSiteContent();

  if (projectsLoading || contentLoading) {
    return <LoadingSpinner />;
  }

  const aboutData = siteContent?.about || {
    name: "I'm Jules.",
    heading: "I'm a Web and Application Developer from Bacolod, Philippines.",
    bio: "I enjoy creating things that live on the internet...",
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
            <React.Fragment key={year}>
              <div className="pro">
                <h3>{year}</h3>
                {/* Map over the projects for the current year */}
                {projectsByYear[year].map((project) => (
                  <div className="jects" key={project.id || project.title}>
                    <h4>{project.title}</h4>
                    <p className="tech">Tech used: {project.technologies.join(", ")}</p>
                    <img src={`https://skillicons.dev/icons?i=${project.techIcons}`} alt={`${project.title} tech icons`} className="icon" />
                  </div>
                ))}
              </div>
              {/* Add a vertical divider between year sections, but not after the last one */}
              {index < sortedYears.length - 1 && <div className="vertical"></div>}
            </React.Fragment>
          ))}

          {/* Divider for the "Other Tools" section */}
          <div className="vertical"></div>

          {/* Dynamically add the "Other Tools" section */}
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
