import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, easeOut } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }}
      className="xs:w-[250px] w-full group"
    >
      <div className="w-full h-full rounded-[20px] p-[1px] bg-gradient-to-b from-white/10 to-transparent transition-all duration-500 group-hover:from-[#5B7A99]/60 group-hover:to-[#5B7A99]/5">
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col transition-transform duration-500 group-hover:-translate-y-1.5">
          <img
            src={icon}
            alt="service-icon"
            className="w-16 h-16 object-contain transition-transform duration-500 group-hover:scale-110"
          />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="mt-4">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a software engineer who builds scalable web and mobile applications — from production features on a nationwide EdTech
        platform to full-stack products I've designed, built, and shipped end-to-end for real businesses.
        I work primarily in C#, TypeScript, and Python, with frameworks like .NET, React, React Native, and Node.js, and I'm just as
        comfortable joining an existing team as I am owning a project from idea to launch.
        Take a look at some of what I've built below — and let's talk about what you're working on.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");