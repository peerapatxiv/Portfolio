interface SectionHeadingProps {
  label: string;
  title?: string;
  className?: string;
}

export default function SectionHeading({ label, title, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <p className="label-xs mb-3" style={{ color: "var(--fg-muted)" }}>{label}</p>
      {title && (
        <h2 className="text-3xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
          {title}
        </h2>
      )}
    </div>
  );
}
