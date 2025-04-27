import { motion } from "framer-motion";
import { styles } from "../styles";
import myimg from "../assets/myimg.png";
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section className="relative md:h-dvh min-h-[600px] flex-col-reverse flex md:flex-row items-center justify-between pt-[60px] z-10 mx-[10%]">
      
      {/* Left Side: Text */}
      <div className="content flex-col items-center md:items-start z-10 text-white">
        
        {/* Typing Animation for Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="title text-5xl md:text-7xl font-extrabold mb-[33px] font-roboto bg-text-gradient bg-clip-text text-fill-transparent">
            <TypeAnimation
              sequence={[
                "Hi, I'm Joshua O'Leary",
                2000, // stay for 2 seconds
                "I'm a Software Engineer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
        </motion.div>

        {/* Paragraph Fade In */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-2xl md:text-3xl font-roboto mb-[52px]"
        >
          I'm passionate about building scalable systems, intuitive applications, and elegant digital experiences.
        </motion.p>

        {/* Button Fade In */}
        <motion.a
          href="mailto:joshuao020701@gmail.com"
          className="bg-[#576cbc] text-white no-underline rounded-[100px] font-semibold px-8 py-4 inline-block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Contact Me
        </motion.a>
      </div>

      {/* Right Side: Image */}
      <motion.img
        src={myimg}
        alt="Profile picture of Joshua O'Leary"
        className="md:min-w-1/2 h-[150px] md:min-h-[350px] rounded-full z-10 mb-4 ml-2 object-cover"
        initial={{ scale: 0.95 }}
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </section>
  );
};

export default Hero;
