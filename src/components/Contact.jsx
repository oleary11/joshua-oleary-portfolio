import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden items-center">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 py-10 px-12 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer"
      >
        <motion.p
          className={styles.sectionSubText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Get in touch
        </motion.p>

        <motion.h3
          className={styles.sectionHeadText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Contact.
        </motion.h3>

        <div className="mt-8 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-secondary">Name:</p>
            <p className="text-white font-medium">Joshua O'Leary</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-secondary">Phone:</p>
            <p className="text-white font-medium">(303) 525-7762</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <p className="text-secondary">Email:</p>
            <div className="flex items-center mt-1">
              <MdOutlineMail className="text-2xl" />
              <a
                href="mailto:joshuao020701@gmail.com"
                className="ml-3 text-white font-medium hover:underline"
              >
                joshuao020701@gmail.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-secondary">LinkedIn:</p>
            <div className="flex items-center mt-1">
              <FaLinkedin className="text-2xl text-blue-600" />
              <a
                href="https://www.linkedin.com/in/joshua-oleary/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 text-white font-medium hover:underline"
              >
                Joshua O'Leary
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-[650px] md:h-[500px] h-[400px]"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");