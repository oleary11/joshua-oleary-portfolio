import { FiUser, FiTerminal, FiGithub, FiMail, FiFileText, FiFolder, FiTrash2, FiBookOpen } from "react-icons/fi";
import { featured } from "./data";
import { ProjectApp, AboutApp, TerminalApp, GitHubApp, BlogApp, ContactApp, ProjectsFolderApp, TrashApp } from "./apps";

const Tile = ({ bg, children }) => (
  <span className="flex h-full w-full items-center justify-center rounded-[22%] shadow-[0_10px_20px_-8px_rgb(0_0_0/0.6)] ring-1 ring-white/15" style={{ background: bg }}>
    {children}
  </span>
);

const glyph = "h-[46%] w-[46%] text-white";

export const APPS = [
  ...featured.map((p) => ({
    id: p.id,
    title: p.name,
    label: p.name,
    project: true,
    icon: (
      <Tile bg={p.tint}>
        <img src={p.icon} alt="" className={p.id === "olearysoftware" ? "h-[60%] w-[60%]" : "h-full w-full rounded-[22%] object-cover"} />
      </Tile>
    ),
    size: { w: 900, h: 540 },
    render: () => <ProjectApp id={p.id} />,
  })),
  {
    id: "about",
    title: "About me",
    label: "About me",
    icon: <Tile bg="linear-gradient(145deg,#e07a45,#b2451c)"><FiUser className={glyph} /></Tile>,
    size: { w: 620, h: 620 },
    render: () => <AboutApp />,
  },
  {
    id: "folder",
    title: "All projects",
    label: "All projects",
    icon: <Tile bg="linear-gradient(145deg,#f2b35e,#d98a2b)"><FiFolder className={glyph} /></Tile>,
    size: { w: 640, h: 560 },
    render: (ctx) => <ProjectsFolderApp openApp={ctx.openApp} />,
  },
  {
    id: "blog",
    title: "Blog",
    label: "Blog",
    icon: <Tile bg="linear-gradient(145deg,#f4e2c9,#d9b98f)"><FiBookOpen className="h-[46%] w-[46%] text-[#7a4a22]" /></Tile>,
    size: { w: 520, h: 560 },
    render: () => <BlogApp />,
  },
  {
    id: "terminal",
    title: "Terminal",
    label: "Terminal",
    icon: <Tile bg="linear-gradient(145deg,#3a2a22,#140c08)"><FiTerminal className={glyph} /></Tile>,
    size: { w: 560, h: 340 },
    render: (ctx) => <TerminalApp ctx={ctx} />,
  },
  {
    id: "github",
    title: "GitHub activity",
    label: "GitHub",
    icon: <Tile bg="linear-gradient(145deg,#2b2320,#0d0907)"><FiGithub className={glyph} /></Tile>,
    size: { w: 560, h: 300 },
    render: () => <GitHubApp />,
  },
  {
    id: "contact",
    title: "Contact",
    label: "Contact",
    icon: <Tile bg="linear-gradient(145deg,#f08a4b,#d9622b)"><FiMail className={glyph} /></Tile>,
    size: { w: 520, h: 560 },
    render: () => <ContactApp />,
  },
  {
    id: "trash",
    title: "Trash",
    label: "Trash",
    hidden: true,
    icon: <Tile bg="linear-gradient(145deg,#8a7a70,#4a3e38)"><FiTrash2 className={glyph} /></Tile>,
    size: { w: 440, h: 330 },
    render: () => <TrashApp />,
  },
];

export const RESUME_ICON = <Tile bg="linear-gradient(145deg,#fff4e8,#f0d6bd)"><FiFileText className="h-[46%] w-[46%] text-[#b2451c]" /></Tile>;

export const byId = Object.fromEntries(APPS.map((a) => [a.id, a]));
