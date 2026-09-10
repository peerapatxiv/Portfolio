"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Projects as ProjectsType, ProjectItem } from "@/types/portfolio";
import FadeIn from "@/components/ui/FadeIn";
import ProjectCard from "@/components/projects/ProjectCard";
import ExternalLink from "@/components/ui/ExternalLink";
import { EASE, DUR, staggerContainer, fadeUpItem } from "@/lib/motion";

interface WorkProps {
  data: ProjectsType;
}

const FEATURED_NAMES = [
  "Foremost Mini Game",
  "Thailand Gallery Interactive Exhibition",
  "Journal Magnetic Attraction",
  "NIVEA",
  "Bluuu",
];

function FeaturedRow({ item, index }: { item: ProjectItem; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: "-10% 0px" });

  const rowVariants = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: DUR.normal, ease: EASE.out } },
  };

  const inner = (
    <motion.div
      ref={rowRef}
      variants={rowVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="group relative py-6 cursor-pointer"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* Hover background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-4 rounded-xl"
        style={{ background: "var(--bg-subtle)" }}
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-6 md:gap-10">
        {/* Number */}
        <span
          className="label-xs pt-1 shrink-0 w-6 text-right"
          style={{ color: "var(--fg-muted)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h3
              className="text-[18px] md:text-[22px] font-bold tracking-tight leading-tight transition-colors duration-200"
              style={{ color: "var(--fg)" }}
            >
              {item.name}
            </h3>

            <div className="flex items-center gap-3 shrink-0 mt-1">
              <span className="label-xs hidden sm:block" style={{ color: "var(--fg-muted)" }}>
                {item.period}
              </span>
              {item.link && (
                <motion.span
                  className="transition-colors duration-200"
                  style={{ color: "var(--fg-muted)" }}
                  whileHover={{ x: 3, y: -3, color: "var(--fg)" }}
                  transition={{ duration: 0.15 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              )}
            </div>
          </div>

          <span className="label-xs sm:hidden mt-1 block" style={{ color: "var(--fg-muted)" }}>
            {item.period}
          </span>

          <p
            className="text-[13px] leading-relaxed mt-2 max-w-2xl"
            style={{ color: "var(--fg-secondary)" }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );

  if (item.link) {
    return (
      <ExternalLink href={item.link} ariaLabel={`View ${item.name}`} className="block">
        {inner}
      </ExternalLink>
    );
  }

  return inner;
}

export default function Work({ data }: WorkProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-5% 0px" });

  const featured = FEATURED_NAMES
    .map(name => data.items.find(p => p.name === name))
    .filter(Boolean) as ProjectItem[];

  const rest = data.items.filter(p => !FEATURED_NAMES.includes(p.name));

  return (
    <section id="work" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Heading */}
      <motion.div
        ref={headingRef}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={headingInView ? "show" : "hidden"}
        className="mb-14"
      >
        <motion.p
          variants={fadeUpItem()}
          className="label-xs mb-3"
          style={{ color: "var(--fg-muted)" }}
        >
          Selected Work
        </motion.p>
        <motion.h2
          variants={fadeUpItem(DUR.emphasis)}
          className="text-3xl font-bold tracking-tight"
          style={{ color: "var(--fg)" }}
        >
          What I&apos;ve Built
        </motion.h2>
      </motion.div>

      {/* Featured editorial list */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        {featured.map((item, i) => (
          <FeaturedRow key={item.name} item={item} index={i} />
        ))}
      </div>

      {/* More projects grid */}
      {rest.length > 0 && (
        <>
          <FadeIn delay={200}>
            <p className="label-xs mt-20 mb-6" style={{ color: "var(--fg-muted)" }}>
              More Projects
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rest.map((item, i) => (
              <FadeIn key={item.name} delay={i * 45}>
                <ProjectCard item={item} />
              </FadeIn>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
