import { experiences, technologies } from "../constants";
import { featured, EMAIL, GITHUB_USERNAME } from "./data";
import { celebrate } from "../utils/confetti";
import { downloadResume } from "../utils/downloadResume";

const HELP = ["whoami", "about", "projects", "open <project>", "experience", "skills", "resume", "contact", "github", "privacy", "clear", "exit"];

const MUG = [
  "   ( (",
  "    ) )",
  "  ........",
  "  |      |]",
  "  \\      /",
  "   `----'",
  "Brewing... Josh runs on this.",
];

const CACTUS = [
  "      ,*-.",
  "      |  |",
  "  ,.  |  |",
  "  | |_|  | ,.",
  "  `---.  |_| |",
  "      |  .--`",
  "      |  |",
  "      |  |",
  "Sonoran Desert, est. forever.",
];

export function runCommand(raw, ctx) {
  const input = raw.trim();
  const cmd = input.toLowerCase().replace(/\s+/g, " ");

  if (cmd.startsWith("open ")) {
    const q = cmd.slice(5).replace(/[^a-z]/g, "");
    const p = featured.find((f) => f.id.includes(q) || f.name.toLowerCase().replace(/[^a-z]/g, "").includes(q));
    if (!p) return [`open: no project named '${input.slice(5)}' (try 'projects')`];
    ctx.openApp(p.id);
    return [`Opening ${p.name}...`];
  }

  switch (cmd) {
    case "help":
      return ["Commands:", `  ${HELP.join(", ")}`, "Psst... there are a few hidden ones."];
    case "whoami":
      return ["Joshua O'Leary: software engineer & founder of OLeary Software.", "Phoenix, AZ. Builds things people use."];
    case "about":
      ctx.openApp("about");
      return ["Opening About me..."];
    case "projects":
    case "ls projects":
      return [featured.map((f) => f.id).join("  "), "Type 'open <name>' to open one."];
    case "experience":
      return experiences.map((e) => `${e.date.padEnd(26)} ${e.title} @ ${e.company_name}`);
    case "skills":
      return [technologies.map((t) => t.name).join(", ")];
    case "resume":
      downloadResume();
      celebrate(ctx.el);
      return ["Downloading Joshua_OLeary_Resume.pdf..."];
    case "contact":
      ctx.openApp("contact");
      return [`Email: ${EMAIL}`, "Opening Contact..."];
    case "github":
      return [`github.com/${GITHUB_USERNAME}`];
    case "privacy":
    case "cat privacy.txt":
      ctx.openApp("privacy");
      return ["Opening privacy.txt... (short version: no tracking, and your message is only used to reply)"];
    case "clear":
      ctx.clear();
      return null;
    case "exit":
      ctx.closeSelf();
      return ["Bye!"];

    // ---- hidden ----
    case "ls -a":
    case "ls -la":
      return [".  ..  .secrets  projects/  resume.pdf  privacy.txt  coffee.sh"];
    case "cat .secrets":
      return [
        "1. The Konami code does something. (up up down down left right left right b a)",
        "2. Try: sudo hire-me",
        "3. There's a Trash can somewhere.",
        "4. Open every project. Something happens.",
      ];
    case "sudo hire-me":
    case "sudo hire josh":
    case "hire josh":
      celebrate(ctx.el);
      return ["Permission granted. Initiating hiring sequence...", `Let's talk: ${EMAIL}`];
    case "sudo rm -rf /":
    case "rm -rf /":
      return ["Nice try. This desert is protected by cacti."];
    case "coffee":
    case "./coffee.sh":
      return MUG;
    case "cactus":
      return CACTUS;
    case "night":
      ctx.toggleNight();
      return ["Toggling night in the desert..."];
    case "tumbleweed":
      ctx.tumbleweed();
      return ["~ a tumbleweed rolls by ~"];
    case "vim":
    case "vi":
      return ["You're safe here. No one has ever exited vim anyway."];
    case "hello":
    case "hi":
      return ["Hey! Thanks for poking around. Type 'help' if you're lost."];
    case "42":
      return ["The answer. Now what was the question?"];
    default:
      return [`${input}: command not found. Try 'help'.`];
  }
}
