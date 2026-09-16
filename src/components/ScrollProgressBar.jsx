import { useScroll, useSpring, motion } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
      style={{
        scaleX,
        background: "linear-gradient(to right, #5B7A99, #4A6D8C)",
      }}
    />
  );
};

export default ScrollProgressBar;
