"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const HEADINGS = "h1, h2, .display-xl, .section-title";
const SIZE = 96;

/**
 * Over big headings the cursor becomes a round lens that inverts the text beneath it.
 * Everywhere else the normal system cursor is used.
 */
export default function HeadingLens() {
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const x = useSpring(mx, { stiffness: 520, damping: 40, mass: 0.5 });
  const y = useSpring(my, { stiffness: 520, damping: 40, mass: 0.5 });

  useEffect(() => {
    // Mouse and trackpad only.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("heading-lens");

    let lastX = -200;
    let lastY = -200;
    const check = (target: Element | null) => setActive(!!target?.closest(HEADINGS));

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      mx.set(lastX - SIZE / 2);
      my.set(lastY - SIZE / 2);
      check(e.target as Element | null);
    };
    // Headings move under a still pointer while scrolling, so re-check.
    const onScroll = () => check(document.elementFromPoint(lastX, lastY));
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setActive(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("heading-lens");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my]);

  return (
    // The blend mode sits on the fixed layer so it mixes with the page behind it.
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-white"
        style={{ x, y, width: SIZE, height: SIZE }}
        initial={false}
        animate={{ scale: active ? (pressed ? 0.85 : 1) : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />
    </div>
  );
}
