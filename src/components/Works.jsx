import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant, easeOut } from "../utils/motion";

const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags.map((t) => t.name)))];

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_link,
}) => {
  const primaryLink = live_link || source_code_link;

  const openLink = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: easeOut }}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-white/5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#5B7A99]/40 hover:shadow-[0px_20px_60px_-15px_rgba(91,122,153,0.35)]"
    >
      <div
        className={`relative w-full h-[230px] overflow-hidden rounded-2xl group ${primaryLink ? "cursor-pointer" : ""}`}
        data-cursor={primaryLink ? "View" : undefined}
        onClick={primaryLink ? (e) => openLink(e, primaryLink) : undefined}
      >
        {image ? (
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-[#1C2430] rounded-2xl flex items-center justify-center">
            <span className="text-secondary text-sm">No preview</span>
          </div>
        )}

        <div className="absolute inset-0 flex justify-end gap-2 m-3 card-img_hover">
          {source_code_link && (
            <div
              onClick={(e) => openLink(e, source_code_link)}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-all duration-300"
              title="View source code"
            >
              <FaGithub className="text-white w-5 h-5" />
            </div>
          )}
          {live_link && (
            <div
              onClick={(e) => openLink(e, live_link)}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-all duration-300"
              title="View live site"
            >
              <FaExternalLinkAlt className="text-white w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-secondary text-[14px]">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={`${name}-${tag.name}`}
            className="text-[12px] font-medium px-3 py-1 rounded-full border border-[#5B7A99]/25 bg-[#5B7A99]/10 text-[#B8C4D0]"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Works = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.tags.some((t) => t.name === activeFilter));

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </motion.p>
      </div>

      {/* Filter buttons */}
      <div className="mt-10 flex flex-wrap gap-3">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-200 ${
              activeFilter === tag
                ? "bg-[#5B7A99] text-white"
                : "bg-[#1C2430] text-secondary hover:text-white border border-white/10"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-7">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard index={index} {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");