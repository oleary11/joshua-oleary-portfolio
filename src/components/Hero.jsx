
import myimg from "../assets/myimg.png";
const Hero = () => {
  return (
    <section className="relative md:h-dvh min-h-[600px] flex-col-reverse flex md:flex-row items-center justify-between pt-[60px] z-10 mx-[10%]">
      <div className="content flex-col items-center md:items-start z-10 text-white">
        <h1 className="title text-5xl md:text-7xl font-extrabold mb-[33px] font-roboto bg-text-gradient bg-clip-text text-fill-transparent">
          {"Hi, I'm Ekagra Gupta"}
        </h1>
        <p className="text-2xl md:text-3xl font-roboto mb-[52px]">
          {"I'm"} a full-stack developer.I specialize in building web applications and software that
          provide high-quality and elegant digital experiences.
        </p>
        <a
          href="mailto:myemail@email.com"
          className="bg-[#576cbc] text-white no-underline rounded-[100px] font-semibold px-4 py-6 "
        >
          Contact Me
        </a>
      </div>
          <img
          src={myimg}
          alt="Hero image of me"
          className="md:min-w-1/2 h-[150px] md:min-h-[350px] rounded-full animate-bounce2 z-10 mb-4 ml-2"
        />
    </section>
  );
};

export default Hero;
