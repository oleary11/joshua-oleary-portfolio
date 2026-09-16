import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { techImages } from "../assets/tech";
import useMeasure from "react-use-measure";

const Tech = () => {
  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [draggingCount, setDraggingCount] = useState(0);
  const controlsRef = useRef(null);

  useEffect(() => {
    // Freeze the belt the instant a card is grabbed (draggingCount > 0) so a
    // held icon disengages immediately instead of still sliding with the
    // conveyor underneath the pointer. Resuming rebases the loop to wherever
    // it was frozen (not back to 0) — seamless either way since the content
    // is duplicated, so any starting offset loops cleanly.
    if (draggingCount > 0 || !width) {
      controlsRef.current?.stop();
      return;
    }

    const from = xTranslation.get();
    const distance = width / 2 + 8;
    controlsRef.current = animate(xTranslation, [from, from - distance], {
      repeat: Infinity,
      duration: 35,
      ease: "linear",
      repeatType: "loop",
      repeatDelay: 0,
    });

    return () => controlsRef.current?.stop();
  }, [xTranslation, width, draggingCount]);

  const handleDragStateChange = (dragging) => {
    setDraggingCount((c) => Math.max(0, c + (dragging ? 1 : -1)));
  };

  return (
    <div className={`relative pb-36 mb-12 ${draggingCount > 0 ? "overflow-visible" : "overflow-hidden"}`}>
      <h2 className="my-20 text-center text-4xl font-bold">Skills</h2>

      <motion.div
        className="absolute left-0 flex gap-12 items-center whitespace-nowrap justify-center overflow-visible"
        style={{ x: xTranslation }}
        ref={ref}
      >
        {[...techImages, ...techImages].map((img, idx) => (
          <Card
            key={idx}
            image={img}
            idx={idx}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            onDragStateChange={handleDragStateChange}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Tech;

const Card = ({ image, idx, hoveredIndex, setHoveredIndex, onDragStateChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const offset = hoveredIndex !== null ? Math.abs(idx - hoveredIndex) : null;

  let lift = 0;
  if (offset === 0) lift = -20;
  else if (offset === 1) lift = -10;
  else if (offset === 2) lift = -5;

  // framer-motion's own onDragStart only fires after the pointer crosses a
  // small movement threshold — freezing the belt on that event still lets it
  // slide for the first few pixels of a hold. Freeze immediately on the raw
  // pointer press instead, and resume on release regardless of whether an
  // actual drag ever happened (a plain click never reaches onDragStart at
  // all, so it needs its own resume path). onDragStateChange's counter is
  // clamped at 0, so a release firing both onPointerUp and onDragEnd for the
  // same gesture is harmless.
  const handlePointerDown = () => onDragStateChange(true);
  const handlePointerUp = () => onDragStateChange(false);

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    onDragStateChange(false);
    animate(x, 0, { type: "spring", velocity: info.velocity.x, stiffness: 200, damping: 12, mass: 0.6 });
    animate(y, 0, { type: "spring", velocity: info.velocity.y, stiffness: 200, damping: 12, mass: 0.6 });
  };

  return (
    <motion.div
      className="relative h-[130px] w-[110px] flex justify-center items-center cursor-grab active:cursor-grabbing touch-none"
      style={{ x, y }}
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.15, zIndex: 50 }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={!isDragging ? { y: lift } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHoveredIndex(idx)}
      onHoverEnd={() => setHoveredIndex(null)}
    >
      <div className="w-[92px] h-[92px] rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
        <img
          src={image}
          alt="Skill"
          draggable={false}
          className="w-[56px] h-[56px] object-contain pointer-events-none"
        />
      </div>
    </motion.div>
  );
};