import { BrowserRouter } from "react-router-dom";
import {Hero,About,Contact,Experience,Navbar,Tech,Works,StarsCanvas} from "./components";


function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center pt-32 md:p-0 mb-2">
          <Navbar />
          <Hero /> 
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
