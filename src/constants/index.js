import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  docker,
  carrent,
  jobit,
  tripguide,
  threejs,
  carrier,
  Fulton,
  EduPoint,
} from "../assets";


export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Machine Learning",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Software Developer Intern",
    company_name: "Edupoint Educational Systems LLC",
    icon: EduPoint,
    iconBg: "#383E56",
    date: "Expected Start Date - Aug 2024",
    points: [
      "Incoming Fall Software Developer Intern at Edupoint, focusing on enhancing Synergy learning management system.",
    ],
  },
  {
    title: "Tech Consultant ",
    company_name: "LX SPACE SUCCESS,ASU",
    icon: Fulton,
    iconBg: "#E6DEDD",
    date: "Mar 2023 - Present",
    points: [
      "Conducted regular maintenance, implemented software updates, and developed automation scripts in Python to ensure smooth functioning of hardware and software systems and improve efficiency. ",
      "Diagnosed and troubleshooted complex technical issues on classroom computers running Windows and macOS operating systems and provided technical support to faculty regarding software applications. ",
    ],
  },
  {
    title: "Undergraduate Teaching Assistant",
    company_name: "Fulton School Of Engineering,ASU",
    icon: Fulton,
    iconBg: "#383E56",
    date: "Jan 2023 - May 2023",
    points: [
      "Assisted 40 students in building several projects in SolidWorks, JavaScript, and MATLAB, providing hands-on guidance and technical support to enhance their learning experience and project outcomes. ",
      "Developed and implemented interactive tutorials and workshops to reinforce key concepts in engineering design and programming, significantly improving student comprehension and engagement with the material. ",
    ],
  },
  {
    title: "Software Engineering Intern",
    company_name: "Carrier Air Conditioning India",
    icon: carrier,
    iconBg: "#E6DEDD",
    date: "May 2021 - May 2022",
    points: [
      "Designed and implemented data management systems using SQL and C++ to maintain accurate records of sales, returns,and inventory, significantly enhancing data integrity and stock management efficiency. ",
      "Conducted thorough code reviews, executed systematic debugging, and used algorithms for the development and optimization of software systems, ensuring high-quality, efficient, and reliable software development projects.",
    ],
  },
];



const projects = [
  {
    name: "Real-time Volumetric Rendering",
    description:
      "Developed a system from scratch for real-time rendering of volumetric data using a multi-texture-based rendering technique.The transfer function can be adjusted in real-time through a graphical interface.",
    tags: [
      {
        name: "C++",
        color: "blue-text-gradient",
      },
      {
        name: "CMake",
        color: "green-text-gradient",
      },
      {
        name: "OpenGL",
        color: "pink-text-gradient",
      },
      {
        name: "Shader Programming",
        color: "orange-text-gradient",
      },
      
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Chess Arena",
    description:
      "Developed a full-stack web-based chess application leveraging JavaScript for frontend interactivity and C++ for backend game logic and deployed it via Vercel.",
    tags: [
      {
        name: "C++",
        color: "blue-text-gradient",
      },
      {
        name: "JavaScript",
        color: "green-text-gradient",
      },
      {
        name: "CSS",
        color: "pink-text-gradient",
      },
      {
        name: "HTML",
        color: "orange-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "ResQ(Smart India Hackathon)",
    description:
      "Developed a disaster management app for efficient collaboration among rescue agencies, utilizing Python and Node.js for backend, Flutter for frontend, and Google Maps API for real-time location tracking.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "NodeJS",
        color: "green-text-gradient",
      },
      {
        name: "Flutter",
        color: "pink-text-gradient",
      },
      {
        name: "Google Maps API",
        color: "orange-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, projects };
