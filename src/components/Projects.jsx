import "../css/Projects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import Calculator from "../assets/images/calculator.png";
import Portfolio from "../assets/images/portfolio.png";
import PowerFitness from "../assets/images/gymsite.png";
import JavaCrud from "../assets/images/javacrud.png";

function Projects() {
  return (
    <>
      <div className="hero">
        <FontAwesomeIcon icon={faMugSaucer} className="mug" />
        <FontAwesomeIcon icon={faCode} className="code" />
        <h1>Hi I'm Jules.</h1>
        <h1 className="text-animation">
          A <span></span>{" "}
        </h1>
        <p>Sic Parvis Magna</p>
      </div>
      <div className="card__wrap">
        <Card
          title="MY PORTFOLIO"
          description="A portfolio website created with React and CSS. 
          This fully responsive website showcases my skills, projects, and contact details."
          img={Portfolio}
          tech1={{ txt: "React", avail: true }}
          tech2={{ txt: "CSS", avail: true }}
          scrollY="-77%"
          links={{ github: "", live: "" }}
          live={false}
          rev={false}
        ></Card>
        <Card
          title="POWERFITNESS"
          description="A gym website created with JQuery and Bootstrap. 
          This fully responsive website offers details on the gym, along with its features and costs."
          img={PowerFitness}
          tech1={{ txt: "Bootstrap", avail: true }}
          tech2={{ txt: "jQuery", avail: true }}
          scrollY="-77%"
          links={{ github: "https://github.com/jules-pecaoco/power-fitness", live: "" }}
          live={true}
          rev={true}
        ></Card>
        <Card
          title="CRUD MEMORIAL PLAN"
          description="A CRUD java application using JavaFX for the UI and MySQL for the database. 
          This application allows users to create, read, update and delete funeral plans. Also display plans
          and calculate the total cost of the plan and print the receipt."
          img={JavaCrud}
          tech1={{ txt: "JavaFX", avail: true }}
          tech2={{ txt: "MySQL", avail: true }}
          scrollY="-80%"
          links={{ github: "https://github.com/jules-pecaoco/Memorial-Plan-Project", live: "" }}
          live={false}
          rev={false}
        ></Card>
        <Card
          title="JAVA CALCULATOR"
          description="A java application that showcase my understanding of java language and about data structures
          and algorithm. This app allows users to perform basic arithmetic operations along with parenthesis,
          negative numbers, decimal, and exponents."
          img={Calculator}
          tech1={{ txt: "Java", avail: true }}
          tech2={{ txt: "JavaFX", avail: true }}
          scrollY="-60%"
          links={{ github: "https://github.com/jules-pecaoco/Calculator", live: "" }}
          live={false}
          rev={true}
        ></Card>
      </div>
    </>
  );
}

export default Projects;
