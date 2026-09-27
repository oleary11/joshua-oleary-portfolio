import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import myimg from "../assets/myimg.png";
import { resume } from "../assets";
import { celebrate } from "../utils/confetti";
import { bio } from "./data";
import { APPS, byId, RESUME_ICON } from "./registry";
import Window from "./Window";
import { useOS } from "./useOS";
import { Tumbleweed, Stars, Toast, Clock, CactusIcon } from "./extras";

const DESKTOP_ICONS = ["platrly", "pinpassport", "tally", "dcw", "olearysoftware", "about", "folder", "blog", "terminal", "contact"];
const DOCK = ["about", "platrly", "pinpassport", "tally", "dcw", "olearysoftware", "terminal", "github", "contact"];

function useFrames() {
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const onR = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  return useMemo(() => {
    const { w: W, h: H } = vp;
    const left = Math.round(W * 0.34);
    const rowX = left - 40;
    const gap = 18;
    const col = Math.min(460, Math.floor((W - rowX - 28 - gap * 2) / 3));
    const bottomY = Math.round(H * 0.5);
    const bottomH = Math.min(340, H - bottomY - 112);
    const frames = {
      platrly: { x: left, y: 28, w: Math.min(900, W - left - 28), h: Math.min(540, bottomY - 44) },
      terminal: { x: rowX, y: bottomY, w: col, h: bottomH },
      github: { x: rowX + col + gap, y: bottomY, w: col, h: bottomH },
      contact: { x: rowX + (col + gap) * 2, y: bottomY, w: col, h: bottomH },
    };
    let cascade = 0;
    return (id) => {
      if (frames[id]) return frames[id];
      const s = byId[id].size;
      const w = Math.min(s.w, W - 80);
      const h = Math.min(s.h, H - 140);
      cascade = (cascade + 1) % 5;
      return { x: Math.round((W - w) / 2) + cascade * 24 - 48, y: Math.max(28, Math.round((H - h) / 2) - 60 + cascade * 20), w, h };
    };
  }, [vp]);
}

const DesktopIcon = ({ app, onOpen, href }) => {
  const inner = (
    <>
      <span className="block h-14 w-14 transition-transform group-hover:scale-105 group-active:scale-95">{app.icon}</span>
      <span className="mt-1.5 line-clamp-2 max-w-[92px] text-center text-[12px] leading-tight font-semibold text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.8)]">
        {app.label}
      </span>
    </>
  );
  const cls = "group flex w-[92px] flex-col items-center rounded-xl p-1.5 hover:bg-white/10";
  return href ? (
    <a href={href} download="Joshua_OLeary_Resume.pdf" onClick={(e) => celebrate(e.currentTarget)} className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onDoubleClick={onOpen} onClick={onOpen} className={cls}>
      {inner}
    </button>
  );
};

