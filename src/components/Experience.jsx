import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, easeOut } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: easeOut }}
    className="relative pl-16 md:pl-20 pb-14 last:pb-0"
  >
    <div className="absolute left-0 top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1C2430] border border-[#5B7A99]/40 flex items-center justify-center z-10">
      <img
        src={experience.icon}
        alt={experience.company_name}
        className="w-5 h-5 md:w-6 md:h-6 object-contain"
      />
    </div>

    <div className="bg-[#1C2430] rounded-2xl p-6 shadow-lg border border-white/5">
      <span className="text-[#5B7A99] text-[13px] font-semibold uppercase tracking-wide">
        {experience.date}
      </span>
      <h3 className="text-white text-[22px] font-bold mt-1">{experience.title}</h3>
      <p className="text-secondary text-[15px] font-medium">{experience.company_name}</p>

      <ul className="mt-4 list-disc ml-5 space-y-2">
        {experience.points.map((point, i) => (
          <li key={i} className="text-white-100 text-[14px] pl-1 tracking-wider">
            {point}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div ref={containerRef} className="relative mt-16">
        <div className="absolute left-5 md:left-6 top-2 bottom-2 w-[2px] bg-white/10" />
        <motion.div
          className="absolute left-5 md:left-6 top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-[#5B7A99] to-[#4A6D8C]"
          style={{ scaleY: scrollYProgress }}
        />

        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.company_name} experience={experience} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
