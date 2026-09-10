import { Experience as ExperienceType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import ExternalLink from "@/components/ui/ExternalLink";

interface ExperienceProps {
  data: ExperienceType;
}

function ArrowUpRight() {
  return (
    <svg className="w-3 h-3 inline-block ml-0.5 -translate-y-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="mb-20">
      <SectionHeading title={data.title} />
      <div className="space-y-10">
        {data.items.map((item, i) => (
          <FadeIn key={i} delay={i * 80}>
            <div className="group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-semibold text-stone-900">{item.company}</span>
                  </div>
                  <div className="mt-0.5 text-[13px] text-stone-600">{item.position}</div>
                  {item.previousRole && (
                    <div className="mt-0.5 text-[12px] text-stone-400 flex items-center gap-1.5">
                      <span>Previously:</span>
                      <span>{item.previousRole.position}</span>
                      <span className="text-stone-300">·</span>
                      <span>{item.previousRole.period}</span>
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[12px] font-mono text-stone-400 whitespace-nowrap">{item.period}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">{item.location}</div>
                </div>
              </div>

              <p className="mt-3 text-[13px] leading-relaxed text-stone-600 max-w-prose">
                {item.description}
              </p>

              {item.link && (
                <ExternalLink
                  href={item.link}
                  ariaLabel={`View work at ${item.company}`}
                  className="mt-2 inline-flex items-center gap-1 text-[12px] text-stone-400 hover:text-stone-900 transition-colors"
                >
                  View work <ArrowUpRight />
                </ExternalLink>
              )}

              {i < data.items.length - 1 && (
                <div className="mt-10 border-t border-stone-100" />
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