const Desktop = () => {
  const os = useOS(["platrly", "terminal", "github", "contact"]);
  const frameFor = useFrames();
  const [frames, setFrames] = useState({});
  const areaRef = useRef(null);

  const frameOf = (id) => frames[id] ?? null;
  const topId = Object.entries(os.wins)
    .filter(([, w]) => w.open && !w.min)
    .sort((a, b) => b[1].z - a[1].z)[0]?.[0];
  const open = (id) => {
    if (!frames[id]) setFrames((f) => ({ ...f, [id]: frameFor(id) }));
    os.openApp(id);
  };

  useEffect(() => {
    setFrames({ platrly: frameFor("platrly"), terminal: frameFor("terminal"), github: frameFor("github"), contact: frameFor("contact") });
  }, [frameFor]);

  const ctx = (id) => ({ openApp: open, closeSelf: () => os.closeApp(id), toggleNight: os.toggleNight, tumbleweed: os.tumbleweed });

  return (
    <div data-lenis-prevent className={`os fixed inset-0 overflow-hidden bg-[#2a1810] ${os.night ? "os-night" : ""}`}>
      <img src="/os/wallpaper-desktop.jpg" alt="" className="os-wallpaper absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_20%,rgb(40_18_8/0.35),transparent_70%)]" aria-hidden="true" />
      {os.night && <Stars />}

      <main ref={areaRef} className="absolute inset-0 bottom-[96px]">
        <div className="absolute top-7 left-7 flex w-[min(440px,30vw)] flex-col gap-5">
        {/* Greeting widget */}
        <section className="os-glass rounded-3xl p-6" aria-labelledby="hello">
          <div className="flex items-center gap-5">
            <img src={myimg} alt="Joshua O'Leary" className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-[#ffd7bf]/50" />
            <h1 id="hello" className="text-[clamp(1.6rem,2.3vw,2.4rem)] leading-[1.08] font-extrabold tracking-tight">
              {bio.greeting}
              <span className="block font-medium text-[var(--os-muted)]">{bio.tagline}</span>
            </h1>
          </div>
          <p className="mt-5 border-t border-[var(--os-line)] pt-4 text-[15px] text-[var(--os-muted)]">{bio.line}</p>
          <p className="mt-2 text-[13px] text-[var(--os-faint)]">Click an icon to open it. Windows can be dragged around.</p>
        </section>

        {/* Desktop icons */}
        <nav aria-label="Desktop" className="-ml-2 grid grid-cols-[repeat(auto-fill,92px)] gap-x-2 gap-y-2">
          {DESKTOP_ICONS.map((id) => (
            <DesktopIcon key={id} app={byId[id]} onOpen={() => open(id)} />
          ))}
          <DesktopIcon app={{ label: "Resume.pdf", icon: RESUME_ICON }} href={resume} />
          {os.cactusUnlocked && (
            <DesktopIcon app={{ label: "cactus.png", icon: <CactusIcon /> }} onOpen={() => os.say("It's a cactus. You earned it.")} />
          )}
        </nav>
        </div>

        {/* Trash, bottom right, level with the dock so windows never cover it */}
        <div className="absolute right-5 -bottom-[88px] z-[1]">
          <DesktopIcon app={byId.trash} onOpen={() => open("trash")} />
        </div>

        {/* Windows */}
        <AnimatePresence>
          {APPS.filter((a) => os.wins[a.id]?.open && frameOf(a.id)).map((a) => (
            <Window
              key={a.id}
              app={{ ...a, frame: frameOf(a.id) }}
              state={os.wins[a.id]}
              active={a.id === topId}
              constraintsRef={areaRef}
              onFocus={() => os.focus(a.id)}
              onClose={() => os.closeApp(a.id)}
              onMinimize={() => os.minimize(a.id)}
            >
              {a.render(ctx(a.id))}
            </Window>
          ))}
        </AnimatePresence>
      </main>

      {/* Dock */}
      <nav aria-label="Dock" className="os-glass absolute bottom-4 left-1/2 flex -translate-x-1/2 items-end gap-2 rounded-3xl px-3 py-2.5">
        {DOCK.map((id) => (
          <button
            key={id}
            type="button"
            aria-label={`Open ${byId[id].title}`}
            title={byId[id].title}
            onClick={() => open(id)}
            className="relative h-14 w-14 transition-transform duration-200 hover:-translate-y-2 hover:scale-110"
          >
            {byId[id].icon}
            {os.wins[id]?.open && <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#ffd7bf]" />}
          </button>
        ))}
        <span className="mx-1 h-10 w-px self-center bg-[var(--os-line)]" aria-hidden="true" />
        <Clock onSecret={os.toggleNight} className="self-center px-2 text-[15px] font-semibold" />
      </nav>

      <AnimatePresence>{os.toast && <Toast key={os.toast} msg={os.toast} />}</AnimatePresence>
      {os.tumble > 0 && <Tumbleweed key={os.tumble} />}
      <motion.p aria-hidden="true" className="os-mono pointer-events-none absolute bottom-6 left-7 text-[11px] tracking-[0.25em] text-white/60 uppercase">
        Phoenix, Arizona
      </motion.p>
    </div>
  );
};

export default Desktop;
