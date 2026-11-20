"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>{}#*";
const STEP_MS = 45;      // how often the random glyphs change
const SETTLE_MS = 140;   // when the first letter locks in
const STAGGER_MS = 55;   // delay between each following letter

/**
 * Text that "decodes": letters cycle through random glyphs and lock in one by
 * one, left to right. Plays on mount and again on hover. Use a monospace
 * font so the width doesn't jitter while it runs.
 */
export default function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<number | null>(null);

  const play = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);

    const start = performance.now();
    let lastStep = -Infinity;

    const tick = (now: number) => {
      const t = now - start;
      if (now - lastStep >= STEP_MS) {
        lastStep = now;
        setDisplay(
          text
            .split("")
            .map((ch, i) =>
              t >= SETTLE_MS + i * STAGGER_MS || ch === " "
                ? ch
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            )
            .join("")
        );
      }
      if (t < SETTLE_MS + text.length * STAGGER_MS) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        frame.current = null;
      }
    };
    frame.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    play();
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [play]);

  return (
    <span onMouseEnter={play} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
