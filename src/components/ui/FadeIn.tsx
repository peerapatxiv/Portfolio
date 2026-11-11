"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in milliseconds, handy for staggering siblings by index. */
  delay?: number;
  once?: boolean;
}

/** Scroll reveal: content rises, sharpens out of a blur and settles to full size. */
export default function FadeIn({ children, className = "", delay = 0, once = true }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, scale: 0.97, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.1 }}
      transition={{ duration: 0.9, ease: EASE.out, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
