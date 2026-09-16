import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeOut } from "../utils/motion";

const Loader = ({ onComplete }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="fixed inset-0 z-[9999] bg-[#050816] flex flex-col items-center justify-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="text-4xl md:text-5xl font-extrabold font-roboto text-white tracking-tight"
          >
            Joshua O'Leary
          </motion.h1>

          <motion.div
            className="h-[2px] mt-6 rounded-full bg-[#5B7A99] origin-left"
            initial={{ scaleX: 0, width: "220px" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: easeOut }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
