function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Round arrow for link cards. When the parent `group` is hovered it fills with the
 * accent color and the arrow flies out the top-right while a new one slides in.
 */
export default function ArrowBadge() {
  return (
    <span
      className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[var(--border-strong)] text-[var(--fg-muted)] group-hover:scale-110 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--on-accent)]"
      aria-hidden="true"
    >
      <Arrow className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5 group-hover:-translate-y-5" />
      <Arrow className="absolute -translate-x-5 translate-y-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
    </span>
  );
}
