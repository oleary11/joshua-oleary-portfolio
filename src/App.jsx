import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Hero, About, Contact, Experience, Navbar, Tech, Works,
  Education, ScrollProgressBar, BackToTop,
  CustomCursor, Loader, StarsCanvas,
} from "./components";

function App() {
  const [appReady, setAppReady] = useState(false);

  return (
    <BrowserRouter>
      <CustomCursor />
      <ScrollProgressBar />
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
        <Experience />
        <Education />
        <Tech />
        <Works />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </motion.div>

      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
