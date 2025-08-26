// src/projectData.js

import Calculator from "./assets/images/calculator.png";
import Portfolio from "./assets/images/portfolio.png";
import PowerFitness from "./assets/images/gymsite.png";
import JavaCrud from "./assets/images/javacrud.png";

export const projects = [
  {
    id: 1,
    title: "MY PORTFOLIO",
    description: "A portfolio website created with React and CSS. This fully responsive website showcases my skills, projects, and contact details.",
    img: Portfolio,
    technologies: ["React", "CSS"],
    techIcons: "react,css",
    year: "2023~",
    links: {
      github: "https://github.com/jules-pecaoco/reactjs-portfolio",
      live: "",
    },
    isLive: false,
    rev: false,
    scrollY: "-77%",
  },
  {
    id: 2,
    title: "POWERFITNESS",
    description:
      "A fitness website created with Bootstrap and jQuery. This responsive site features a gym class schedule, trainer profiles, and a contact form.",
    img: PowerFitness,
    technologies: ["Bootstrap", "jQuery"],
    techIcons: "bootstrap,jquery", // Added for the timeline icons
    year: "2023~", // Added year property
    links: {
      github: "https://github.com/jules-pecaoco/power-fitness",
      live: "https://jules-pecaoco.github.io/power-fitness/",
    },
    isLive: true,
    rev: true,
    scrollY: "-77%",
  },
  {
    id: 3,
    title: "CRUD MEMORIAL PLAN",
    description:
      "A CRUD java application using JavaFX for the UI and MySQL for the database. This application allows users to create, read, update and delete funeral plans. Also display plans and calculate the total cost of the plan and print the receipt.",
    img: JavaCrud,
    technologies: ["Java", "JavaFX", "MySQL"],
    techIcons: "java,mysql", // Added for the timeline icons
    year: "2021-2022", // Added year property
    links: {
      github: "https://github.com/jules-pecaoco/Memorial-Plan-Project",
      live: "",
    },
    isLive: false,
    rev: false,
    scrollY: "-80%",
  },
  {
    id: 4,
    title: "JAVA CALCULATOR",
    description:
      "A java application that showcase my understanding of java language and about data structures and algorithm. This app allows users to perform basic arithmetic operations along with parenthesis, negative numbers, decimal, and exponents.",
    img: Calculator,
    technologies: ["Java"],
    techIcons: "java",
    year: "2021-2022",
    links: {
      github: "https://github.com/jules-pecaoco/Calculator",
      live: "",
    },
    isLive: false,
    rev: true,
    scrollY: "-60%",
  },
];

export const otherTools = {
  year: "2021~",
  title: "OTHER LANGUAGES AND TOOLS I USED",
  tech: "SASS, Figma, Photoshop, Python, API's, Firebase, HTML, Javascript",
  icons: "sass,figma,photoshop,python,firebase,html,javascript&perline=4",
};
