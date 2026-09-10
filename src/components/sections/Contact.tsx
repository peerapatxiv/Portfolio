"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { About } from "@/types/portfolio";
import { EASE, DUR } from "@/lib/motion";

interface ContactProps {
  data: About;
}

const LINES = ["Let's build", "something", "together."];

export default function Contact({ data }: ContactProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      id="contact"
      className="py-32 px-6 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <motion.p
        className="label-xs mb-8"
        style={{ color: "var(--fg-muted)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: DUR.normal, ease: EASE.out }}
      >
        Contact
      </motion.p>

      {/* Large display text — each line clips in sequentially */}
      <h2 className="display-lg max-w-2xl mb-8 overflow-hidden" aria-label="Let's build something together.">
        {LINES.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              className="block"
              style={{ color: "var(--fg)" }}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: DUR.emphasis, ease: EASE.out, delay: i * 0.1 }}
            >
              {line}
            </motion.span>
          </div>
        ))}
      </h2>

      <motion.p
        className="text-[15px] mb-10 max-w-md"
        style={{ color: "var(--fg-secondary)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: DUR.normal, ease: EASE.out, delay: 0.35 }}
      >
        Have a project, idea, or opportunity?
        I&apos;d love to hear about it.
      </motion.p>

      <motion.a
        href={`mailto:${data.email}`}
        className="inline-flex items-center gap-3 text-[15px] font-semibold rounded-full px-7 py-3.5 transition-opacity hover:opacity-80 active:scale-[0.98]"
        style={{ background: "var(--fg)", color: "var(--bg)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: DUR.normal, ease: EASE.out, delay: 0.45 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        Get in touch
        <motion.svg
          width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.a>

      <motion.div
        className="mt-12 pt-8"
        style={{ borderTop: "1px solid var(--border)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: DUR.normal, ease: EASE.out, delay: 0.6 }}
      >
        <p className="text-[13px]" style={{ color: "var(--fg-muted)" }}>
          {data.email}
        </p>
      </motion.div>
    </section>
  );
}
