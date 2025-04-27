import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: [50, -10, 0], opacity: 1 }}
      transition={{
        duration: 1,
        delay: index * 0.2,
        type: "spring",
        stiffness: 120,
      }}
      className="xs:w-[250px] w-full"
    >
      <Tilt
        tiltMaxAngleX={20}
        tiltMaxAngleY={20}
        scale={1.05}
        transitionSpeed={1500}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col animate-float">
          <img
            src={icon}
            alt="service-icon"
            className="w-16 h-16 object-contain"
          />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </Tilt>
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
        I'm a software engineer with professional experience building web applications, automating network systems, and solving real-world problems. 
        I specialize in C#, Python, JavaScript, SQL, and modern frameworks like .NET, Node.js, and Flask. 
        I'm passionate about developing scalable, high-quality software solutions and collaborating closely with teams to deliver exceptional results. 
        Let's work together to turn your ideas into reality!
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