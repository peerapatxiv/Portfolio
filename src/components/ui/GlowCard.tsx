"use client";

import { useId, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees; 0 disables tilt and keeps only the cursor glow. */
  tilt?: number;
  /** Idle effect shown before hover: a soft glow drifting inside the card. */
  idle?: boolean;
}

// Stable per-card offset (same on server and client) so cards don't animate in lockstep.
function phaseFrom(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return (h % 1000) / 1000;
}

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/** Wraps a card with a light that follows the cursor and an optional 3D tilt. */
export default function GlowCard({ children, className = "", tilt = 0, idle = true }: GlowCardProps) {
  const phase = phaseFrom(useId());
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), SPRING);

  const glow = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)`;
  const ring = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, color-mix(in srgb, var(--accent) 70%, transparent), transparent 70%)`;

  function onMove(e: React.PointerEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const tilted = tilt > 0 && !reduce;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`card-lift group/glow relative backdrop-blur-xl ${className}`}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={tilted ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
    >
      {children}
      {idle && (
        // Soft light drifting behind "frosted glass": two blurred blobs on different paths
        <div aria-hidden="true" className="card-drift pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="card-drift-a" style={{ animationDelay: `${-phase * 20}s` }} />
          <div className="card-drift-b" style={{ animationDelay: `${-phase * 26}s` }} />
        </div>
      )}
      {/* Soft wash over the card surface */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100"
        style={{ background: glow }}
      />
      {/* Bright edge that tracks the cursor along the border */}
      <motion.div
        aria-hidden="true"
        className="glow-ring pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100"
        style={{ background: ring }}
      />
    </motion.div>
  );
}
