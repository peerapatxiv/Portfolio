import { Certificates as CertificatesType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import ExternalLink from "@/components/ui/ExternalLink";

interface CertificatesProps {
  data: CertificatesType;
}

function ArrowUpRight() {
  return (
    <svg className="w-3 h-3 inline-block ml-0.5 -translate-y-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

export default function Certificates({ data }: CertificatesProps) {
  return (
    <section id="certificates" className="mb-20">
      <SectionHeading title={data.title} />
      <div className="space-y-8">
        {data.items.map((item, i) => (
          <FadeIn key={i} delay={i * 80}>
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="text-[13px] font-semibold text-stone-900">{item.title}</div>
                <div className="text-[12px] font-mono text-stone-400 shrink-0">{item.period}</div>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-stone-600 max-w-prose">{item.description}</p>
              {item.link && (
                <ExternalLink
                  href={item.link}
                  ariaLabel={`View certificate: ${item.title}`}
                  className="mt-2 inline-flex items-center gap-1 text-[12px] text-stone-400 hover:text-stone-900 transition-colors"
                >
                  View certificate <ArrowUpRight />
                </ExternalLink>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
