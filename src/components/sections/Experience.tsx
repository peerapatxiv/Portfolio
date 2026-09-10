import { Experience as ExperienceType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import ExternalLink from "@/components/ui/ExternalLink";

interface ExperienceProps {
  data: ExperienceType;
}

function ArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="inline-block ml-0.5">
      <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="py-24 px-6 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <FadeIn>
        <SectionHeading label={data.title} title="Experience" />
      </FadeIn>

      <div className="max-w-2xl">
        {data.items.map((item, i) => (
          <FadeIn key={i} delay={i * 80}>
            <div
              className="relative pl-6 pb-12 last:pb-0"
              style={{
                borderLeft: i < data.items.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-[-5px] top-1.5 w-[9px] h-[9px] rounded-full"
                style={{ background: "var(--fg)", border: "2px solid var(--bg)" }}
              />

              {/* Period */}
              <p className="label-xs mb-3" style={{ color: "var(--fg-muted)" }}>
                {item.period} · {item.location}
              </p>

              {/* Company + position */}
              <h3 className="text-[20px] font-bold tracking-tight leading-tight mb-0.5" style={{ color: "var(--fg)" }}>
                {item.company}
              </h3>
              <p className="text-[14px] font-medium mb-1" style={{ color: "var(--fg-secondary)" }}>
                {item.position}
              </p>

              {/* Previous role if exists */}
              {item.previousRole && (
                <p className="text-[12px] mb-3" style={{ color: "var(--fg-muted)" }}>
                  Previously: {item.previousRole.position} · {item.previousRole.period}
                </p>
              )}

              <p className="text-[13px] leading-relaxed mt-3" style={{ color: "var(--fg-secondary)" }}>
                {item.description}
              </p>

              {item.link && (
                <ExternalLink
                  href={item.link}
                  ariaLabel={`View work at ${item.company}`}
                  className="mt-3 inline-flex items-center text-[12px] font-medium transition-colors hover:opacity-70"
                  style={{ color: "var(--fg-muted)" }}
                >
                  View work <ArrowUpRight />
                </ExternalLink>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
