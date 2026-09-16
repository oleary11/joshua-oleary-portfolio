import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { celebrate } from "../utils/confetti";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const initialForm = { name: "", email: "", message: "", company: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const submitBtnRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        // Non-JSON response (e.g. a network/host error) — fall through to the generic message below.
      }

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("success");
      setForm(initialForm);
      celebrate(submitBtnRef.current);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please email me directly instead.");
    }
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 items-stretch">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 py-10 px-8 sm:px-12 rounded-2xl shadow-lg"
      >
        <p className={styles.sectionSubText}>Drop me a line.</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-secondary text-[14px]">Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="bg-tertiary py-3 px-4 rounded-lg text-white placeholder:text-secondary/60 outline-none border border-white/10 focus:border-white/30 transition-colors"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-secondary text-[14px]">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="bg-tertiary py-3 px-4 rounded-lg text-white placeholder:text-secondary/60 outline-none border border-white/10 focus:border-white/30 transition-colors"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-secondary text-[14px]">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="What's on your mind?"
              className="bg-tertiary py-3 px-4 rounded-lg text-white placeholder:text-secondary/60 outline-none border border-white/10 focus:border-white/30 transition-colors resize-none"
            />
          </label>

          {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
          <label className="absolute w-px h-px overflow-hidden opacity-0 -z-10" aria-hidden="true">
            Company
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <button
            ref={submitBtnRef}
            type="submit"
            disabled={status === "sending"}
            className="mt-2 bg-tertiary hover:bg-white/10 disabled:opacity-60 disabled:cursor-not-allowed py-3 px-6 rounded-lg text-white font-medium border border-white/10 transition-colors self-start"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          {status === "success" && (
            <p className="text-[14px] text-secondary">Thanks — got it. I&apos;ll get back to you soon.</p>
          )}
          {status === "error" && (
            <p className="text-[14px] text-secondary">
              {errorMessage}{" "}
              <a href="mailto:contact@olearyhouse.com" className="text-white underline">
                Email me directly
              </a>
              .
            </p>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-3">
          <a href="mailto:contact@olearyhouse.com" className="flex items-center gap-2 text-secondary hover:text-white transition-colors">
            <MdOutlineMail className="text-xl" />
            <span className="text-[14px]">contact@olearyhouse.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/joshua-oleary/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
          >
            <FaLinkedin className="text-xl" />
            <span className="text-[14px]">Joshua O&apos;Leary</span>
          </a>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-[650px] md:h-[500px] h-[400px]"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
