interface MarqueeProps {
  text: string;
  separator?: string;
}

export default function Marquee({ text, separator = "—" }: MarqueeProps) {
  // Duplicate enough times to fill any viewport width
  const repeated = Array(8).fill(`${text} ${separator} `).join("");

  return (
    <div
      className="overflow-hidden py-6 border-y"
      style={{ borderColor: "var(--border)" }}
      aria-hidden="true"
    >
      <div className="animate-marquee whitespace-nowrap will-change-transform">
        <span
          className="display-xs text-[13px] font-semibold tracking-[0.22em] uppercase"
          style={{ color: "var(--fg-muted)" }}
        >
          {repeated}{repeated}
        </span>
      </div>
    </div>
  );
}
