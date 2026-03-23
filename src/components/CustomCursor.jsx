import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const ref = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 14}px, ${e.clientY - 14}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{ transform: "translate(-100px, -100px)" }}
    >
      <div className="w-7 h-7 rounded-full bg-[#915EFF] opacity-50 blur-[6px]" />
    </div>
  );
};

export default CustomCursor;
