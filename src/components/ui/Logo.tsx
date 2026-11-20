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
      viewBox="1 1 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Peerapat Padtawaro"
      className={className}
      style={style}
    >
      {/* { P }: a geometric P (for Peerapat) wrapped in code braces.
          Same 32-unit grid as src/app/icon.svg, without the tile. */}
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5.5H8C6.5 5.5 5.5 6.5 5.5 8v4.5c0 1.5-1 2.5-2.5 3.5c1.5 1 2.5 2 2.5 3.5V24c0 1.5 1 2.5 2.5 2.5H9" />
        <path d="M23 5.5h1c1.5 0 2.5 1 2.5 2.5v4.5c0 1.5 1 2.5 2.5 3.5c-1.5 1-2.5 2-2.5 3.5V24c0 1.5-1 2.5-2.5 2.5H23" />
      </g>
      <path fill="currentColor" fillRule="evenodd" d="M11 7h6.5a5.5 5.5 0 0 1 0 11H15v7h-4z M15 10.5v4h2.5a2 2 0 0 0 0-4z" />
    </svg>
  );
}
