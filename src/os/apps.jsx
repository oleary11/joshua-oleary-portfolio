import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import myimg from "../assets/myimg.png";
import { resume } from "../assets";
import { experiences, education, technologies, projects as allProjects } from "../constants";
import { fetchPosts } from "../lib/posts";
import { celebrate } from "../utils/confetti";
import { bio, featured, GITHUB_USERNAME, EMAIL, LINKEDIN } from "./data";
import { runCommand } from "./terminal";

const Tag = ({ children }) => (
  <span className="rounded-full border border-[var(--os-accent)]/40 bg-[var(--os-accent-soft)] px-3 py-1 text-[12px] font-semibold text-[#ffd7bf]">
    {children}
  </span>
);

const Button = ({ href, children, download, onClick, primary = true }) => {
  const cls = primary
    ? "bg-[var(--os-accent)] text-white hover:bg-[#c4531f]"
    : "border border-[var(--os-line)] text-[var(--os-text)] hover:bg-white/10";
  const inner = <span className="inline-flex items-center gap-2">{children}</span>;
  if (href)
    return (
      <a
        href={href}
        download={download}
        onClick={download ? (e) => celebrate(e.currentTarget) : onClick}
        target={download || href.startsWith("mailto") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={`${cls} inline-flex min-h-11 items-center rounded-full px-5 text-[14px] font-bold transition-colors`}
      >
        {inner}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={`${cls} inline-flex min-h-11 items-center rounded-full px-5 text-[14px] font-bold transition-colors`}>
      {inner}
    </button>
  );
};

/* ---------- Project case study ---------- */

const TABS = ["Overview", "The problem", "What I built"];

export const ProjectApp = ({ id }) => {
  const p = featured.find((f) => f.id === id);
  const [tab, setTab] = useState(0);
  return (
    <div className="flex h-full flex-col">
      <nav aria-label={`${p.name} sections`} className="flex gap-1 border-b border-[var(--os-line)] px-4 pt-2">
        {TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(i)}
            aria-pressed={tab === i}
            className={`-mb-px min-h-10 border-b-2 px-3 text-[13px] font-semibold transition-colors ${
              tab === i ? "border-[var(--os-accent)] text-[var(--os-text)]" : "border-transparent text-[var(--os-faint)] hover:text-[var(--os-muted)]"
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className="flex-1 p-5 sm:p-6">
        {tab === 0 && (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <img src={p.icon} alt="" className="h-12 w-12 rounded-xl object-cover" style={{ background: p.tint }} />
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight">{p.name}</h2>
                  <p className="text-[13px] text-[var(--os-faint)]">{p.kind}</p>
                </div>
              </div>
              <p className="mt-4 text-xl leading-snug font-bold">{p.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <div className="mt-6">
                <Button href={p.link.href}>
                  {p.link.label} <FiArrowUpRight />
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-black/20">
              <img
                src={p.image}
                alt={p.imageAlt}
                loading="lazy"
                className={`w-full ${p.id === "tally" ? "mx-auto max-h-64 w-auto object-contain p-6" : "object-cover object-top"}`}
              />
            </div>
          </div>
        )}
        {tab === 1 && (
          <div className="max-w-xl">
            <h3 className="text-[13px] font-bold tracking-[0.14em] text-[#ffb892] uppercase">The problem</h3>
            <p className="mt-3 text-lg leading-relaxed text-[var(--os-muted)]">{p.problem}</p>
            {p.note && <p className="mt-6 text-[15px] text-[var(--os-faint)]">{p.note}</p>}
          </div>
        )}
        {tab === 2 && (
          <div className="max-w-xl">
            <h3 className="text-[13px] font-bold tracking-[0.14em] text-[#ffb892] uppercase">What I built</h3>
            <ul className="mt-3 space-y-3">
              {p.built.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-[var(--os-muted)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--os-accent)]" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------- About ---------- */

export const AboutApp = () => (
  <div className="p-5 sm:p-6">
    <div className="flex items-center gap-4">
      <img src={myimg} alt="Joshua O'Leary" className="h-20 w-20 rounded-full object-cover ring-2 ring-[var(--os-accent)]/60" />
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Joshua O&apos;Leary</h2>
        <p className="text-[14px] text-[var(--os-faint)]">Software engineer · Phoenix, AZ</p>
      </div>
    </div>
    <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-[var(--os-muted)]">
      {bio.paragraphs.map((t) => (
        <p key={t}>{t}</p>
      ))}
    </div>
    <div className="mt-5 flex flex-wrap gap-3">
      <Button href={resume} download="Joshua_OLeary_Resume.pdf">
        <FiDownload /> Resume
      </Button>
      <Button href={`https://github.com/${GITHUB_USERNAME}`} primary={false}>
        <FiGithub /> GitHub
      </Button>
      <Button href={LINKEDIN} primary={false}>
        <FiLinkedin /> LinkedIn
      </Button>
    </div>

    <h3 className="mt-8 text-[13px] font-bold tracking-[0.14em] text-[#ffb892] uppercase">Experience</h3>
    <ol className="mt-3 space-y-4 border-l border-[var(--os-line)] pl-5">
      {experiences.map((e) => (
        <li key={e.company_name + e.title} className="relative">
          <span className="absolute top-2 -left-[25px] h-2.5 w-2.5 rounded-full bg-[var(--os-accent)]" aria-hidden="true" />
          <p className="font-bold">
            {e.title} <span className="font-medium text-[var(--os-faint)]">· {e.company_name}</span>
          </p>
          <p className="os-mono text-[12px] text-[var(--os-faint)]">{e.date}</p>
          <p className="mt-1 text-[14px] leading-relaxed text-[var(--os-muted)]">{e.points[0]}</p>
        </li>
      ))}
    </ol>

    <h3 className="mt-8 text-[13px] font-bold tracking-[0.14em] text-[#ffb892] uppercase">Education</h3>
    <p className="mt-2 font-bold">{education.school}</p>
    <p className="text-[14px] text-[var(--os-muted)]">
      {education.degree} · {education.date}
    </p>

    <h3 className="mt-8 text-[13px] font-bold tracking-[0.14em] text-[#ffb892] uppercase">Skills</h3>
    <div className="mt-3 flex flex-wrap gap-2">
      {technologies.map((t) => (
        <Tag key={t.name}>{t.name}</Tag>
      ))}
    </div>
  </div>
);

/* ---------- All projects folder ---------- */

const folderItems = () => {
  const extras = allProjects.filter(
    (p) => !featured.some((f) => f.name === p.name || (f.id === "dcw" && p.name === "Desert Candle Works"))
  );
  return [
    ...featured.map((f) => ({ key: f.id, name: f.name, blurb: f.tagline, image: f.image, tint: f.tint, contain: f.id === "tally" || f.id === "platrly", id: f.id })),
    ...extras.map((p) => ({ key: p.name, name: p.name, blurb: p.description, image: p.image, href: p.live_link || p.source_code_link })),
  ];
};

export const ProjectsFolderApp = ({ openApp }) => (
  <div className="grid gap-3 p-5 sm:grid-cols-2">
    {folderItems().map((p) => {
      const body = (
        <>
          <span className="block aspect-[16/10] overflow-hidden rounded-lg" style={{ background: p.tint ?? "#1b120c" }}>
            <img
              src={p.image}
              alt=""
              loading="lazy"
              className={`h-full w-full ${p.contain ? "object-contain p-3" : "object-cover object-top"} ${p.id === "tally" ? "p-6" : ""}`}
            />
          </span>
          <span className="mt-2 block font-bold">{p.name}</span>
          <span className="line-clamp-2 text-[13px] text-[var(--os-faint)]">{p.blurb}</span>
        </>
      );
      const cls = "rounded-xl bg-white/5 p-3 text-left transition-colors hover:bg-white/10";
      return p.id ? (
        <button key={p.key} type="button" onClick={() => openApp(p.id)} className={cls}>
          {body}
        </button>
      ) : (
        <a key={p.key} href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {body}
        </a>
      );
    })}
  </div>
);

/* ---------- Terminal ---------- */

export const TerminalApp = ({ ctx }) => {
  const [lines, setLines] = useState([
    { t: "out", v: "Welcome to josh-os. Type 'help' to see commands. Some are hidden." },
  ]);
  const [input, setInput] = useState("");
  const [past, setPast] = useState([]);
  const [idx, setIdx] = useState(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const v = input;
    if (!v.trim()) return;
    setPast((p) => [...p, v]);
    setIdx(null);
    setInput("");
    const out = runCommand(v, { ...ctx, clear: () => setLines([]), el: logRef.current });
    setLines((l) => [...l, { t: "in", v }, ...(out ?? []).map((o) => ({ t: "out", v: o }))]);
  };

  return (
    <div className="os-mono flex h-full flex-col bg-[#1a0f0a]/60 text-[13px]" onClick={() => inputRef.current?.focus()}>
      <div ref={logRef} role="log" aria-live="polite" className="os-scroll flex-1 space-y-1 overflow-y-auto p-4">
        {lines.map((l, i) =>
          l.t === "in" ? (
            <p key={i}>
              <span className="text-[#ff9a62]">visitor@josh-os</span>
              <span className="text-[var(--os-faint)]">:~$</span> {l.v}
            </p>
          ) : (
            <p key={i} className="whitespace-pre-wrap text-[var(--os-muted)]">
              {l.v}
            </p>
          )
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-[var(--os-line)] px-4 py-2">
        <span className="shrink-0 text-[#ff9a62]">~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            if (e.key === "ArrowUp" && past.length) {
              e.preventDefault();
              const n = idx === null ? past.length - 1 : Math.max(0, idx - 1);
              setIdx(n);
              setInput(past[n]);
            }
            if (e.key === "ArrowDown" && idx !== null) {
              e.preventDefault();
              const n = idx + 1;
              if (n >= past.length) {
                setIdx(null);
                setInput("");
              } else {
                setIdx(n);
                setInput(past[n]);
              }
            }
          }}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="none"
          aria-label="Terminal input"
          className="min-w-0 flex-1 bg-transparent text-[16px] text-[var(--os-text)] outline-none sm:text-[13px]"
        />
      </div>
    </div>
  );
};

/* ---------- GitHub ---------- */

export const GitHubApp = () => {
  const [pub, setPub] = useState(null);
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setPub)
      .catch(() => {});
    fetch("/api/github-stats")
      .then((r) => (r.ok ? r.json() : null))
      .then(setAuth)
      .catch(() => {});
  }, []);
  const years = pub?.created_at ? Math.floor((Date.now() - new Date(pub.created_at)) / 31557600000) : null;
  const stats = [
    { v: auth?.contributions, l: "contributions in the last year" },
    { v: auth?.totalRepos ?? pub?.public_repos, l: auth?.totalRepos != null ? "repositories" : "public repos" },
    { v: years, l: "years on GitHub" },
  ].filter((s) => s.v != null);

  return (
    <div className="p-5">
      <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="block rounded-lg bg-[#fff4e8] p-3">
        <img
          src={`https://ghchart.rshah.org/D9622B/${GITHUB_USERNAME}`}
          alt={`${GITHUB_USERNAME}'s GitHub contributions over the past year`}
          loading="lazy"
          className="w-full"
        />
      </a>
      <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-3">
        {stats.map((s) => (
          <p key={s.l}>
            <span className="block text-2xl font-extrabold">{Number(s.v).toLocaleString()}</span>
            <span className="text-[12px] text-[var(--os-faint)]">{s.l}</span>
          </p>
        ))}
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex min-h-11 items-center gap-1 text-[14px] font-semibold text-[#ffb892] hover:text-white"
        >
          More on GitHub <FiArrowUpRight />
        </a>
      </div>
    </div>
  );
};

/* ---------- Blog ---------- */

export const BlogApp = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    fetchPosts().then(({ data }) => setPosts(data ?? []));
  }, []);
  return (
    <div className="p-5">
      <ul className="space-y-2">
        {(posts ?? []).slice(0, 6).map((p) => (
          <li key={p.slug}>
            <Link to={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10">
              <p className="os-mono text-[11px] tracking-wide text-[#ffb892] uppercase">{p.category}</p>
              <p className="mt-1 font-bold">{p.title}</p>
              <p className="mt-1 text-[12px] text-[var(--os-faint)]">
                {p.date} · {p.readTime}
              </p>
            </Link>
          </li>
        ))}
        {posts === null && <li className="text-[var(--os-faint)]">Loading posts…</li>}
      </ul>
      <Link to="/blog" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-1 text-[14px] font-semibold text-[#ffb892] hover:text-white">
        All posts <FiArrowUpRight />
      </Link>
    </div>
  );
};

/* ---------- Contact ---------- */

export const ContactApp = ({ openApp }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");
  const btn = useRef(null);
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("success");
      setForm({ name: "", email: "", message: "", company: "" });
      celebrate(btn.current);
    } catch (x) {
      setStatus("error");
      setErr(x.message || "Something went wrong. Please email me directly instead.");
    }
  };
  const field = "w-full rounded-xl border border-[var(--os-line)] bg-black/20 px-3.5 py-2.5 text-[16px] text-[var(--os-text)] placeholder:text-[var(--os-faint)] focus:border-[var(--os-accent)] focus:outline-none";
  return (
    <form onSubmit={submit} className="space-y-3 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[13px] font-semibold">Name</span>
          <input name="name" value={form.name} onChange={set} required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-[13px] font-semibold">Email</span>
          <input name="email" type="email" value={form.email} onChange={set} required autoComplete="email" spellCheck={false} className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-[13px] font-semibold">Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={set}
          required
          rows={3}
          placeholder="Hiring, a project, or just saying hi…"
          className={`${field} resize-none`}
        />
      </label>
      <input name="company" value={form.company} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-wrap items-center gap-3">
        <button
          ref={btn}
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--os-accent)] px-6 text-[14px] font-bold text-white hover:bg-[#c4531f] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 min-w-0 items-center gap-2 truncate text-[13px] text-[var(--os-muted)] hover:text-white">
          <FiMail className="shrink-0" /> {EMAIL}
        </a>
      </div>
      <p aria-live="polite" className="text-[14px]">
        {status === "success" && <span className="text-[#9be6a8]">Thanks! I&apos;ll get back to you soon.</span>}
        {status === "error" && <span className="text-[#ffb4a2]">{err}</span>}
      </p>
      <p className="text-[12px] text-[var(--os-faint)]">
        I only use your details to reply to you.{" "}
        {openApp ? (
          <button type="button" onClick={() => openApp("privacy")} className="underline underline-offset-2 hover:text-white">
            privacy.txt
          </button>
        ) : null}
      </p>
    </form>
  );
};

