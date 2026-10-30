"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { About, EducationItem, ExperienceItem } from "@/types/portfolio";
import { EASE, DUR } from "@/lib/motion";

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
function ProfileResponse({ data, current, degree }: HeroProps) {
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
      className="rounded-2xl overflow-hidden text-[13px] leading-[1.75] font-mono"
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
          200 OK
        </span>
      </div>
      <dl className="px-5 py-4">
        <span style={{ color: "var(--fg-muted)" }}>{"{"}</span>
        {rows.map(([key, value], i) => (
          <div key={key} className="flex gap-2 pl-4 min-w-0">
            <dt className="shrink-0" style={{ color: "var(--fg-muted)" }}>&quot;{key}&quot;:</dt>
            <dd className="min-w-0 break-words" style={{ color: "var(--fg)" }}>
              {/^\d+$/.test(value) ? (
                <span style={{ color: "var(--accent)" }}>{value}</span>
              ) : (
                <>&quot;{value}&quot;</>
              )}
              {i < rows.length - 1 && <span style={{ color: "var(--fg-muted)" }}>,</span>}
            </dd>
          </div>
        ))}
        <span style={{ color: "var(--fg-muted)" }}>{"}"}</span>
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
            {data.role} in {cityOf(data).split(",")[0]}
          </motion.p>

          <motion.h1 className="display-xl" style={{ color: "var(--fg)" }} {...enter(0.08)}>
            {data.firstname}
            <br />
            {data.lastname}
          </motion.h1>

          <motion.p
            className="text-[16px] leading-relaxed mt-8 max-w-[34rem]"
            style={{ color: "var(--fg-secondary)" }}
            {...enter(0.2)}
          >
            {data.bio}
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-3 mt-10" {...enter(0.3)}>
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-[14px] font-semibold rounded-full px-5 py-3 transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.98]"
              style={{ background: "var(--accent)", color: "var(--on-accent)" }}
            >
              See my work <ArrowDown />
            </a>
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-2 text-[14px] font-semibold rounded-full px-5 py-3 transition-colors duration-150 hover:border-[var(--fg)] active:scale-[0.98]"
              style={{ border: "1px solid var(--border-strong)", color: "var(--fg)" }}
            >
              Email me
            </a>
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

        <motion.div {...enter(0.45)}>
          <ProfileResponse {...props} />
        </motion.div>
      </motion.div>
    </section>
  );
}
