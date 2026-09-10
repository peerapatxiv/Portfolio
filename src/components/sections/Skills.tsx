import { Skills as SkillsType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import FadeIn from "@/components/ui/FadeIn";

interface SkillsProps {
  data: SkillsType;
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="mb-20">
      <SectionHeading title={data.title} />
      <div className="space-y-7">
        {data.categories.map((cat, i) => (
          <FadeIn key={i} delay={i * 60}>
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-stone-400 uppercase mb-3">{cat.title}</div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill, j) => (
                  <Tag key={j} label={skill} />
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
