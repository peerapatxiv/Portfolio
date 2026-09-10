import { Projects as ProjectsType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import ExternalLink from "@/components/ui/ExternalLink";

interface ProjectsProps {
  data: ProjectsType;
}

function ArrowUpRight() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="mb-20">
      <SectionHeading title={data.title} />
      <p className="text-[13px] text-stone-500 mb-8 max-w-prose">{data.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200 rounded-lg overflow-hidden">
        {data.items.map((item, i) => (
          <FadeIn key={i} delay={i * 40}>
            <div className="bg-[#FAFAF9] p-5 h-full flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-[13px] font-semibold text-stone-900 leading-snug">{item.name}</h3>
                {item.link ? (
                  <ExternalLink
                    href={item.link}
                    ariaLabel={`View ${item.name}`}
                    className="text-stone-300 hover:text-stone-900 transition-colors mt-0.5 shrink-0"
                  >
                    <ArrowUpRight />
                  </ExternalLink>
                ) : null}
              </div>
              <div className="text-[11px] font-mono text-stone-400 mb-3">{item.period}</div>
              <p className="text-[12px] leading-relaxed text-stone-500 flex-1">{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
