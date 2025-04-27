import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { techImages } from "../assets/tech";
import useMeasure from "react-use-measure";

const Tech = () => {
  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
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

  return (
    <div className="relative pb-36 overflow-hidden mb-12">
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
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Tech;

const Card = ({ image, idx, hoveredIndex, setHoveredIndex }) => {
  const offset = hoveredIndex !== null ? Math.abs(idx - hoveredIndex) : null;

  let lift = 0;
  if (offset === 0) lift = -20;
  else if (offset === 1) lift = -10;
  else if (offset === 2) lift = -5;

  return (
    <motion.div
      className="relative h-[120px] min-w-[100px] flex justify-center items-center"
      animate={{ y: lift }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHoveredIndex(idx)}
      onHoverEnd={() => setHoveredIndex(null)}
    >
      <img
        src={image}
        alt="Skill"
        className="w-[80px] h-[80px] object-contain"
      />
    </motion.div>
  );
};