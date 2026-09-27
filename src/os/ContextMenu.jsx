import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiTerminal,
  FiFolder,
  FiUser,
  FiMoon,
  FiSun,
  FiXSquare,
  FiRefreshCw,
  FiDownload,
  FiCopy,
  FiGithub,
} from "react-icons/fi";

// Right-clicks on these keep the browser's own menu (copying text, opening links, pasting).
const NATIVE = "input, textarea, a, [contenteditable='true']";

export function useContextMenu() {
  const [menu, setMenu] = useState(null);
  const onContextMenu = (e) => {
    if (e.target.closest(NATIVE) || String(window.getSelection?.() ?? "").trim()) return;
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  };
  return { menu, onContextMenu, close: () => setMenu(null) };
}

const ContextMenu = ({ x, y, items, onClose }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ left: x, top: y });

  // Keep the menu on screen near the edges.
  useLayoutEffect(() => {
    const r = ref.current.getBoundingClientRect();
    setPos({
      left: Math.min(x, window.innerWidth - r.width - 8),
      top: Math.min(y, window.innerHeight - r.height - 8),
    });
  }, [x, y]);

  useEffect(() => {
    ref.current.querySelector("[role=menuitem]:not([disabled])")?.focus();
    const away = (e) => !ref.current?.contains(e.target) && onClose();
    const key = (e) => e.key === "Escape" && onClose();
    window.addEventListener("pointerdown", away);
    window.addEventListener("keydown", key);
    window.addEventListener("resize", onClose);
    window.addEventListener("blur", onClose);
    return () => {
      window.removeEventListener("pointerdown", away);
      window.removeEventListener("keydown", key);
      window.removeEventListener("resize", onClose);
      window.removeEventListener("blur", onClose);
    };
  }, [onClose]);

  const onKeyDown = (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const list = [...ref.current.querySelectorAll("[role=menuitem]:not([disabled])")];
    const i = list.indexOf(document.activeElement);
    list[(i + (e.key === "ArrowDown" ? 1 : -1) + list.length) % list.length]?.focus();
  };

  return (
    <motion.div
      ref={ref}
      role="menu"
      aria-label="Desktop menu"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.12 }}
      onKeyDown={onKeyDown}
      onContextMenu={(e) => e.preventDefault()}
      style={{ left: pos.left, top: pos.top, transformOrigin: "top left" }}
      className="os-window is-active fixed z-[9000] w-60 rounded-xl p-1.5 text-[14px]"
    >
      {items.map((it, i) =>
        it === "-" ? (
          <div key={i} className="my-1 h-px bg-[var(--os-line)]" role="separator" />
        ) : (
          <button
            key={it.label}
            type="button"
            role="menuitem"
            disabled={it.disabled}
            onClick={() => {
              onClose();
              it.run();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left outline-none hover:bg-[var(--os-accent)] hover:text-white focus-visible:bg-[var(--os-accent)] focus-visible:text-white disabled:pointer-events-none disabled:opacity-40"
          >
            <span className="w-4 shrink-0 opacity-80" aria-hidden="true">
              {it.icon}
            </span>
            <span className="flex-1">{it.label}</span>
            {it.hint && <span className="os-mono text-[11px] opacity-60">{it.hint}</span>}
          </button>
        )
      )}
    </motion.div>
  );
};

export const desktopMenuItems = ({ os, open, resetLayout, downloadResume, hire, email, repo }) => {
  const anyOpen = Object.values(os.wins).some((w) => w.open);
  return [
    { label: "Open Terminal", icon: <FiTerminal />, run: () => open("terminal") },
    { label: "All projects", icon: <FiFolder />, run: () => open("folder") },
    { label: "About me", icon: <FiUser />, run: () => open("about") },
    "-",
    { label: os.night ? "Day mode" : "Night mode", icon: os.night ? <FiSun /> : <FiMoon />, run: os.toggleNight },
    { label: "Close all windows", icon: <FiXSquare />, run: os.closeAll, disabled: !anyOpen },
    { label: "Reset layout", icon: <FiRefreshCw />, run: resetLayout },
    "-",
    { label: "Download resume", icon: <FiDownload />, run: downloadResume, hint: "PDF" },
    {
      label: "Copy email",
      icon: <FiCopy />,
      run: () =>
        navigator.clipboard
          ?.writeText(email)
          .then(() => os.say(`Copied ${email}`))
          .catch(() => os.say(email)),
    },
    { label: "View source", icon: <FiGithub />, run: () => window.open(repo, "_blank", "noopener,noreferrer") },
    "-",
    { label: "Hire Josh", icon: <span>🌵</span>, run: hire },
  ];
};

export default ContextMenu;
