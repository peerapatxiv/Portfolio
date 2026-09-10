import { About } from "@/types/portfolio";
import Logo from "@/components/ui/Logo";

interface HeroProps {
  data: About;
}

function ArrowDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero({ data }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between px-6 pt-28 pb-12 max-w-6xl mx-auto"
      aria-label="Introduction"
    >
      {/* Top row: logo + location */}
      <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: "0ms" }}>
        <Logo size={32} style={{ color: "var(--fg)" } as React.CSSProperties} />
        <span className="label-xs" style={{ color: "var(--fg-muted)" }}>
          Bangkok, TH
        </span>
      </div>

      {/* Main display */}
      <div className="mt-auto">
        <div
          className="animate-fade-up overflow-hidden"
          style={{ animationDelay: "80ms" }}
        >
          <p className="label-xs mb-6" style={{ color: "var(--fg-muted)" }}>
            {data.role}
          </p>
          <h1 className="display-xl" style={{ color: "var(--fg)" }}>
            {data.firstname}
            <br />
            {data.lastname}
          </h1>
        </div>

        <div
          className="animate-fade-up mt-8 max-w-lg"
          style={{ animationDelay: "180ms" }}
        >
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
            {data.bio}
          </p>
        </div>

        <div
          className="animate-fade-up flex flex-wrap items-center gap-3 mt-10"
          style={{ animationDelay: "280ms" }}
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-5 py-2.5 transition-all duration-150 hover:opacity-80 active:scale-[0.98]"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
          >
            View my work <ArrowDown />
          </a>
          <a
            href="mailto:peerapat.xiv@gmail.com"
            className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-5 py-2.5 transition-all duration-150 hover:border-[var(--fg)] active:scale-[0.98]"
            style={{
              background: "transparent",
              border: "1px solid var(--border-strong)",
              color: "var(--fg)",
            }}
          >
            Get in touch <ArrowRight />
          </a>
        </div>
      </div>

      {/* Bottom row: scroll indicator */}
      <div
        className="animate-fade-in mt-16 flex items-center gap-3"
        style={{ animationDelay: "500ms", color: "var(--fg-muted)" }}
      >
        <div className="h-px w-8" style={{ background: "var(--border-strong)" }} />
        <span className="label-xs">Scroll to explore</span>
      </div>
    </section>
  );
}
