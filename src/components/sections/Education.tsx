"use client";

import { Education as EducationType, Certificates as CertificatesType, CertificateItem } from "@/types/portfolio";
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

function CapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 9l10-5 10 5-10 5L2 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// Groups certificates by issuer, keeping the order in which issuers first appear.
function groupByIssuer(items: CertificateItem[]) {
  const groups = new Map<string, CertificateItem[]>();
  items.forEach(item => {
    const key = item.issuer || "Other";
    groups.set(key, [...(groups.get(key) ?? []), item]);
  });
  return [...groups.entries()];
}

function CertificateRow({ item }: { item: CertificateItem }) {
  const row = (
    <div className="group flex items-start justify-between gap-6 py-4">
      <div className="min-w-0">
        <h4
          className="text-[15px] font-semibold leading-snug transition-colors group-hover:text-[var(--accent)]"
          style={{ color: "var(--fg)" }}
        >
          {item.title}
        </h4>
        <p className="text-[13px] leading-relaxed mt-1 line-clamp-2" style={{ color: "var(--fg-secondary)" }}>
          {item.description}
        </p>
      </div>
      <span className="label-xs shrink-0 inline-flex items-center gap-2 pt-0.5 whitespace-nowrap" style={{ color: "var(--fg-muted)" }}>
        {item.period.split("·")[0].trim()}
        {item.link && (
          <span className="transition-colors group-hover:text-[var(--accent)]"><ArrowUpRight /></span>
        )}
      </span>
    </div>
  );

  return (
    <li style={{ borderTop: "1px solid var(--border)" }}>
      {item.link ? (
        <ExternalLink href={item.link} ariaLabel={`View certificate: ${item.title}`} className="block">
          {row}
        </ExternalLink>
      ) : row}
    </li>
  );
}

export default function Education({ education, certificates }: EducationProps) {
  const groups = groupByIssuer(certificates.items);

  return (
    <section
      id="education"
      className="py-24 px-6 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-16">
        {/* Education: the degree gets the accent card, earlier schooling a quiet one */}
        <div>
          <SectionHeading title="Education" description={education.description} />
          <div className="space-y-3">
            {education.items.map((item, i) => {
              const primary = i === 0;
              return (
                <FadeIn key={item.institution}>
                  <article
                    className="rounded-2xl p-6"
                    style={
                      primary
                        ? { background: "var(--accent-soft)", border: "1px solid color-mix(in srgb, var(--accent) 22%, transparent)" }
                        : { background: "var(--bg-card)", border: "1px solid var(--border)" }
                    }
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                        style={
                          primary
                            ? { background: "var(--accent)", color: "var(--on-accent)" }
                            : { background: "var(--bg-subtle)", color: "var(--fg-secondary)" }
                        }
                      >
                        <CapIcon />
                      </span>
                      <span
                        className="label-xs rounded-full px-2.5 py-1"
                        style={{ background: primary ? "var(--bg-card)" : "var(--bg-subtle)", color: "var(--fg-secondary)" }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <h3 className="text-[19px] font-bold tracking-tight leading-snug mt-5" style={{ color: "var(--fg)" }}>
                      {item.institution}
                    </h3>
                    <p className="text-[14px] font-medium mt-2" style={{ color: primary ? "var(--accent)" : "var(--fg)" }}>
                      {item.degree}
                    </p>
                    <p className="text-[14px] leading-relaxed mt-0.5" style={{ color: "var(--fg-secondary)" }}>
                      {item.major}
                    </p>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Certificates, grouped by issuer */}
        <div>
          <SectionHeading title="Certificates" description={certificates.description} />
          <div className="space-y-10">
            {groups.map(([issuer, items]) => (
              <FadeIn key={issuer}>
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="text-[15px] font-bold tracking-tight" style={{ color: "var(--fg)" }}>
                    {issuer}
                  </h3>
                  <span className="label-xs" style={{ color: "var(--fg-muted)" }}>
                    {items.length} {items.length === 1 ? "certificate" : "certificates"}
                  </span>
                </div>
                <ul role="list" style={{ borderBottom: "1px solid var(--border)" }}>
                  {items.map(item => <CertificateRow key={item.title} item={item} />)}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
