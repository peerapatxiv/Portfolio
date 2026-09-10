"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { About as AboutType, Languages as LanguagesType } from "@/types/portfolio";
import { EASE, DUR, staggerContainer, fadeUpItem } from "@/lib/motion";

interface AboutProps {
  data: AboutType;
  languages: LanguagesType;
}

export default function About({ data, languages }: AboutProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-5% 0px" });

  const bioRef = useRef<HTMLDivElement>(null);
  const bioInView = useInView(bioRef, { once: true, margin: "-10% 0px" });

  const langRef = useRef<HTMLDivElement>(null);
  const langInView = useInView(langRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="about"
      className="py-24 px-6 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <motion.div
        ref={headingRef}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={headingInView ? "show" : "hidden"}
        className="mb-14"
      >
        <motion.p variants={fadeUpItem()} className="label-xs mb-3" style={{ color: "var(--fg-muted)" }}>
          {data.profileTitle}
        </motion.p>
        <motion.h2 variants={fadeUpItem(DUR.emphasis)} className="text-3xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
          About
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Bio — enters from left */}
        <motion.div
          ref={bioRef}
          initial={{ opacity: 0, x: -20 }}
          animate={bioInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: DUR.emphasis, ease: EASE.out }}
        >
          <p className="text-[16px] leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
            {data.bio}
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-3 group w-fit transition-opacity hover:opacity-60"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: "var(--fg-muted)" }}>
                <path d="M1 3.5L7 7.5L13 3.5M1 3.5H13V11.5H1V3.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[13px] group-hover:underline underline-offset-2" style={{ color: "var(--fg-secondary)" }}>
                {data.email}
              </span>
            </a>
            <div className="flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: "var(--fg-muted)" }}>
                <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4Zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="currentColor" />
              </svg>
              <span className="text-[13px]" style={{ color: "var(--fg-secondary)" }}>
                {data.address.line2}, {data.address.line3}
              </span>
            </div>
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group w-fit transition-opacity hover:opacity-60"
                aria-label="LinkedIn profile"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: "var(--fg-muted)" }}>
                  <path d="M1.5 4.5h2.5v8H1.5v-8ZM2.75 3.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM5.5 4.5H8v1.1c.4-.7 1.3-1.1 2.1-1.1C12 4.5 12.5 5.7 12.5 7.5v5H10V8c0-.8-.3-1.5-1-1.5s-1 .7-1 1.5v4.5H5.5v-8Z" fill="currentColor" />
                </svg>
                <span className="text-[13px] group-hover:underline underline-offset-2" style={{ color: "var(--fg-secondary)" }}>
                  LinkedIn
                </span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Languages — enters from right (opposite direction) */}
        <motion.div
          ref={langRef}
          initial={{ opacity: 0, x: 20 }}
          animate={langInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: DUR.emphasis, ease: EASE.out, delay: 0.1 }}
        >
          <p className="label-xs mb-6" style={{ color: "var(--fg-muted)" }}>
            {languages.title}
          </p>
          <div>
            {languages.items.map((lang, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={langInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: DUR.normal, ease: EASE.out, delay: 0.18 + i * 0.08 }}
              >
                <span className="text-[15px] font-semibold" style={{ color: "var(--fg)" }}>
                  {lang.name}
                </span>
                <span className="text-[12px]" style={{ color: "var(--fg-muted)" }}>
                  {lang.level}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
