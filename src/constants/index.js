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
  nodejs,
  mongodb,
  git,
  docker,
  veritaslogo,
  redjadelogo,
  boulderlogo,
  EduPoint,
  chickfilalogo,
  merakiapi,
  elttool,
  nfltool,
  desertcandleworks,
} from "../assets";

import cSharp from "../assets/tech/cSharp.png";
import cpp from "../assets/tech/cpp.png";
import python from "../assets/tech/python.png";
import java from "../assets/tech/java.png";
import cLogo from "../assets/tech/c.png";
import ruby from "../assets/tech/ruby.png";
import sql from "../assets/tech/sql.png";
import linux from "../assets/tech/linux.png";
import bootstrap from "../assets/tech/bootstrap.png";
import githubIcon from "../assets/tech/github.png";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "education", title: "Education" },
  { id: "contact", title: "Contact" },
];

const services = [
  { title: "Software Engineer", icon: web },
  { title: "Network Engineer", icon: backend },
  { title: "Full Stack Developer", icon: mobile },
  { title: "Technical Support Engineer", icon: creator },
];

const technologies = [
  { name: "C", icon: cLogo },
  { name: "C#", icon: cSharp },
  { name: "C++", icon: cpp },
  { name: "Python", icon: python },
  { name: "Java", icon: java },
  { name: "Ruby", icon: ruby },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "SQL", icon: sql },
  { name: "Node.js", icon: nodejs },
  { name: "React", icon: reactjs },
  { name: "MongoDB", icon: mongodb },
  { name: "Bootstrap", icon: bootstrap },
  { name: "Docker", icon: docker },
  { name: "Git", icon: git },
  { name: "GitHub", icon: githubIcon },
  { name: "Linux", icon: linux },
];

const experiences = [
  {
    title: "Software Engineer I",
    company_name: "Edupoint Educational Systems",
    icon: EduPoint,
    iconBg: "#383E56",
    date: "August 2024 - Present",
    points: [
      "Implemented new feature development and critical bug fixes for the Synergy K-12 LMS platform using C# (.NET) and TFS, enhancing functionality for thousands of schools nationwide.",
      "Implemented an internal tool in C# (.NET) that automated user data migration from legacy systems into our LMS, accelerating district onboarding processes and minimizing data loss risks.",
    ],
  },
  {
    title: "Network Engineer",
    company_name: "Veritas Managed Solutions",
    icon: veritaslogo,
    iconBg: "#E6DEDD",
    date: "June 2023 - June 2024",
    points: [
      "Implemented an automation tool leveraging the Cisco Meraki API to streamline repetitive network configuration and monitoring tasks, reducing manual intervention by over 25%.",
      "Scoped and generated project proposals for enterprise clients, overseeing multi-site hardware/software rollouts with total valuations exceeding $100K per project.",
    ],
  },
  {
    title: "Technical Support Engineer",
    company_name: "University of Colorado Boulder",
    icon: boulderlogo,
    iconBg: "#383E56",
    date: "August 2022 - May 2023",
    points: [
      "Provided technical support for hardware and software systems across Windows and macOS environments, troubleshooting user issues and ensuring rapid resolution.",
      "Executed data recovery operations using backup management tools, ensuring secure restoration of critical academic and administrative information.",
    ],
  },
  {
    title: "Full Stack Engineer Intern",
    company_name: "RedJade LLC",
    icon: redjadelogo,
    iconBg: "#E6DEDD",
    date: "July 2020 - January 2021",
    points: [
      "Designed and developed production-grade web pages used by high-profile clients including NASA, Amazon, and Walmart, delivering scalable and responsive front-end and back-end solutions.",
      "Built full-stack applications leveraging Ruby on Rails, TypeScript, and modern front-end frameworks, enhancing platform functionality and improving user experience.",
    ],
  },
  {
    title: "Team Leader",
    company_name: "Chick-fil-A",
    icon: chickfilalogo, // (you can upload a CFA logo)
    iconBg: "#E6DEDD",
    date: "July 2013 - August 2022",
    points: [
      "Led and coached team members across guest services, drive-thru, and operations, ensuring exceptional customer experiences.",
      "Supported scheduling, staff training, and workflow optimization, improving team efficiency and service delivery.",
    ],
  }
  
];

const projects = [
  {
    name: "Meraki API Configurer",
    description:
      "A full-stack web application to automate network device configuration management. Built backend services to pull device data via the Meraki API, store configurations in a MySQL database, compare against standardized templates, and push real-time updates to align devices with compliance standards.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "Flask", color: "green-text-gradient" },
      { name: "SQL", color: "pink-text-gradient" },
      { name: "Cisco Meraki API", color: "orange-text-gradient" },
    ],
    image: merakiapi,
    source_code_link: "https://github.com/oleary11/MerakiConfigurer",
  },
  {
    name: "ELT Tool",
    description:
      "A full-stack web application to implement an Extract, Load, Transfer (ELT) data workflow between BigQuery and Google Sheets. Designed a custom HTML/JavaScript frontend connected to a fully custom built API, enabling seamless data extraction, transformation, and synchronization across sources.",
    tags: [
      { name: "NodeJS", color: "blue-text-gradient" },
      { name: "HTML", color: "green-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
      { name: "Google Sheets API", color: "orange-text-gradient" },
    ],
    image: elttool,
    source_code_link: "https://github.com/oleary11/data-mover",
  },
  {
    name: "NFL Sentiment Analysis Tool",
    description:
      "A data mining and sentiment analysis tool using Python to gather and process NFL-related tweets via the Twitter API. Analyzed tweet sentiment and ‘toxicity scores’ using natural language processing libraries which were used to accurately predict weekly game outcomes based on fan sentiment trends.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "Twitter API", color: "green-text-gradient" },
      { name: "Pandas", color: "pink-text-gradient" },
      { name: "NLTK", color: "orange-text-gradient" },
    ],
    image: nfltool,
    source_code_link: "https://github.com/oleary11/NFLSentimentAnalysis",
  },
  {
    name: "Desert Candle Works",
    description:
      "A full-stack e-commerce platform for a local candle business. Built a custom product catalog, shopping cart, and checkout flow with Square and Stripe payment processing. Features a PostgreSQL database via Drizzle ORM, Vercel Blob image storage, transactional email with Resend, and a custom admin dashboard for order and inventory management.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "TypeScript", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
      { name: "Stripe", color: "orange-text-gradient" },
    ],
    image: desertcandleworks,
    source_code_link: null,
    live_link: "https://desertcandleworks.com",
  },
];

const education = {
  school: "University of Colorado at Boulder",
  location: "Boulder, CO",
  degree: "Bachelor of Arts in Computer Science",
  date: "May 2023",
  courses: [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Object-Oriented Programming",
    "Data Mining",
    "Database Systems",
    "Robotics",
    "Big Data Architecture",
  ],
  certifications: [
    { title: "CCNA Training", org: "CBT Nuggets" },
    { title: "Aviatrix Certified Engineer", org: "Multi-Cloud Network Associate" },
  ],
  awards: [
    { title: "Outstanding Senior Award", org: "CU Interfraternity Council" },
    { title: "Brother of the Year Award", org: "Sigma Tau Gamma Fraternity" },
  ],
  leadership: [
    { title: "President", org: "Sigma Tau Gamma Fraternity" },
    { title: "Director of Community Engagement", org: "Sigma Tau Gamma Fraternity" },
  ],
};

export { services, technologies, experiences, projects, education };
