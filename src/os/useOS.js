import { useCallback, useEffect, useRef, useState } from "react";
import { featured } from "./data";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

// Shared state for both layouts: open apps, focus order, easter eggs.
export function useOS(initial = []) {
  const [wins, setWins] = useState(() =>
    Object.fromEntries(initial.map((id, i) => [id, { open: true, min: false, z: 10 + i }]))
  );
  const zTop = useRef(10 + initial.length);
  const [night, setNight] = useState(() => {
    try {
      return localStorage.getItem("josh-os-night") === "1";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("josh-os-night", night ? "1" : "0");
    } catch {
      /* storage blocked: the toggle still works for this visit */
    }
  }, [night]);
  const [tumble, setTumble] = useState(0);
  const [toast, setToast] = useState(null);
  const seen = useRef(new Set(initial));
  const [cactusUnlocked, setCactusUnlocked] = useState(false);

  const toastTimer = useRef(0);
  const say = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 4200);
  }, []);

  const openApp = useCallback(
    (id) => {
      zTop.current += 1;
      setWins((w) => ({ ...w, [id]: { open: true, min: false, z: zTop.current } }));
      if (featured.some((f) => f.id === id)) {
        seen.current.add(id);
        if (!cactusUnlocked && featured.every((f) => seen.current.has(f.id))) {
          setCactusUnlocked(true);
          say("Achievement unlocked: you looked at every project. A cactus appeared.");
        }
      }
    },
    [cactusUnlocked, say]
  );
  const closeApp = useCallback((id) => setWins((w) => ({ ...w, [id]: { ...w[id], open: false } })), []);
  const minimize = useCallback((id) => setWins((w) => ({ ...w, [id]: { ...w[id], min: true } })), []);
  const focus = useCallback((id) => {
    zTop.current += 1;
    setWins((w) => (w[id]?.z === zTop.current - 1 ? w : { ...w, [id]: { ...w[id], z: zTop.current } }));
  }, []);

  const closeAll = useCallback(() => setWins((w) => Object.fromEntries(Object.entries(w).map(([k, v]) => [k, { ...v, open: false }]))), []);
  const reset = useCallback(() => {
    zTop.current = 10 + initial.length;
    setWins(Object.fromEntries(initial.map((id, i) => [id, { open: true, min: false, z: 10 + i }])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleNight = useCallback(() => setNight((n) => !n), []);
  const tumbleweed = useCallback(() => setTumble((t) => t + 1), []);

  // Konami code
  useEffect(() => {
    let i = 0;
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === KONAMI[i] ? i + 1 : k === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) {
        i = 0;
        setTumble((t) => t + 1);
        say("Konami code accepted. +30 lives in the desert.");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [say]);

  return { wins, openApp, closeApp, closeAll, reset, minimize, focus, night, toggleNight, tumble, tumbleweed, toast, say, cactusUnlocked };
}
