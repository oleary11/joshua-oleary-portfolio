import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import myimg from "../assets/myimg.png";
import { resume } from "../assets";
import { easeOut } from "../utils/motion";

const Hero = () => {
  const wrapperRef = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), springConfig);

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <section className="relative md:h-dvh min-h-[600px] flex-col-reverse flex md:flex-row items-center justify-between pt-[60px] z-10 mx-[10%]">
      {/* Left Side: Text */}
      <div className="content flex-col items-center md:items-start z-10 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
          className="title text-5xl md:text-7xl font-extrabold mb-[33px] font-roboto bg-text-gradient bg-clip-text text-fill-transparent"
        >
          Hi, I&apos;m Joshua O&apos;Leary.
          <br />
          Software Engineer.
        </motion.h1>

        {/* Paragraph Fade In */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: easeOut }}
          className="text-2xl md:text-3xl font-roboto mb-[52px]"
        >
          I'm passionate about building scalable systems, intuitive applications, and elegant digital experiences.
        </motion.p>

        {/* Buttons Fade In */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.7, ease: easeOut }}
        >
          <a
            href="mailto:joshuao020701@gmail.com"
            data-cursor="Email"
            className="bg-[#4A6D8C] text-white no-underline rounded-[100px] font-semibold px-8 py-4 inline-block hover:bg-[#3D5A73] transition-colors duration-200"
          >
            Contact Me
          </a>
          <a
            href={resume}
            download="Joshua_OLeary_Resume.pdf"
            data-cursor="Resume"
            className="border-2 border-[#4A6D8C] text-white no-underline rounded-[100px] font-semibold px-8 py-4 inline-block hover:bg-[#4A6D8C] transition-colors duration-200"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Right Side: Image */}
      <div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="md:min-w-1/2 mb-4 ml-2"
        style={{ perspective: 800 }}
      >
        <motion.img
          src={myimg}
          alt="Profile picture of Joshua O'Leary"
          className="h-[150px] md:min-h-[350px] w-full rounded-full z-10 object-cover"
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: easeOut }}
        />
      </div>
    </section>
  );
};

export default Hero;
