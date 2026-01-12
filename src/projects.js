import Calculator from "./assets/images/calculator.png";
import Portfolio from "./assets/images/portfolio.png";
import PowerFitness from "./assets/images/gymsite.png";
import JavaCrud from "./assets/images/javacrud.png";
import Forensics from "./assets/images/forensic.png";
import QRApp from "./assets/images/qrapp.png";
import Tanaw from "./assets/images/tanaw.png";

export const projects = [
  {
    id: 0,
    title: "QR Code Attendance System",
    description:
      "Used by an organization handling 1600+ students, A QR code-based attendance system built with Cloudflare, Firebase and GCP APIs (Google Sheet, Google Drive, Google Sheet), allowing users to scan QR codes for attendance tracking and management.",
    img: QRApp,
    technologies: ["Cloudflare", "Firebase", "GCP"],
    techIcons: "cloudflare,firebase,gcp",
    year: "2025~",
    links: {
      github: "https://github.com/jules-pecaoco/qr-attendance-system",
      live: "https://qrapps.org",
    },
    isLive: true,
    rev: true,
    scrollY: "-60%",
  },
  {
    id: 1,
    title: "TANAW",
    description:
      "Tanaw.site is a modern mobile platform built as a cross-platform app using Expo/React Native and styled with Tailwind CSS, written in JavaScript & TypeScript. It uses file-based routing, custom hooks, services, and Supabase integration for backend features, focusing on clean UI and responsive design.",
    img: Tanaw,
    technologies: ["React Native", "Tailwind CSS", "Supabase"],
    techIcons: "react,tailwindcss,supabase",
    year: "2025~",
    links: {
      github: "https://github.com/jules-pecaoco/tanaw-v2",
      live: "https://tanaw.site",
    },
    isLive: true,
    rev: false,
    scrollY: "-77%",
  },
  {
    id: 2,
    title: "CYBER BLOG WEBSITE W/ MAP",
    description:
      "CyberAdryx Online is a cybersecurity website sharing insights and educational content to help IT students and professionals build practical skills and promote responsible cyber practices.",
    img: Forensics,
    technologies: ["React", "MapLibre GL", "Typescript"],
    techIcons: "react,typescript",
    year: "2025",
    links: {
      github: "https://github.com/jules-pecaoco/cyber-forensics-blog-soko",
      live: "https://cyberadryx.online",
    },
    isLive: true,
    rev: true,
    scrollY: "-77%",
  },
  {
    id: 7,
    title: "HEALTHMATE",
    description:
      "A PHP-based web application for managing health records and patient information, featuring a nutrition finder based on ingredients.",
    img: null,
    technologies: ["PHP", "MySQL"],
    techIcons: "php,mysql",
    year: "2024",
    links: {
      github: "https://github.com/jules-pecaoco/heathmate",
    },
    isLive: false,
    rev: false,
    scrollY: "-77%",
  },
  {
    id: 3,
    title: "LIBRARY MANAGEMENT SYSTEM",
    description:
      "This project provides an in-depth application to databases, covering data modeling, design, encryption, querying, and optimization.",
    img: null,
    technologies: ["Python", "Flask", "SQLite"],
    techIcons: "python,flask,sqlite",
    year: "2024",
    links: {
      github: "https://github.com/jules-pecaoco/flask-project",
    },
    isLive: false,
    rev: true,
    scrollY: "-77%",
  },
  {
    id: 4,
    title: "MY PORTFOLIO",
    description:
      "A responsive personal portfolio built with React and custom CSS to showcase my skills, projects, and experience, featuring a clean UI, reusable components, project gallery, and contact section.",
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
      "A responsive fitness and gym website built with Bootstrap and jQuery, featuring class schedules, trainer profiles, membership highlights, and a contact form with clean, user-friendly design.",
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
    id: 5,
    title: "CRUD MEMORIAL PLAN",
    description:
      "A Java-based CRUD application using JavaFX and MySQL that manages memorial or funeral plans, calculates costs, displays details, and generates printable receipts.",
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
    id: 6,
    title: "JAVA CALCULATOR",
    description:
      "A Java desktop calculator showcasing core Java concepts, data structures, and algorithms, supporting advanced expression parsing, parentheses, negatives, decimals, and exponents.",
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
  year: "2022~",
  title: "OTHER LANGUAGES AND TOOLS I USED",
  tech: "SASS, Figma, Photoshop, Python, API's, Firebase, HTML, Javascript",
  icons: "sass,figma,photoshop,python,firebase,html,javascript,typescript,supabase,gcp&perline=5",
};
