"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { About } from "@/types/portfolio";
import Logo from "@/components/ui/Logo";
import { EASE, DUR } from "@/lib/motion";

interface HeroProps {
  data: About;
}

const STAGGER = [0, 0.08, 0.16, 0.26, 0.38, 0.54];

function ArrowDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero({ data }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven transforms on the name
  const nameOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const nameY       = useTransform(scrollYProgress, [0, 0.45], [0, -48]);
  const nameScale   = useTransform(scrollYProgress, [0, 0.45], [1, 0.93]);

  // Secondary content fades a bit later
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.35], [0, -24]);

  // Top row fades last
  const topOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const enterBase = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col px-6 pt-28 pb-12 max-w-6xl mx-auto"
      aria-label="Introduction"
    >
      {/* Top row */}
      <motion.div
        className="flex items-center justify-between"
        style={{ opacity: topOpacity }}
        {...enterBase}
        transition={{ duration: DUR.normal, ease: EASE.out, delay: STAGGER[0] }}
      >
        <Logo size={28} style={{ color: "var(--fg)" }} />
        <span className="label-xs" style={{ color: "var(--fg-muted)" }}>
          Bangkok, TH
        </span>
      </motion.div>

      {/* Main content — pinned to bottom of hero */}
      <div className="mt-auto">
        {/* Role label */}
        <motion.p
          className="label-xs mb-5"
          style={{ color: "var(--fg-muted)", opacity: contentOpacity, y: contentY }}
          {...enterBase}
          transition={{ duration: DUR.normal, ease: EASE.out, delay: STAGGER[1] }}
        >
          {data.role}
        </motion.p>

        {/* Name — scroll-driven */}
        <motion.h1
          className="display-xl"
          style={{
            color: "var(--fg)",
            opacity: nameOpacity,
            y: nameY,
            scale: nameScale,
            transformOrigin: "left bottom",
          }}
          {...enterBase}
          transition={{ duration: DUR.entrance, ease: EASE.out, delay: STAGGER[2] }}
        >
          {data.firstname}
          <br />
          {data.lastname}
        </motion.h1>

        {/* Bio */}
        <motion.p
          className="text-[15px] leading-relaxed mt-8 max-w-lg"
          style={{ color: "var(--fg-secondary)", opacity: contentOpacity, y: contentY }}
          {...enterBase}
          transition={{ duration: DUR.normal, ease: EASE.out, delay: STAGGER[3] }}
        >
          {data.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mt-10"
          style={{ opacity: contentOpacity, y: contentY }}
          {...enterBase}
          transition={{ duration: DUR.normal, ease: EASE.out, delay: STAGGER[4] }}
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-5 py-2.5 transition-opacity duration-150 hover:opacity-80 active:scale-[0.98]"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
          >
            View my work <ArrowDown />
          </a>
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-5 py-2.5 transition-all duration-150 hover:border-[var(--fg)] active:scale-[0.98]"
            style={{ border: "1px solid var(--border-strong)", color: "var(--fg)" }}
          >
            Get in touch <ArrowRight />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="mt-16 flex items-center gap-3"
        style={{ color: "var(--fg-muted)", opacity: contentOpacity }}
        {...enterBase}
        transition={{ duration: DUR.normal, ease: EASE.out, delay: STAGGER[5] }}
      >
        <div className="h-px w-8" style={{ background: "var(--border-strong)" }} />
        <span className="label-xs">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
