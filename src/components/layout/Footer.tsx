import { About } from "@/types/portfolio";
import Logo from "@/components/ui/Logo";

interface FooterProps {
  data: About;
}

export default function Footer({ data }: FooterProps) {
  const year = new Date().getFullYear();
  const links = [
    { label: "GitHub", href: data.github },
    { label: "LinkedIn", href: data.linkedin },
  ].filter(l => l.href);

  return (
    <footer className="px-6 py-10 max-w-6xl mx-auto" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Logo size={20} style={{ color: "var(--fg-secondary)" }} />
          <span className="text-[13px]" style={{ color: "var(--fg-muted)" }}>
            © {year} {data.firstname.charAt(0)}{data.firstname.slice(1).toLowerCase()}{" "}
            {data.lastname.charAt(0)}{data.lastname.slice(1).toLowerCase()}
          </span>
        </div>

        <ul className="flex items-center gap-6 text-[13px]" role="list">
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--fg-secondary)" }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#hero" className="transition-colors hover:text-[var(--accent)]" style={{ color: "var(--fg-secondary)" }}>
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
