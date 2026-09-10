"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Experience as ExperienceType } from "@/types/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";
import { EASE, DUR, staggerContainer, fadeUpItem } from "@/lib/motion";

interface ExperienceProps {
  data: ExperienceType;
}

function ArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="inline-block ml-0.5">
      <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TimelineItem({ item, index, isLast }: {
  item: ExperienceType["items"][number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 pb-14 last:pb-0"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: DUR.normal, ease: EASE.out, delay: index * 0.12 }}
    >
      {/* Animated dot */}
      <motion.div
        className="absolute left-0 top-[7px] w-[10px] h-[10px] rounded-full"
        style={{ background: "var(--fg)", border: "2px solid var(--bg)", zIndex: 1 }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1], delay: index * 0.12 + 0.15 }}
      />

      {/* Period */}
      <p className="label-xs mb-3" style={{ color: "var(--fg-muted)" }}>
        {item.period} · {item.location}
      </p>

      {/* Company */}
      <h3
        className="text-[22px] font-bold tracking-tight leading-tight mb-0.5"
        style={{ color: "var(--fg)" }}
      >
        {item.company}
      </h3>

      {/* Position */}
      <p className="text-[14px] font-medium mb-1" style={{ color: "var(--fg-secondary)" }}>
        {item.position}
      </p>

      {/* Previous role */}
      {item.previousRole && (
        <p className="text-[12px] mb-3" style={{ color: "var(--fg-muted)" }}>
          Previously: {item.previousRole.position} · {item.previousRole.period}
        </p>
      )}

      <p className="text-[13px] leading-relaxed mt-3 max-w-xl" style={{ color: "var(--fg-secondary)" }}>
        {item.description}
      </p>

      {item.link && (
        <ExternalLink
          href={item.link}
          ariaLabel={`View work at ${item.company}`}
          className="mt-3 inline-flex items-center text-[12px] font-medium transition-opacity hover:opacity-60"
          style={{ color: "var(--fg-muted)" }}
        >
          View work <ArrowUpRight />
        </ExternalLink>
      )}

      {!isLast && (
        <div
          className="absolute left-[4px] top-[20px] bottom-0 w-px"
          style={{ background: "var(--border)" }}
        />
      )}
    </motion.div>
  );
}

export default function Experience({ data }: ExperienceProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-5% 0px" });

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 30%"],
  });
  // The animated timeline fill line
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="py-24 px-6 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* Heading */}
      <motion.div
        ref={headingRef}
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={headingInView ? "show" : "hidden"}
        className="mb-14"
      >
        <motion.p variants={fadeUpItem()} className="label-xs mb-3" style={{ color: "var(--fg-muted)" }}>
          {data.title}
        </motion.p>
        <motion.h2 variants={fadeUpItem(DUR.emphasis)} className="text-3xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
          Experience
        </motion.h2>
      </motion.div>

      <div className="max-w-2xl" ref={sectionRef}>
        {/* Animated timeline line overlay */}
        <div className="relative">
          {/* Background line (static, full height) */}
          <div
            className="absolute left-[4px] top-[7px] bottom-14 w-px"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />
          {/* Foreground line (scroll-animated) */}
          <motion.div
            className="absolute left-[4px] top-[7px] bottom-14 w-px origin-top"
            style={{ background: "var(--fg)", scaleY: lineScaleY, opacity: 0.6 }}
            aria-hidden="true"
          />

          {data.items.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              isLast={i === data.items.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
