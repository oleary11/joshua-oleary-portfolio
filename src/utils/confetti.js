import confetti from "canvas-confetti";

const BRAND_COLORS = ["#5B7A99", "#4A6D8C", "#7E93A8", "#B8C4D0"];

export function celebrate(originEl) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const rect = originEl?.getBoundingClientRect?.();
  const origin = rect
    ? {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      }
    : { x: 0.5, y: 0.6 };

  confetti({
    particleCount: 80,
    spread: 70,
    startVelocity: 35,
    origin,
    colors: BRAND_COLORS,
    zIndex: 10000,
    disableForReducedMotion: true,
  });
}
