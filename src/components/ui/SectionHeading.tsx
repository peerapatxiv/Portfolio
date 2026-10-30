import FadeIn from "@/components/ui/FadeIn";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeading({ title, description, className = "" }: SectionHeadingProps) {
  return (
    <FadeIn className={`mb-12 max-w-2xl ${className}`}>
      <h2 className="section-title" style={{ color: "var(--fg)" }}>
        {title}
      </h2>
      {description && (
        <p className="text-[15px] leading-relaxed mt-3" style={{ color: "var(--fg-secondary)" }}>
          {description}
        </p>
      )}
    </FadeIn>
  );
}
