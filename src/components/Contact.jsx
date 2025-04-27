import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 py-10 px-12 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <div className="mt-8 flex flex-col gap-6">
          <div>
            <p className="text-secondary">Name:</p>
            <p className="text-white font-medium">Joshua O'Leary</p>
          </div>
          <div>
            <p className="text-secondary">Phone:</p>
            <p className="text-white font-medium">(303) 525-7762</p>
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");