/* ---------- Privacy note ---------- */

const PRIVACY = [
  ["What the contact form collects", "Your name, email and message. Resend delivers them to my inbox, and I use them only to reply to you. No mailing lists, and I never sell or share them."],
  ["Tracking", "None. No analytics, ad pixels or tracking cookies."],
  ["Saved in your browser", "Your day/night choice, which blog posts you've reacted to, and a timestamp so one visit counts as one blog view. It stays on your device and doesn't identify you."],
  ["Other services", "The site is hosted on Vercel, which logs basic request data to keep it running. Fonts load from Google Fonts, and blog posts from Supabase, which see your IP address when they load."],
  ["Deleting your message", "Email " + EMAIL + " and I'll delete anything you've sent me."],
];

export const PrivacyApp = () => (
  <div className="os-mono space-y-4 p-5 text-[13px] leading-relaxed text-[var(--os-muted)]">
    <p className="text-[var(--os-faint)]"># privacy.txt · updated September 27, 2026</p>
    {PRIVACY.map(([h, t]) => (
      <p key={h}>
        <span className="text-[var(--os-text)]">{h}</span>
        <br />
        {t}
      </p>
    ))}
    <p className="text-[var(--os-faint)]">
      olearyhouse.com is Joshua O&apos;Leary&apos;s personal site, Phoenix, Arizona.
    </p>
  </div>
);

/* ---------- Trash (easter egg) ---------- */

export const TrashApp = () => (
  <div className="os-mono space-y-2 p-5 text-[13px] text-[var(--os-muted)]">
    {[
      ["old-portfolio-template.zip", "It was purple. We don't talk about it."],
      ["todo-app-v1 (unfinished).js", "Every dev has one."],
      ["password123.txt", "Nice try."],
      ["bugs.log", "0 bytes. Obviously."],
    ].map(([f, n]) => (
      <p key={f}>
        <span className="text-[var(--os-text)]">{f}</span>
        <br />
        <span className="text-[var(--os-faint)]">{n}</span>
      </p>
    ))}
  </div>
);
