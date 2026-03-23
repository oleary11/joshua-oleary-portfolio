import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const GitHubStats = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Open source activity</p>
        <h2 className={styles.sectionHeadText}>GitHub Stats.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.75)}
        className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap"
      >
        <img
          src="https://github-readme-stats.vercel.app/api?username=oleary11&show_icons=true&theme=tokyonight&hide_border=true&bg_color=1d1836&title_color=915EFF&icon_color=915EFF&text_color=aaa6c3"
          alt="GitHub Stats"
          className="rounded-xl max-w-full"
        />
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=oleary11&layout=compact&theme=tokyonight&hide_border=true&bg_color=1d1836&title_color=915EFF&text_color=aaa6c3&langs_count=8"
          alt="Top Languages"
          className="rounded-xl max-w-full"
        />
      </motion.div>
    </>
  );
};

export default SectionWrapper(GitHubStats, "");
