import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const RIPPLES = [0, 1, 2];

const FishingScene = () => {
  const containerRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const pointerX = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.6 });
  const lineLean = useTransform(springX, [-1, 1], [-6, 6]);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handlePointerMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relative = (e.clientX - rect.left) / rect.width - 0.5;
    pointerX.set(Math.max(-1, Math.min(1, relative * 2)));
  };

  const handlePointerLeave = () => pointerX.set(0);

  return (
    <div
      ref={containerRef}
      onMouseMove={reduceMotion ? undefined : handlePointerMove}
      onMouseLeave={reduceMotion ? undefined : handlePointerLeave}
      className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0e1620] via-[#122132] to-[#0a1520] border border-white/5"
    >
      <svg
        viewBox="0 0 300 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16283b" />
            <stop offset="55%" stopColor="#101d2c" />
            <stop offset="100%" stopColor="#0a1420" />
          </linearGradient>
        </defs>

        <rect x="0" y="110" width="300" height="190" fill="url(#water)" />

        <path
          d="M0,112 Q37.5,104 75,112 T150,112 T225,112 T300,112"
          fill="none"
          stroke="#5B7A99"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />

        {RIPPLES.map((i) => (
          <motion.circle
            key={i}
            cx="150"
            cy="150"
            r="10"
            fill="none"
            stroke="#7E93A8"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={
              reduceMotion
                ? { opacity: 0.15, scale: 1.4 }
                : { scale: [1, 2.6], opacity: [0.35, 0] }
            }
            transition={
              reduceMotion
                ? {}
                : { duration: 3.6, repeat: Infinity, ease: "easeOut", delay: i * 1.2 }
            }
            style={{ transformOrigin: "150px 150px" }}
          />
        ))}

        <motion.g
          animate={reduceMotion ? { y: 0 } : { y: [0, 6, 0, -4, 0] }}
          transition={reduceMotion ? {} : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.line
            x1="150"
            y1="0"
            x2="150"
            y2="150"
            stroke="#9AA3B0"
            strokeWidth="1"
            strokeOpacity="0.5"
            style={{ x: reduceMotion ? 0 : lineLean, transformOrigin: "150px 0px" }}
          />
          <circle cx="150" cy="150" r="7" fill="#B8C4D0" />
          <path d="M143,150 A7,7 0 0 1 157,150 Z" fill="#C8524A" />
        </motion.g>
      </svg>
    </div>
  );
};

export default FishingScene;
