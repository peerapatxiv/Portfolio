"use client";

import { MotionConfig } from "motion/react";

/** Turns off transform animations for visitors who ask for reduced motion. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
