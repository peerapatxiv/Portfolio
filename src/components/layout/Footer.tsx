import { About } from "@/types/portfolio";
import Logo from "@/components/ui/Logo";

interface FooterProps {
  data: About;
}

export default function Footer({ data }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 py-10 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo size={20} style={{ color: "var(--fg-muted)" } as React.CSSProperties} />
          <span className="text-[12px]" style={{ color: "var(--fg-muted)" }}>
            {data.firstname} {data.lastname}
          </span>
        </div>

        <p className="text-[11px]" style={{ color: "var(--fg-muted)" }}>
          © {year} · {data.address.line2}
        </p>
      </div>
    </footer>
  );
}
