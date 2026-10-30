import { Education as EducationType, Certificates as CertificatesType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import ExternalLink from "@/components/ui/ExternalLink";

interface EducationProps {
  education: EducationType;
  certificates: CertificatesType;
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Education({ education, certificates }: EducationProps) {
  return (
    <section
      id="education"
      className="py-24 px-6 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16">
        {/* Education */}
        <div>
          <SectionHeading title="Education" />
          <div className="space-y-8">
            {education.items.map((item, i) => (
              <FadeIn key={i}>
                <p className="label-xs" style={{ color: "var(--fg-muted)" }}>{item.period}</p>
                <h3 className="text-[16px] font-semibold leading-snug mt-1" style={{ color: "var(--fg)" }}>
                  {item.institution}
                </h3>
                <p className="text-[14px] mt-1" style={{ color: "var(--fg-secondary)" }}>
                  {item.degree}, {item.major}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Certificates: compact list; the description shows on wider screens only */}
        <div>
          <SectionHeading title="Certificates" description={certificates.description} />
          <ul style={{ borderTop: "1px solid var(--border)" }} role="list">
            {certificates.items.map((item, i) => {
              const row = (
                <div className="group flex items-start justify-between gap-6 py-4">
                  <div className="min-w-0">
                    <h3
                      className="text-[15px] font-semibold leading-snug transition-colors group-hover:text-[var(--accent)]"
                      style={{ color: "var(--fg)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="hidden sm:block text-[13px] leading-relaxed mt-1 max-w-[36rem]" style={{ color: "var(--fg-secondary)" }}>
                      {item.description}
                    </p>
                  </div>
                  <span className="label-xs shrink-0 inline-flex items-center gap-2 pt-0.5" style={{ color: "var(--fg-muted)" }}>
                    {item.period}
                    {item.link && <span className="transition-colors group-hover:text-[var(--accent)]"><ArrowUpRight /></span>}
                  </span>
                </div>
              );
              return (
                <li key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  {item.link ? (
                    <ExternalLink href={item.link} ariaLabel={`View certificate: ${item.title}`} className="block">
                      {row}
                    </ExternalLink>
                  ) : row}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
