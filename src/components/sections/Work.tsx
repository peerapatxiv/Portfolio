"use client";

import { useMemo, useState } from "react";
import { Projects as ProjectsType, ProjectItem } from "@/types/portfolio";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import ExternalLink from "@/components/ui/ExternalLink";
import Tag from "@/components/ui/Tag";

interface WorkProps {
  data: ProjectsType;
}

function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function linkLabel(url: string) {
  if (url.includes("github.com")) return "View on GitHub";
  if (url.includes("linkedin.com")) return "View on LinkedIn";
  if (url.includes("facebook.com")) return "View on Facebook";
  if (url.includes("behance.net")) return "View on Behance";
  return "Visit site";
}

/** The newest featured project gets a large card with its own action buttons. */
function Spotlight({ item }: { item: ProjectItem }) {
  return (
    <article
      className="rounded-3xl p-7 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end"
      style={{ background: "var(--accent-soft)", border: "1px solid color-mix(in srgb, var(--accent) 22%, transparent)" }}
    >
      <div className="max-w-[40rem]">
        <p className="label-xs inline-flex items-center gap-2" style={{ color: "var(--accent)" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} aria-hidden="true" />
          Latest project, {item.period}
        </p>
        <h3 className="text-[30px] md:text-[40px] font-bold tracking-tight leading-[1.05] mt-4" style={{ color: "var(--fg)" }}>
          {item.name}
        </h3>
        <p className="text-[15px] md:text-[16px] leading-relaxed mt-4" style={{ color: "var(--fg-secondary)" }}>
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-5">
            {item.tags.map(tag => <Tag key={tag} label={tag} />)}
          </div>
        )}
      </div>

      <div className="flex flex-wrap lg:flex-col gap-3">
        {item.demo && (
          <ExternalLink
            href={item.demo}
            className="group inline-flex items-center justify-center gap-2 text-[14px] font-semibold rounded-full px-5 py-3 transition-[filter] hover:brightness-110"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            Open the app <ArrowUpRight size={14} />
          </ExternalLink>
        )}
        {item.link && (
          <ExternalLink
            href={item.link}
            className="group inline-flex items-center justify-center gap-2 text-[14px] font-semibold rounded-full px-5 py-3 transition-colors hover:border-[var(--fg)]"
            style={{ border: "1px solid var(--border-strong)", color: "var(--fg)", background: "var(--bg-card)" }}
          >
            {linkLabel(item.link)} <ArrowUpRight size={14} />
          </ExternalLink>
        )}
      </div>
    </article>
  );
}

function FeaturedCard({ item }: { item: ProjectItem }) {
  const inner = (
    <article
      className="group h-full rounded-2xl p-6 md:p-7 flex flex-col transition-colors duration-200 hover:border-[var(--border-strong)]"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="label-xs" style={{ color: "var(--fg-muted)" }}>{item.period}</p>
        {item.link && (
          <span className="transition-colors group-hover:text-[var(--accent)]" style={{ color: "var(--fg-muted)" }}>
            <ArrowUpRight />
          </span>
        )}
      </div>
      <h3
        className="text-[22px] font-bold tracking-tight leading-tight mt-3 transition-colors group-hover:text-[var(--accent)]"
        style={{ color: "var(--fg)" }}
      >
        {item.name}
      </h3>
      <p className="text-[14px] leading-relaxed mt-3 flex-1" style={{ color: "var(--fg-secondary)" }}>
        {item.description}
      </p>
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-5">
          {item.tags.map(tag => <Tag key={tag} label={tag} />)}
        </div>
      )}
    </article>
  );

  if (!item.link) return inner;
  return (
    <ExternalLink href={item.link} ariaLabel={`${item.name}: ${linkLabel(item.link)}`} className="block h-full">
      {inner}
    </ExternalLink>
  );
}

const ALL = "All";

export default function Work({ data }: WorkProps) {
  const featured = data.items.filter(p => p.featured);
  const rest = useMemo(() => data.items.filter(p => !p.featured), [data.items]);
  const [spotlight, ...others] = featured;

  // Filter chips: tags used by at least two of the remaining projects, most common first.
  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    rest.forEach(p => p.tags?.forEach(t => counts.set(t, (counts.get(t) ?? 0) + 1)));
    const common = [...counts.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).map(([t]) => t);
    return [ALL, ...common];
  }, [rest]);
  const [filter, setFilter] = useState(ALL);
  const shown = filter === ALL ? rest : rest.filter(p => p.tags?.includes(filter));

  return (
    <section id="work" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading title="Selected work" description={data.description} />

      {spotlight && (
        <FadeIn>
          <Spotlight item={spotlight} />
        </FadeIn>
      )}

      {others.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {others.map((item, i) => (
            // An odd last card spans the full row so the grid has no gap.
            <FadeIn
              key={item.name}
              className={`h-full ${i === others.length - 1 && others.length % 2 === 1 ? "md:col-span-2" : ""}`}
            >
              <FeaturedCard item={item} />
            </FadeIn>
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-6">
            <h3 className="text-[22px] font-bold tracking-tight" style={{ color: "var(--fg)" }}>
              More projects
            </h3>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter projects by type">
              {filters.map(f => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className="text-[13px] font-medium rounded-full px-3.5 py-1.5 transition-colors"
                    style={
                      active
                        ? { background: "var(--fg)", color: "var(--bg)", border: "1px solid var(--fg)" }
                        : { color: "var(--fg-secondary)", border: "1px solid var(--border-strong)" }
                    }
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {shown.map(item => (
              <ProjectCard key={item.name} item={item} />
            ))}
          </div>
          <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>
        </div>
      )}
    </section>
  );
}
