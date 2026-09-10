import { Languages as LanguagesType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

interface LanguagesProps {
  data: LanguagesType;
}

export default function Languages({ data }: LanguagesProps) {
  return (
    <section id="languages" className="mb-20">
      <SectionHeading title={data.title} />
      <div className="space-y-4">
        {data.items.map((item, i) => (
          <FadeIn key={i} delay={i * 60}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-stone-900">{item.name}</span>
              <span className="text-[12px] text-stone-400">{item.level}</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
