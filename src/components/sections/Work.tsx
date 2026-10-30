import { Projects as ProjectsType, ProjectItem } from "@/types/portfolio";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import ExternalLink from "@/components/ui/ExternalLink";
import Tag from "@/components/ui/Tag";

interface WorkProps {
  data: ProjectsType;
}

function ArrowUpRight() {
  return (
    <svg
      width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeaturedRow({ item }: { item: ProjectItem }) {
  const inner = (
    <article
      className="group grid grid-cols-1 md:grid-cols-[10rem_1fr_auto] gap-x-10 gap-y-2 py-8"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <p className="label-xs md:pt-2" style={{ color: "var(--fg-muted)" }}>
        {item.period}
      </p>

      <div className="min-w-0">
        <h3
          className="text-[22px] md:text-[26px] font-bold tracking-tight leading-tight transition-colors duration-200 group-hover:text-[var(--accent)]"
          style={{ color: "var(--fg)" }}
        >
          {item.name}
        </h3>
        <p className="text-[14px] leading-relaxed mt-3 max-w-[38rem]" style={{ color: "var(--fg-secondary)" }}>
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {item.tags.map(tag => <Tag key={tag} label={tag} />)}
          </div>
        )}
      </div>

      {item.link && (
        <span
          className="hidden md:block pt-2 transition-colors duration-200 group-hover:text-[var(--accent)]"
          style={{ color: "var(--fg-muted)" }}
        >
          <ArrowUpRight />
        </span>
      )}
    </article>
  );

  if (!item.link) return inner;
  return (
    <ExternalLink href={item.link} ariaLabel={`View ${item.name}`} className="block">
      {inner}
    </ExternalLink>
  );
}

export default function Work({ data }: WorkProps) {
  const featured = data.items.filter(p => p.featured);
  const rest = data.items.filter(p => !p.featured);

  return (
    <section id="work" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        title="Selected work"
        description={data.description}
      />

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {featured.map(item => (
          <FadeIn key={item.name}>
            <FeaturedRow item={item} />
          </FadeIn>
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <h3 className="text-[18px] font-bold tracking-tight mt-20 mb-6" style={{ color: "var(--fg)" }}>
            More projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rest.map(item => (
              <ProjectCard key={item.name} item={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
