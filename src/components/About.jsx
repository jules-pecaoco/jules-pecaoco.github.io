import "../css/About.css";

function About() {
  return (
    <div className="about">
      <h1>I'm Jules.</h1>
      <div className="profile">
        <div className="img">
          <img src="https://placehold.co/800x900" alt="" />
        </div>
        <div className="content">
          <h6>I'm a Web and Application Developer from Bacolod, Philippines.</h6>
          <p>
            I enjoy creating things that live on the internet, whether that be websites, applications, memes, games and anything the piques my
            interest.
          </p>
        </div>
      </div>
      <div className="progress">
        <h2>Project & Tools Progression</h2>
        <div className="wrap">
          <div className="pro">
            <h3>2023~</h3>
            <div className="jects">
              <h4>MY PORTFOLIO</h4>
              <p className="tech">Tech used: React and CSS</p>
              <img src="https://skillicons.dev/icons?i=react,css" alt="icons" className="icon"/>
            </div>
            <div className="jects">
              <h4>POWERFITNESS</h4>
              <p className="tech">Tech used: Bootstrap and JQuery</p>
              <img src="https://skillicons.dev/icons?i=bootstrap,jquery" alt="icons" className="icon"/>
            </div>
          </div>
          <div className="vertical"></div>
          <div className="pro">
            <h3>2021-2022</h3>
            <div className="jects">
              <h4>FUNERAL PLAN</h4>
              <p className="tech">Tech used: Java, JavaFX, MySQL</p>
              <img src="https://skillicons.dev/icons?i=java,mysql" alt="icons" className="icon"/>

            </div>
            <div className="jects">
              <h4>CALCULATOR</h4>
              <p className="tech">Tech used: Java</p>
              <img src="https://skillicons.dev/icons?i=java" alt="icons" className="icon"/>
            </div>
          </div>
          <div className="vertical"></div>
          <div className="pro">
            <h3>2021~</h3>
            <div className="jects">
              <h4>OTHER LANGUAGES AND TOOLS I USED</h4>
              <p className="tech">SASS, Figma, Photoshop, Python, API's, Firebase, HTML, Javascript</p>
              <img src="https://skillicons.dev/icons?i=sass,figma,photoshop,python,firebase,html,javascript&perline=4" alt="icons" className="icon"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
