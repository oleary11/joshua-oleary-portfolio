import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { techImages } from "../assets/tech";
import useMeasure from "react-use-measure";

const Tech = () => {
  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [draggingCount, setDraggingCount] = useState(0);

  useEffect(() => {
    if (!width) return;
    const finalPosition = -width / 2 - 8;
    const controls = animate(xTranslation, [0, finalPosition], {
      repeat: Infinity,
      duration: 35,
      ease: "linear",
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);

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
            parentX={xTranslation}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Tech;

const Card = ({ image, idx, hoveredIndex, setHoveredIndex, onDragStateChange, parentX }) => {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isDraggingRef = useRef(false);
  const grabParentXRef = useRef(0);
  const dragBaseRef = useRef({ x: 0, y: 0 });
  const unsubscribeRef = useRef(null);

  const offset = hoveredIndex !== null ? Math.abs(idx - hoveredIndex) : null;

  let lift = 0;
  if (offset === 0) lift = -20;
  else if (offset === 1) lift = -10;
  else if (offset === 2) lift = -5;

  // The belt keeps scrolling the whole time — grabbing an icon shouldn't
  // pause it, it should detach just that one icon from it. On press,
  // snapshot the belt's current position and continuously counter-offset
  // this card's own x by exactly how far the belt has moved since, so its
  // on-screen spot stays put under a still pointer.
  const handlePointerDown = () => {
    onDragStateChange(true);
    isDraggingRef.current = false;
    grabParentXRef.current = parentX.get();
    unsubscribeRef.current = parentX.on("change", (latestParentX) => {
      if (!isDraggingRef.current) {
        const compensatedX = grabParentXRef.current - latestParentX;
        x.set(compensatedX);
        // Keep this current the whole time it's held so that if framer's
        // first onDrag call for this gesture fires before its own
        // onDragStart does (it does — confirmed empirically), the base it
        // reads is already correct instead of the stale {x:0,y:0} default,
        // which was causing a permanent offset jump right as dragging began.
        dragBaseRef.current = { x: compensatedX, y: y.get() };
      }
    });
  };

  const releaseCompensation = () => {
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
  };

  const handlePointerUp = () => {
    onDragStateChange(false);
    if (!isDraggingRef.current) {
      releaseCompensation();
      animate(x, 0, { type: "spring", stiffness: 300, damping: 26 });
    }
  };

  // Once a real drag starts, stop trusting framer's automatic style-binding
  // for position entirely and drive x/y explicitly from the drag's own
  // cumulative offset each frame (onDrag) — this is the one signal framer
  // guarantees is in sync with its own gesture recognition, so there's no
  // handoff window where the belt-compensation subscription and framer's
  // internal drag handling can both be writing to x on the same frame
  // (which showed up as the icon drifting back toward the belt right after
  // you started actively moving it).
  const handleDragStart = () => {
    isDraggingRef.current = true;
    releaseCompensation();
    dragBaseRef.current = { x: x.get(), y: y.get() };
    setIsDragging(true);
  };

  const handleDrag = (event, info) => {
    x.set(dragBaseRef.current.x + info.offset.x);
    y.set(dragBaseRef.current.y + info.offset.y);
  };

  const handleDragEnd = (event, info) => {
    isDraggingRef.current = false;
    setIsDragging(false);
    onDragStateChange(false);
    // Springs back to 0 — i.e. rejoins the belt's current flow, not the
    // absolute spot it was originally grabbed from (the belt moved on).
    animate(x, 0, { type: "spring", velocity: info.velocity.x, stiffness: 200, damping: 12, mass: 0.6 });
    animate(y, 0, { type: "spring", velocity: info.velocity.y, stiffness: 200, damping: 12, mass: 0.6 });
  };

  useEffect(() => releaseCompensation, []);

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
      onDrag={handleDrag}
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
