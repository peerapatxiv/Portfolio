"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Skills as SkillsType } from "@/types/portfolio";
import Tag from "@/components/ui/Tag";
import { EASE, DUR, staggerContainer, fadeUpItem } from "@/lib/motion";

interface SkillsProps {
  data: SkillsType;
}

function CategoryBlock({ cat, delay }: { cat: SkillsType["categories"][number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const tagContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: delay + 0.12 } },
  };
  const tagItem = {
    hidden: { opacity: 0, scale: 0.88 },
    show:   { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE.out } },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: DUR.normal, ease: EASE.out, delay }}
    >
      <p className="label-xs mb-4" style={{ color: "var(--fg-muted)" }}>
        {cat.title}
      </p>
      <motion.div
        className="flex flex-wrap gap-1.5"
        variants={tagContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {cat.items.map((skill, j) => (
          <motion.span key={j} variants={tagItem}>
            <Tag label={skill} />
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Skills({ data }: SkillsProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-5% 0px" });

  return (
    <section
      id="skills"
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
          {data.title}
        </motion.p>
        <motion.h2 variants={fadeUpItem(DUR.emphasis)} className="text-3xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
          Skills
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {data.categories.map((cat, i) => (
          <CategoryBlock key={i} cat={cat} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
