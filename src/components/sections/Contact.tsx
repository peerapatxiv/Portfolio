"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { About, Languages } from "@/types/portfolio";
import { EASE, DUR } from "@/lib/motion";

interface ContactProps {
  data: About;
  languages: Languages;
}

const LINES = ["Let's build", "something", "together."];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
      <dt className="text-[13px]" style={{ color: "var(--fg-muted)" }}>{label}</dt>
      <dd className="text-[15px] min-w-0 break-words" style={{ color: "var(--fg)" }}>{children}</dd>
    </div>
  );
}

const linkClass = "underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]";

export default function Contact({ data, languages }: ContactProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${data.email}`;
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="py-28 px-6 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-end">
        <div>
          {/* Each line slides up from behind a mask */}
          <h2 className="display-lg mb-8" aria-label="Let's build something together.">
            {LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  style={{ color: "var(--fg)" }}
                  initial={{ y: "110%" }}
                  animate={inView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: DUR.emphasis, ease: EASE.out, delay: i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <p className="text-[16px] mb-10 max-w-md" style={{ color: "var(--fg-secondary)" }}>
            Have a project, idea or role in mind? I&apos;d love to hear about it.
          </p>

          <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-3 text-[15px] font-semibold rounded-full px-7 py-3.5 transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            Email me
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 text-[15px] font-semibold rounded-full px-6 py-3.5 transition-colors hover:border-[var(--fg)]"
            style={{ border: "1px solid var(--border-strong)", color: copied ? "var(--accent)" : "var(--fg)" }}
            aria-live="polite"
          >
            {copied ? "Email copied" : "Copy email"}
          </button>
          </div>
        </div>

        <div>
          <dl style={{ borderTop: "1px solid var(--border)" }}>
            <Row label="Email">
              <a href={`mailto:${data.email}`} className={linkClass}>{data.email}</a>
            </Row>
            {data.linkedin && (
              <Row label="LinkedIn">
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {data.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </Row>
            )}
            {data.github && (
              <Row label="GitHub">
                <a href={data.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {data.github.replace(/^https?:\/\//, "")}
                </a>
              </Row>
            )}
            <Row label="Based in">{data.address.line3.replace(/\s*\d{4,6}/, "")}</Row>
            <Row label="Languages">
              <ul role="list" className="space-y-1">
                {languages.items.map(lang => (
                  <li key={lang.name}>
                    {lang.name}{" "}
                    <span className="text-[13px]" style={{ color: "var(--fg-muted)" }}>({lang.level.toLowerCase()})</span>
                  </li>
                ))}
              </ul>
            </Row>
          </dl>
        </div>
      </div>
    </section>
  );
}
