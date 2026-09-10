"use client";

import { useScroll, motion } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "var(--fg)",
        opacity: 0.35,
      }}
      aria-hidden="true"
    />
  );
}
