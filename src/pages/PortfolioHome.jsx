import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

import {
  Hero, About, Contact, Experience, Navbar, Tech, Works,
  Education, RecentBlogs, StarsCanvas, Loader, GitHubStats,
} from "../components";

const PortfolioHome = () => {
  const [appReady, setAppReady] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    // Belt-and-suspenders: Lenis intercepts wheel/touch itself (stopped via
    // lenis.stop()), and body overflow blocks native scrollbar dragging too.
    document.body.style.overflow = appReady ? "" : "hidden";
    if (appReady) lenis?.start();
    else lenis?.stop();
    return () => {
      document.body.style.overflow = "";
    };
  }, [appReady, lenis]);

  return (
    <>
      <Loader onComplete={() => setAppReady(true)} />
      <motion.div
        className="relative z-0 bg-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: appReady ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center pt-32 md:p-0 mb-2">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Works />
        <Experience />
        <Education />
        <Tech />
        <GitHubStats />
        <RecentBlogs />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </motion.div>
    </>
  );
};

export default PortfolioHome;
