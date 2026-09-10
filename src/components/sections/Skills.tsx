import { Skills as SkillsType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import FadeIn from "@/components/ui/FadeIn";

interface SkillsProps {
  data: SkillsType;
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section
      id="skills"
      className="py-24 px-6 max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <FadeIn>
        <SectionHeading label={data.title} title="Skills" />
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.categories.map((cat, i) => (
          <FadeIn key={i} delay={i * 70}>
            <div>
              <p className="label-xs mb-4" style={{ color: "var(--fg-muted)" }}>
                {cat.title}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill, j) => (
                  <Tag key={j} label={skill} variant="default" />
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
