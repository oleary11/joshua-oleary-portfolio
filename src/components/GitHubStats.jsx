import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, easeOut } from "../utils/motion";

const GITHUB_USERNAME = "oleary11";
const CACHE_KEY = "gh-stats";
const CACHE_TTL_MS = 60 * 60 * 1000;

const Stat = ({ target, label, inView }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  const [display, setDisplay] = useState("—");

  useEffect(() => {
    if (!inView || target == null) return;
    // A target of exactly 0 means count (already 0) never fires a "change"
    // event, so the initial "—" placeholder would never get replaced.
    if (target === 0) {
      setDisplay("0");
      return;
    }
    const controls = animate(count, target, { duration: 1.5, ease: easeOut });
    const unsubscribe = rounded.on("change", setDisplay);
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, target, count, rounded]);

  return (
    <div className="text-center">
      <p className="text-4xl sm:text-5xl font-bold text-white">{target == null ? "—" : display}</p>
      <p className="text-secondary text-[13px] uppercase tracking-wider mt-2">{label}</p>
    </div>
  );
};

const StatsImage = ({ src, alt }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="rounded-xl max-w-full"
    />
  );
};

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("idle");
  // Always-mounted, real-size wrapper — the fetch trigger below. A
  // conditionally-swapped zero-height placeholder here would make
  // useInView's area-based threshold (amount: 0.4) never satisfy.
  const statsRef = useRef(null);
  const inView = useInView(statsRef, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!inView) return;

    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL_MS) {
          setStats(data);
          setStatus("success");
          return;
        }
      } catch {
        // ignore malformed cache, fall through to a fresh fetch
      }
    }

    setStatus("loading");
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data) => {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
        setStats(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [inView]);

  const yearsOnGithub =
    stats?.created_at != null
      ? Math.floor((Date.now() - new Date(stats.created_at)) / (365.25 * 24 * 60 * 60 * 1000))
      : null;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Open source activity</p>
        <h2 className={styles.sectionHeadText}>Always Building.</h2>
      </motion.div>

      <motion.div
        ref={statsRef}
        variants={fadeIn("up", "spring", 0.1, 0.75)}
        className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl min-h-[88px]"
      >
        {status === "success" && (
          <>
            <Stat target={stats.public_repos} label="Public Repos" inView={inView} />
            <Stat target={stats.followers} label="Followers" inView={inView} />
            <Stat target={yearsOnGithub} label="Years on GitHub" inView={inView} />
          </>
        )}
      </motion.div>

      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.75)}
        className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap"
      >
        <StatsImage
          src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=1C2430&title_color=5B7A99&icon_color=5B7A99&text_color=9AA3B0`}
          alt="GitHub Stats"
        />
        <StatsImage
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=tokyonight&hide_border=true&bg_color=1C2430&title_color=5B7A99&text_color=9AA3B0&langs_count=8`}
          alt="Top Languages"
        />
      </motion.div>
    </>
  );
};

export default SectionWrapper(GitHubStats, "");
