interface TagProps {
  label: string;
  variant?: "default" | "subtle";
}

export default function Tag({ label, variant = "default" }: TagProps) {
  const styles =
    variant === "subtle"
      ? { background: "var(--bg-subtle)", color: "var(--fg-secondary)", border: "1px solid var(--border)" }
      : { background: "var(--bg-card)", color: "var(--fg-secondary)", border: "1px solid var(--border)" };

  return (
    <span
      className="inline-flex items-center text-[11px] font-medium tracking-wide rounded px-2.5 py-1 leading-none"
      style={styles}
    >
      {label}
    </span>
  );
}
