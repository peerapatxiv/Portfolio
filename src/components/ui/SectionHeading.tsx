import FadeIn from "@/components/ui/FadeIn";
import RevealText from "@/components/ui/RevealText";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeading({ title, description, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 max-w-2xl ${className}`}>
      <RevealText text={title} className="section-title" style={{ color: "var(--fg)" }} />
      {description && (
        <FadeIn delay={150}>
          <p className="text-[15px] leading-relaxed mt-3" style={{ color: "var(--fg-secondary)" }}>
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
