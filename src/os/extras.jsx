import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

export const Clock = ({ onSecret, className = "" }) => {
  const [now, setNow] = useState(() => new Date());
  const clicks = useRef([]);
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);
  // Easter egg: click the clock three times quickly to toggle night.
  const onClick = () => {
    const t = Date.now();
    clicks.current = [...clicks.current.filter((c) => t - c < 900), t];
    if (clicks.current.length >= 3) {
      clicks.current = [];
      onSecret();
    }
  };
  return (
    <button type="button" onClick={onClick} className={`os-mono whitespace-nowrap tabular-nums ${className}`} aria-label="Clock">
      {now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
    </button>
  );
};

export const Toast = ({ msg }) => (
  <motion.div
    role="status"
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    className="os-glass-strong fixed top-5 left-1/2 z-[9999] max-w-[90vw] -translate-x-1/2 rounded-2xl px-5 py-3 text-[14px] font-semibold"
  >
    {msg}
  </motion.div>
);

export const Tumbleweed = () => (
  <div className="os-tumbleweed pointer-events-none fixed bottom-24 left-0 z-[9998]" aria-hidden="true">
    <span className="os-tumble-hop">
      <img src="/os/tumbleweed.webp" alt="" width="120" height="118" className="os-tumble-spin block" />
    </span>
    <span className="os-tumble-shadow" />
  </div>
);

export const NightToggle = ({ night, onToggle, className = "" }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={night}
    aria-label={night ? "Switch to day" : "Switch to night"}
    title={night ? "Day mode" : "Night mode"}
    className={`inline-flex items-center justify-center rounded-full transition-colors hover:bg-white/10 ${className}`}
  >
    {night ? <FiSun size={18} /> : <FiMoon size={18} />}
  </button>
);

// Day photo underneath; the night photo fades in on top (only loaded once night is used).
export const Wallpaper = ({ day, nightSrc, night }) => {
  const used = useRef(night);
  if (night) used.current = true;
  return (
    <>
      <img src={day} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {used.current && (
        <img
          src={nightSrc}
          alt=""
          className={`os-night-photo absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${night ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </>
  );
};

export const Stars = () => {
  const stars = useMemo(
    () => Array.from({ length: 70 }, (_, i) => ({ x: (i * 37.7) % 100, y: (i * 19.3) % 55, d: (i % 7) * 0.4, s: i % 3 === 0 ? 2 : 1 })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animation: `os-twinkle 3s ${s.d}s ease-in-out infinite` }}
        />
      ))}
    </div>
  );
};

export const CactusIcon = () => (
  <svg viewBox="0 0 56 56" className="h-full w-full" aria-hidden="true">
    <rect width="56" height="56" rx="12" fill="#f4e2c9" />
    <g fill="#3f7a4a">
      <rect x="23" y="10" width="10" height="36" rx="5" />
      <rect x="12" y="20" width="8" height="16" rx="4" />
      <rect x="12" y="30" width="14" height="6" rx="3" />
      <rect x="36" y="16" width="8" height="14" rx="4" />
      <rect x="30" y="25" width="14" height="6" rx="3" />
    </g>
    <rect x="16" y="44" width="24" height="4" rx="2" fill="#c9a06b" />
  </svg>
);
