import { About as AboutType, Languages as LanguagesType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

interface AboutProps {
  data: AboutType;
  languages: LanguagesType;
}

export default function About({ data, languages }: AboutProps) {
  return (
    <section
      id="about"
      className="py-24 px-6 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <FadeIn>
        <SectionHeading label={data.profileTitle} title="About" />
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Bio */}
        <FadeIn>
          <p className="text-[16px] leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
            {data.bio}
          </p>

          <div className="mt-8 space-y-2">
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-3 group w-fit transition-opacity hover:opacity-70"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: "var(--fg-muted)" }}>
                <path d="M1 3.5L7 7.5L13 3.5M1 3.5H13V11.5H1V3.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[13px] group-hover:underline underline-offset-2" style={{ color: "var(--fg-secondary)" }}>
                {data.email}
              </span>
            </a>
            <div className="flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: "var(--fg-muted)" }}>
                <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4Zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="currentColor" />
              </svg>
              <span className="text-[13px]" style={{ color: "var(--fg-secondary)" }}>
                {data.address.line2}, {data.address.line3}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Languages */}
        <FadeIn delay={120}>
          <div>
            <p className="label-xs mb-6" style={{ color: "var(--fg-muted)" }}>
              {languages.title}
            </p>
            <div className="space-y-4">
              {languages.items.map((lang, i) => (
                <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="text-[14px] font-semibold" style={{ color: "var(--fg)" }}>
                    {lang.name}
                  </span>
                  <span className="text-[12px]" style={{ color: "var(--fg-muted)" }}>
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
