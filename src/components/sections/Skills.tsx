"use client";

import { Skills as SkillsType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Tag from "@/components/ui/Tag";
import GlowCard from "@/components/ui/GlowCard";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

const list = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } };
const pop = {
  hidden: { opacity: 0, y: 10, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE.out } },
};

interface SkillsProps {
  data: SkillsType;
}

export default function Skills({ data }: SkillsProps) {
  // The first group is the current focus and gets the accent treatment.
  const [focus, ...others] = data.categories;

  return (
    <section
      id="skills"
      className="py-24 px-6 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <SectionHeading
        title="Skills"
        description={data.description}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {focus && (
          <FadeIn className="md:col-span-2 lg:col-span-1 lg:row-span-2">
            <GlowCard className="h-full rounded-2xl" tilt={3}>
            <div
              className="h-full rounded-2xl p-6"
              style={{ background: "var(--accent-soft)", border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)" }}
            >
              <p className="label-xs inline-flex items-center gap-2" style={{ color: "var(--accent)" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} aria-hidden="true" />
                Current focus
              </p>
              <h3 className="text-[22px] font-bold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
                {focus.title}
              </h3>
              {focus.description && (
                <p className="text-[14px] leading-relaxed mt-2" style={{ color: "var(--fg-secondary)" }}>
                  {focus.description}
                </p>
              )}
              <motion.ul className="mt-6 space-y-0" role="list" variants={list} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                {focus.items.map(skill => (
                  <motion.li
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE.out } },
                    }}
                    className="text-[15px] font-medium py-2.5"
                    style={{ color: "var(--fg)", borderTop: "1px solid color-mix(in srgb, var(--accent) 18%, transparent)" }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            </GlowCard>
          </FadeIn>
        )}

        {others.map((cat, i) => (
          // Last card fills the remaining row so the grid has no gaps.
          <FadeIn key={cat.title} delay={(i + 1) * 90} className={i === others.length - 1 && others.length % 2 === 1 ? "md:col-span-2 lg:col-span-3" : ""}>
            <GlowCard className="h-full rounded-2xl" tilt={3}>
            <div className="h-full rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h3 className="text-[17px] font-bold tracking-tight" style={{ color: "var(--fg)" }}>
                {cat.title}
              </h3>
              {cat.description && (
                <p className="text-[13px] leading-relaxed mt-1.5" style={{ color: "var(--fg-secondary)" }}>
                  {cat.description}
                </p>
              )}
              <motion.div className="flex flex-wrap gap-1.5 mt-4" variants={list} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                {cat.items.map(skill => (
                  <motion.span key={skill} variants={pop} whileHover={{ y: -2, scale: 1.06 }}>
                    <Tag label={skill} />
                  </motion.span>
                ))}
              </motion.div>
            </div>
            </GlowCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
