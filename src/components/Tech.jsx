/* eslint-disable react/prop-types */

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, } from "react";
import { techImages } from "../assets/tech";
import useMeasure from "react-use-measure";


const Tech = () => {
  let [ref, { width }] = useMeasure();
  
  const xTranslation = useMotionValue(0);
  useEffect(() => {
    let controls;
    const finalPosition = -width /2 -8;
    controls = animate(xTranslation, [0, finalPosition], {
      repeat: Infinity,
      duration: 25,
      ease: "linear",
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);
  return (
    <div
       className="relative pb-24 overflow-hidden  mb-12"
    >
      <h2 className="my-20 text-center text-4xl">Skills</h2>
    <motion.div
      className="absolute left-0 flex gap-4 items-center whitespace-nowrap justify-center overflow-hidden "
      style={{ x: xTranslation }}
      ref={ref}
    
    >
      {[...techImages,...techImages].map((img, idx) => (
        <Card key={idx} image={img} />
      ))}
    </motion.div>
    </div>
    
  );
};

export default Tech;

const Card = ({ image }) => {
  return (
    <div className="relative h-[100px] min-w-[100px] overflow-hidden rounded-xl flex justify-center items-center">
      <img src={image} alt="Skills" className="w-[100px] h-[100px] object-contain rounded-2xl p-4" />
    </div>
  );
};
