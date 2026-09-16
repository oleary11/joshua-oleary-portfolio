import { experiences, projects, technologies } from "../../constants";

export const COMMAND_LIST = [
  "whoami",
  "help",
  "skills",
  "experience",
  "projects",
  "contact",
  "resume",
  "sudo hire-me",
  "clear",
  "exit",
];

export const COMMANDS = {
  whoami: () => [
    "Joshua O'Leary — Software Engineer",
    "Edupoint Educational Systems | B.A. Computer Science, CU Boulder",
  ],

  help: () => ["Available commands:", `  ${COMMAND_LIST.join(", ")}`],

  skills: () => [technologies.map((t) => t.name).join(", ")],

  experience: () =>
    experiences.flatMap((e) => [
      `${e.title} @ ${e.company_name} (${e.date})`,
      ...e.points.map((p) => `  - ${p}`),
      "",
    ]),

  projects: () =>
    projects.flatMap((p) => [
      p.name,
      `  ${p.description}`,
      `  ${p.live_link || p.source_code_link || ""}`,
      "",
    ]),

  contact: () => ["Email:  joshuao020701@gmail.com", "GitHub: github.com/oleary11"],

  resume: (ctx) => {
    ctx.downloadResume();
    return ["Downloading Joshua_OLeary_Resume.pdf..."];
  },

  "sudo hire-me": (ctx) => {
    ctx.celebrate();
    return ["Permission granted.", "Initiating hiring sequence...", "Let's talk: joshuao020701@gmail.com"];
  },

  clear: (ctx) => {
    ctx.clearHistory();
    return null;
  },

  exit: (ctx) => {
    ctx.close();
    return ["Goodbye."];
  },
};

export function runCommand(rawInput, ctx) {
  const normalized = rawInput.trim().toLowerCase().replace(/\s+/g, " ");
  if (!normalized) return null;

  const handler = COMMANDS[normalized];
  if (!handler) return [`${rawInput}: command not found — try 'help'`];

  return handler(ctx);
}
