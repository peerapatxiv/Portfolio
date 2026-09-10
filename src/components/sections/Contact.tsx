import { About } from "@/types/portfolio";
import FadeIn from "@/components/ui/FadeIn";

interface ContactProps {
  data: About;
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
      <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Contact({ data }: ContactProps) {
  return (
    <section
      id="contact"
      className="py-32 px-6 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <FadeIn>
        <p className="label-xs mb-6" style={{ color: "var(--fg-muted)" }}>
          Contact
        </p>
        <h2 className="display-lg max-w-2xl mb-8" style={{ color: "var(--fg)" }}>
          Let&apos;s build<br />something<br />together.
        </h2>
        <p className="text-[15px] mb-10 max-w-md" style={{ color: "var(--fg-secondary)" }}>
          Have a project, idea, or opportunity?
          I&apos;d love to hear about it.
        </p>
        <a
          href={`mailto:${data.email}`}
          className="group inline-flex items-center gap-3 text-[15px] font-semibold rounded-full px-7 py-3.5 transition-all duration-150 hover:opacity-80 active:scale-[0.98]"
          style={{ background: "var(--fg)", color: "var(--bg)" }}
        >
          Get in touch <ArrowRight />
        </a>

        <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-[13px]" style={{ color: "var(--fg-muted)" }}>
            {data.email}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
