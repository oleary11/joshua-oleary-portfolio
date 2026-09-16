import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// A precise, minimal cursor — not a blurred glow. It grows and labels itself
// over specific interactive elements (mark them with data-cursor="Label") so
// it communicates intent instead of just decorating the pointer.
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState(null);
  const [hovering, setHovering] = useState(false);
  const [overTextInput, setOverTextInput] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 380, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 380, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduceMotion) return;

    setEnabled(true);
    document.body.classList.add("cursor-none-fine");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      const textInput = e.target.closest?.("input, textarea");
      setOverTextInput(Boolean(textInput));
      if (textInput) {
        setLabel(null);
        setHovering(false);
        return;
      }

      const labelTarget = e.target.closest?.("[data-cursor]");
      if (labelTarget) {
        setLabel(labelTarget.getAttribute("data-cursor"));
        setHovering(true);
        return;
      }
      const interactive = e.target.closest?.("a, button");
      setLabel(null);
      setHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      document.body.classList.remove("cursor-none-fine");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = overTextInput ? 0 : label ? 68 : hovering ? 32 : 14;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:flex items-center justify-center rounded-full border border-white mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", opacity: overTextInput ? 0 : 1 }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      {label && (
        <span className="text-[10px] font-semibold tracking-wider text-white uppercase">
          {label}
        </span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
