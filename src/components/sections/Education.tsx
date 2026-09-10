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
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="inline-block ml-0.5">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Education */}
        <div>
          <FadeIn>
            <SectionHeading label={education.title} title="Education" />
          </FadeIn>
          <div className="space-y-8">
            {education.items.map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[14px] font-semibold leading-snug" style={{ color: "var(--fg)" }}>
                      {item.institution}
                    </h3>
                    <span className="label-xs shrink-0" style={{ color: "var(--fg-muted)" }}>
                      {item.period}
                    </span>
                  </div>
                  <p className="text-[13px] mt-1" style={{ color: "var(--fg-secondary)" }}>
                    {item.degree}
                  </p>
                  <p className="text-[12px] mt-0.5" style={{ color: "var(--fg-muted)" }}>
                    {item.major}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <FadeIn delay={60}>
            <SectionHeading label={certificates.title} title="Certificates" />
          </FadeIn>
          <div className="space-y-8">
            {certificates.items.map((item, i) => (
              <FadeIn key={i} delay={60 + i * 80}>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[14px] font-semibold leading-snug" style={{ color: "var(--fg)" }}>
                      {item.title}
                    </h3>
                    <span className="label-xs shrink-0" style={{ color: "var(--fg-muted)" }}>
                      {item.period}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed mt-2" style={{ color: "var(--fg-secondary)" }}>
                    {item.description}
                  </p>
                  {item.link && (
                    <ExternalLink
                      href={item.link}
                      ariaLabel={`View certificate: ${item.title}`}
                      className="mt-2 inline-flex items-center text-[12px] font-medium transition-opacity hover:opacity-70"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      View certificate <ArrowUpRight />
                    </ExternalLink>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
