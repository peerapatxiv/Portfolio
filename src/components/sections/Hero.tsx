"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { About, EducationItem, ExperienceItem } from "@/types/portfolio";
import { EASE, DUR } from "@/lib/motion";
import Magnetic from "@/components/ui/Magnetic";

interface HeroProps {
  data: About;
  current: ExperienceItem;
  degree?: EducationItem;
}

function ArrowDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// "Bangkok 10400, Thailand" -> "Bangkok, Thailand"
function cityOf(data: About) {
  return data.address.line3.replace(/\s*\d{4,6}/, "");
}

// Splits "Associate Software Engineer · Integration" into title and team.
function splitPosition(position: string) {
  const [title, team] = position.split("·").map(s => s.trim());
  return { title, team };
}

/**
 * The hero's signature: a profile rendered as an API response,
 * a nod to the day job (API gateway integration).
 */
const PANEL_DELAY = 0.45;
const ROWS_DELAY = PANEL_DELAY + 0.75;

function ProfileResponse({ data, current, degree }: HeroProps) {
  // The request "resolves" a moment after the panel lands, then the body streams in.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), (ROWS_DELAY - 0.1) * 1000);
    return () => clearTimeout(t);
  }, []);

  const { title, team } = splitPosition(current.position);
  const rows: [string, string][] = [
    ["role", title],
    ...(team ? [["team", team] as [string, string]] : []),
    ["company", current.company],
    ["since", current.period.replace(/\s*-\s*Present/i, "")],
    ["based", cityOf(data)],
    ...(degree ? [["degree", degree.major] as [string, string]] : []),
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden text-[13px] leading-[1.75] font-mono backdrop-blur-xl"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div
        className="flex items-center justify-between gap-4 px-5 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span style={{ color: "var(--fg)" }}>
          <span style={{ color: "var(--accent)" }} className="font-semibold">GET</span> /peerapat
        </span>
        <span className="inline-flex items-center gap-2" style={{ color: "var(--fg-secondary)" }}>
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping" style={{ background: "var(--accent)" }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          </span>
          <motion.span
            key={loaded ? "ok" : "pending"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE.out }}
          >
            {loaded ? "200 OK" : "pending…"}
          </motion.span>
        </span>
      </div>
      <dl className="px-5 py-4">
        <span style={{ color: "var(--fg-muted)" }}>{"{"}</span>
        {rows.map(([key, value], i) => (
          <motion.div
            key={key}
            className="flex gap-2 pl-4 min-w-0"
            initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.45, ease: EASE.out, delay: ROWS_DELAY + i * 0.09 }}
          >
            <dt className="shrink-0" style={{ color: "var(--fg-muted)" }}>&quot;{key}&quot;:</dt>
            <dd className="min-w-0 break-words" style={{ color: "var(--fg)" }}>
              {/^\d+$/.test(value) ? (
                <span style={{ color: "var(--accent)" }}>{value}</span>
              ) : (
                <>&quot;{value}&quot;</>
              )}
              {i < rows.length - 1 && <span style={{ color: "var(--fg-muted)" }}>,</span>}
            </dd>
          </motion.div>
        ))}
        <span style={{ color: "var(--fg-muted)" }}>{"}"}</span>
        <span className="caret inline-block w-[7px] h-[14px] ml-1 align-[-2px]" style={{ background: "var(--accent)" }} aria-hidden="true" />
      </dl>
    </div>
  );
}

export default function Hero(props: HeroProps) {
  const { data } = props;
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const liftUp = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  const letters = (word: string, offset: number) =>
    [...word].map((ch, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ y: "110%", rotate: 8, opacity: 0 }}
        animate={{ y: "0%", rotate: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE.out, delay: 0.1 + (offset + i) * 0.035 }}
      >
        {ch}
      </motion.span>
    ));

  // One orchestrated entrance: name, then supporting copy, then the response panel.
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.emphasis, ease: EASE.out, delay },
  });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92svh] flex items-center px-6 pt-32 pb-16 max-w-6xl mx-auto"
      aria-label="Introduction"
    >

      <motion.div
        className="grid w-full grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-16 items-end"
        style={{ opacity: fadeOut, y: liftUp }}
      >
        <div>
          <motion.p
            className="text-[15px] font-medium mb-5 inline-flex items-center gap-2"
            style={{ color: "var(--fg-secondary)" }}
            {...enter(0)}
          >
            <span className="text-shimmer">{data.role} in {cityOf(data).split(",")[0]}</span>
          </motion.p>

          <h1 className="display-xl" style={{ color: "var(--fg)" }} aria-label={`${data.firstname} ${data.lastname}`}>
            <span aria-hidden="true" className="block overflow-hidden whitespace-nowrap pb-[0.1em] -mb-[0.1em]">
              {letters(data.firstname, 0)}
            </span>
            <span aria-hidden="true" className="block overflow-hidden whitespace-nowrap pb-[0.1em] -mb-[0.1em]">
              {letters(data.lastname, data.firstname.length)}
            </span>
          </h1>

          <motion.p
            className="text-[16px] leading-relaxed mt-8 max-w-[34rem]"
            style={{ color: "var(--fg-secondary)" }}
            {...enter(0.2)}
          >
            {data.bio}
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-3 mt-10" {...enter(0.3)}>
            <Magnetic>
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-[14px] font-semibold rounded-full px-5 py-3 transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.98]"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            >
              See my work <ArrowDown />
            </a>
            </Magnetic>
            <Magnetic>
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-2 text-[14px] font-semibold rounded-full px-5 py-3 transition-colors duration-150 hover:border-[var(--fg)] active:scale-[0.98]"
              style={{ border: "1px solid var(--border-strong)", color: "var(--fg)" }}
            >
              Email me
            </a>
            </Magnetic>
          </motion.div>

          <motion.ul className="flex flex-wrap items-center gap-5 mt-8 text-[14px]" role="list" {...enter(0.36)}>
            {[
              { label: "GitHub", href: data.github },
              { label: "LinkedIn", href: data.linkedin },
            ].filter(l => l.href).map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
                  style={{ color: "var(--fg-secondary)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: DUR.entrance, ease: EASE.out, delay: PANEL_DELAY }}
          style={{ transformPerspective: 1200 }}
        >
          <ProfileResponse {...props} />
        </motion.div>
      </motion.div>
    </section>
  );
}
