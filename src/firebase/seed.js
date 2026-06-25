import { doc, setDoc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "./config";

export const seedDatabase = async () => {
  try {
    // 1. Seed siteContent/main
    const siteContentRef = doc(db, "siteContent", "main");
    await setDoc(siteContentRef, {
      hero: {
        greeting: "Hi I'm Jules.",
        typingWords: ["Geek", "Software Engineer", "Problem Solver", "Blind"],
        tagline: "Sic Parvis Magna"
      },
      about: {
        name: "I'm Jules.",
        heading: "I'm a Web and Application Developer from Bacolod, Philippines.",
        bio: "I enjoy creating things that live on the internet, whether that be websites, applications, memes, games and anything that piques my interest.",
        profileImageUrl: "", 
        otherTools: {
          year: "2021~",
          title: "OTHER LANGUAGES AND TOOLS I USED",
          tech: "SASS, Figma, Photoshop, Python, API's, Firebase, HTML, Javascript",
          icons: "sass,figma,photoshop,python,firebase,html,javascript&perline=4"
        }
      },
      socials: [
        { label: "Github", url: "https://github.com/jules-pecaoco", category: "social" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/julesalfonzpecaoco/", category: "social" },
        { label: "Facebook", url: "https://www.facebook.com/julesalfonzp", category: "social" },
        { label: "CV", url: "", category: "social" },
        { label: "Messenger", url: "https://m.me/julesalfonzp", category: "contact" },
        { label: "Email", url: "mailto:jules.pecaoco.dev@gmail.com", category: "contact" }
      ],
      spotify: {
        embedUrl: "https://open.spotify.com/embed/album/7xCcuTA3abKwxj8HwgxP7R?utm_source=generator"
      },
      meta: {
        siteTitle: "Jules Pecaoco • Dev",
        description: "Portfolio of Jules Alfonz Pecaoco"
      }
    });

    // 2. Seed projects
    const projectsColRef = collection(db, "projects");
    
    // Clear existing projects to avoid duplicates during multiple seeds
    const existingProjects = await getDocs(projectsColRef);
    for (const docSnap of existingProjects.docs) {
      await deleteDoc(doc(db, "projects", docSnap.id));
    }

    const projectsData = [
      {
        title: "MY PORTFOLIO",
        description: "A portfolio website created with React and CSS. This fully responsive website showcases my skills, projects, and contact details.",
        imageUrl: "", 
        technologies: ["React", "CSS"],
        techIcons: "react,css",
        year: "2023~",
        githubUrl: "https://github.com/jules-pecaoco/reactjs-portfolio",
        liveUrl: "",
        isLive: false,
        reverseLayout: false,
        scrollY: "-77%",
        order: 1,
        visible: true
      },
      {
        title: "POWERFITNESS",
        description: "A fitness website created with Bootstrap and jQuery. This responsive site features a gym class schedule, trainer profiles, and a contact form.",
        imageUrl: "",
        technologies: ["Bootstrap", "jQuery"],
        techIcons: "bootstrap,jquery",
        year: "2023~",
        githubUrl: "https://github.com/jules-pecaoco/power-fitness",
        liveUrl: "https://jules-pecaoco.github.io/power-fitness/",
        isLive: true,
        reverseLayout: true,
        scrollY: "-77%",
        order: 2,
        visible: true
      },
      {
        title: "CRUD MEMORIAL PLAN",
        description: "A CRUD java application using JavaFX for the UI and MySQL for the database. This application allows users to create, read, update and delete funeral plans. Also display plans and calculate the total cost of the plan and print the receipt.",
        imageUrl: "",
        technologies: ["Java", "JavaFX", "MySQL"],
        techIcons: "java,mysql",
        year: "2021-2022",
        githubUrl: "https://github.com/jules-pecaoco/Memorial-Plan-Project",
        liveUrl: "",
        isLive: false,
        reverseLayout: false,
        scrollY: "-80%",
        order: 3,
        visible: true
      },
      {
        title: "JAVA CALCULATOR",
        description: "A java application that showcase my understanding of java language and about data structures and algorithm. This app allows users to perform basic arithmetic operations along with parenthesis, negative numbers, decimal, and exponents.",
        imageUrl: "",
        technologies: ["Java"],
        techIcons: "java",
        year: "2021-2022",
        githubUrl: "https://github.com/jules-pecaoco/Calculator",
        liveUrl: "",
        isLive: false,
        reverseLayout: true,
        scrollY: "-60%",
        order: 4,
        visible: true
      }
    ];

    for (const project of projectsData) {
      await addDoc(projectsColRef, project);
    }

    // 3. Seed resume placeholder doc
    const resumeRef = doc(db, "resume", "current");
    await setDoc(resumeRef, {
      fileUrl: "",
      fileName: "Jules_Pecaoco_Resume.pdf",
      showDownloadButton: false,
      visible: true
    });

    console.log("Database seeded successfully!");
    return true;
  } catch (error) {
    console.error("Error seeding database: ", error);
    throw error;
  }
};
