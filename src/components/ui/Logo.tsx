import { CSSProperties } from "react";

interface LogoProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Logo({ size = 28, className = "", style }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PP — Peerapat Padtawaro"
      className={className}
      style={style}
    >
      {/* Left P */}
      <rect x="4" y="6" width="3.5" height="28" fill="currentColor" />
      <rect x="4" y="6" width="13" height="3.5" fill="currentColor" />
      <rect x="4" y="17.25" width="13" height="3.5" fill="currentColor" />
      <rect x="13.5" y="6" width="3.5" height="14.75" fill="currentColor" />

      {/* Right P */}
      <rect x="22.5" y="6" width="3.5" height="28" fill="currentColor" />
      <rect x="22.5" y="6" width="13" height="3.5" fill="currentColor" />
      <rect x="22.5" y="17.25" width="13" height="3.5" fill="currentColor" />
      <rect x="32" y="6" width="3.5" height="14.75" fill="currentColor" />

      {/* Center accent dot */}
      <rect x="18.25" y="29" width="3.5" height="5" rx="1" fill="currentColor" opacity="0.35" />
    </svg>
  );
}
