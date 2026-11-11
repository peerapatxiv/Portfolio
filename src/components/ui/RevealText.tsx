"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

interface RevealTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h2" | "h3" | "p";
  delay?: number;
}

/** Each word slides up out of its own mask, one after another, when scrolled into view. */
export default function RevealText({ text, className = "", style, as = "h2", delay = 0 }: RevealTextProps) {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      style={style}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", rotate: 6 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.8, ease: EASE.out } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
