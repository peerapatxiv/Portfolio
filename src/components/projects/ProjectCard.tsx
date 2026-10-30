import { ProjectItem } from "@/types/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";

interface ProjectCardProps {
  item: ProjectItem;
}

function ArrowUpRight() {
  return (
    <svg
      width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M2.5 10.5L10.5 2.5M10.5 2.5H5M10.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProjectCard({ item }: ProjectCardProps) {
  const inner = (
    <article
      className="group p-5 rounded-xl h-full flex flex-col transition-colors duration-200 hover:border-[var(--border-strong)]"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <h4
          className="text-[15px] font-semibold leading-snug transition-colors group-hover:text-[var(--accent)]"
          style={{ color: "var(--fg)" }}
        >
          {item.name}
        </h4>
        {item.link && (
          <span className="shrink-0 mt-1 transition-colors group-hover:text-[var(--accent)]" style={{ color: "var(--fg-muted)" }}>
            <ArrowUpRight />
          </span>
        )}
      </div>
      <p className="label-xs mt-1" style={{ color: "var(--fg-muted)" }}>
        {item.period}
        {item.tags && item.tags.length > 0 && <> &nbsp;/&nbsp; {item.tags.join(", ")}</>}
      </p>
      <p className="text-[13px] leading-relaxed mt-3 flex-1 line-clamp-4" style={{ color: "var(--fg-secondary)" }} title={item.description}>
        {item.description}
      </p>
    </article>
  );

  if (!item.link) return inner;
  return (
    <ExternalLink href={item.link} ariaLabel={`View ${item.name}`} className="block h-full">
      {inner}
    </ExternalLink>
  );
}
