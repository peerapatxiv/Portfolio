interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <span
      className="inline-flex items-center text-[12px] font-medium rounded-full px-3 py-1 leading-tight"
      style={{ background: "var(--bg-subtle)", color: "var(--fg-secondary)" }}
    >
      {label}
    </span>
  );
}
