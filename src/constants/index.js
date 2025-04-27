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
  nfltool
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

const services = [
  { title: "Software Engineer", icon: web },
  { title: "Network Engineer", icon: backend },
  { title: "Full Stack Developer", icon: mobile },
  { title: "Technical Support Engineer", icon: creator },
];

const technologies = [
  { name: "C#", icon: javascript },
  { name: "C++", icon: css },
  { name: "Python", icon: nodejs },
  { name: "Java", icon: nodejs },
  { name: "JavaScript", icon: javascript },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "TypeScript", icon: typescript },
  { name: "Node.js", icon: nodejs },
  { name: "React (basic)", icon: reactjs },
  { name: "MongoDB", icon: mongodb },
  { name: "Docker", icon: docker },
  { name: "Git", icon: git },
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
];

export { services, technologies, experiences, projects };
