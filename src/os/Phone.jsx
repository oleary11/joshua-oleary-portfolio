import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { FiChevronLeft } from "react-icons/fi";
import myimg from "../assets/myimg.png";
import { resume } from "../assets";
import { celebrate } from "../utils/confetti";
import { bio } from "./data";
import { byId, RESUME_ICON } from "./registry";
import { useOS } from "./useOS";
import { Tumbleweed, Stars, Toast, Clock, CactusIcon, NightToggle, Wallpaper } from "./extras";

const GRID = ["platrly", "pinpassport", "tally", "dcw", "olearysoftware", "idaho", "folder", "blog", "github"];
const DOCK = ["about", "terminal", "contact"];

const AppIcon = ({ app, onOpen, href }) => {
  const inner = (
    <>
      <span className="block aspect-square w-full max-w-[64px] transition-transform active:scale-90">{app.icon}</span>
      <span className="mt-1.5 line-clamp-1 w-full text-center text-[11px] font-semibold text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.8)]">
        {app.label}
      </span>
    </>
  );
  const cls = "flex flex-col items-center";
  return href ? (
    <a href={href} download="Joshua_OLeary_Resume.pdf" onClick={(e) => celebrate(e.currentTarget)} className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onOpen} className={cls} aria-label={`Open ${app.title ?? app.label}`}>
      {inner}
    </button>
  );
};

const Phone = () => {
  const os = useOS([]);
  const drag = useDragControls();
  const current = Object.entries(os.wins)
    .filter(([, w]) => w.open)
    .sort((a, b) => b[1].z - a[1].z)[0]?.[0];

  const ctx = (id) => ({ openApp: os.openApp, closeSelf: () => os.closeApp(id), toggleNight: os.toggleNight, tumbleweed: os.tumbleweed });

  return (
    <div data-lenis-prevent className={`os fixed inset-0 overflow-hidden bg-[#2a1810] ${os.night ? "os-night" : ""}`}>
      <Wallpaper day="/os/wallpaper-mobile.jpg" nightSrc="/os/wallpaper-mobile-night.jpg" night={os.night} />
      <div className={`pointer-events-none absolute inset-0 transition-colors duration-1000 ${os.night ? "bg-transparent" : "bg-white/[0.06]"}`} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30" aria-hidden="true" />
      {os.night && <Stars />}

      <div className="relative flex h-full flex-col px-5 pt-3 pb-5">
        {/* Status bar */}
        <div className="flex items-center justify-between px-2 text-[14px] font-semibold">
          <Clock onSecret={os.toggleNight} className="min-h-8" />
          <span className="flex items-center gap-1">
            <span className="os-mono text-[11px] tracking-widest text-white/70 uppercase">josh-os</span>
            <NightToggle night={os.night} onToggle={os.toggleNight} className="h-11 w-11" />
          </span>
        </div>

        {/* Greeting widget */}
        <section className="os-glass mt-4 rounded-3xl p-5" aria-labelledby="hello-m">
          <div className="flex items-center gap-4">
            <img src={myimg} alt="Joshua O'Leary" className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-[#ffd7bf]/50" />
            <h1 id="hello-m" className="text-[1.45rem] leading-tight font-extrabold tracking-tight">
              {bio.greeting}
              <span className="block text-[1.05rem] font-medium text-[var(--os-muted)]">{bio.tagline}</span>
            </h1>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-[var(--os-muted)]">{bio.line}</p>
        </section>

        {/* App grid */}
        <nav aria-label="Apps" className="mt-6 grid grid-cols-4 gap-x-4 gap-y-5">
          {GRID.map((id) => (
            <AppIcon key={id} app={byId[id]} onOpen={() => os.openApp(id)} />
          ))}
          <AppIcon app={{ label: "Resume", icon: RESUME_ICON }} href={resume} />
          <AppIcon app={byId.trash} onOpen={() => os.openApp("trash")} />
          {os.cactusUnlocked && <AppIcon app={{ label: "cactus", icon: <CactusIcon /> }} onOpen={() => os.say("It's a cactus. You earned it.")} />}
        </nav>

        {/* Dock */}
        <nav aria-label="Dock" className="os-glass mt-auto grid grid-cols-3 gap-4 rounded-[28px] px-6 py-3">
          {DOCK.map((id) => (
            <AppIcon key={id} app={byId[id]} onOpen={() => os.openApp(id)} />
          ))}
        </nav>
      </div>

      {/* Full-screen app sheet */}
      <AnimatePresence>
        {current && (
          <motion.section
            key={current}
            role="dialog"
            aria-label={byId[current].title}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            drag="y"
            dragControls={drag}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => info.offset.y > 140 && os.closeApp(current)}
            className="os-glass-strong absolute inset-0 z-50 flex flex-col"
          >
            <header onPointerDown={(e) => drag.start(e)} className="flex touch-none items-center gap-2 border-b border-[var(--os-line)] px-3 pt-3 pb-2">
              <button type="button" onClick={() => os.closeApp(current)} className="inline-flex min-h-11 items-center gap-1 px-2 text-[15px] font-semibold text-[#ffb892]">
                <FiChevronLeft size={20} /> Home
              </button>
              <p className="flex-1 truncate text-center text-[15px] font-bold">{byId[current].title}</p>
              <span className="w-[76px]" aria-hidden="true" />
            </header>
            <div className="os-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pb-8">{byId[current].render(ctx(current))}</div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>{os.toast && <Toast key={os.toast} msg={os.toast} />}</AnimatePresence>
      {os.tumble > 0 && <Tumbleweed key={os.tumble} />}
    </div>
  );
};

export default Phone;
