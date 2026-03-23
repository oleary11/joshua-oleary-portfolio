import { motion } from "framer-motion";
import { styles } from "../styles";
import { education } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const Education = () => {
  const { school, location, degree, date, courses, certifications, awards, leadership } = education;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Where I studied</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>

      {/* Degree Card */}
      <motion.div
        variants={fadeIn("up", "spring", 0.1, 0.75)}
        className="mt-10 bg-[#1d1836] rounded-2xl p-8 shadow-lg border border-white/5"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h3 className="text-white text-[24px] font-bold">{school}</h3>
            <p className="text-[#915EFF] text-[16px] font-semibold mt-1">{degree}</p>
            <p className="text-secondary text-[14px] mt-1">{location}</p>
          </div>
          <span className="text-secondary text-[14px] font-medium whitespace-nowrap">{date}</span>
        </div>

        {/* Courses */}
        <div className="mt-6">
          <p className="text-white text-[15px] font-semibold mb-3">Relevant Coursework</p>
          <div className="flex flex-wrap gap-2">
            {courses.map((course) => (
              <span
                key={course}
                className="bg-[#915EFF]/20 text-[#915EFF] text-[13px] px-3 py-1 rounded-full border border-[#915EFF]/30"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom three columns */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Certifications */}
        <motion.div
          variants={fadeIn("up", "spring", 0.2, 0.75)}
          className="bg-[#1d1836] rounded-2xl p-6 shadow-lg border border-white/5"
        >
          <h4 className="text-white font-bold text-[16px] mb-4">Certifications</h4>
          <ul className="space-y-3">
            {certifications.map((cert) => (
              <li key={cert.title}>
                <p className="text-white text-[14px] font-medium">{cert.title}</p>
                <p className="text-secondary text-[12px]">{cert.org}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Awards */}
        <motion.div
          variants={fadeIn("up", "spring", 0.3, 0.75)}
          className="bg-[#1d1836] rounded-2xl p-6 shadow-lg border border-white/5"
        >
          <h4 className="text-white font-bold text-[16px] mb-4">Awards</h4>
          <ul className="space-y-3">
            {awards.map((award) => (
              <li key={award.title}>
                <p className="text-white text-[14px] font-medium">{award.title}</p>
                <p className="text-secondary text-[12px]">{award.org}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Leadership */}
        <motion.div
          variants={fadeIn("up", "spring", 0.4, 0.75)}
          className="bg-[#1d1836] rounded-2xl p-6 shadow-lg border border-white/5"
        >
          <h4 className="text-white font-bold text-[16px] mb-4">Leadership</h4>
          <ul className="space-y-3">
            {leadership.map((role) => (
              <li key={role.title}>
                <p className="text-white text-[14px] font-medium">{role.title}</p>
                <p className="text-secondary text-[12px]">{role.org}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
