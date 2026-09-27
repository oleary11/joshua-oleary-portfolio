import { useEffect, useState } from "react";
import Desktop from "./Desktop";
import Phone from "./Phone";
import { featured } from "./data";
import "./os.css";

const QUERY = "(min-width: 1024px) and (min-height: 640px)";

const OSHome = () => {
  const [desktop, setDesktop] = useState(() => window.matchMedia(QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const on = () => setDesktop(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <>
      {desktop ? <Desktop /> : <Phone />}
      {/* Plain-text summary for search engines and screen readers */}
      <section className="sr-only" aria-label="Summary">
        <h2>Joshua O&apos;Leary, software engineer in Phoenix, Arizona</h2>
        <ul>
          {featured.map((p) => (
            <li key={p.id}>
              <a href={p.link.href}>{p.name}</a>: {p.tagline} {p.problem}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default OSHome;
