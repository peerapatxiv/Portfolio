import { Education as EducationType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

interface EducationProps {
  data: EducationType;
}

export default function Education({ data }: EducationProps) {
  return (
    <section id="education" className="mb-20">
      <SectionHeading title={data.title} />
      <div className="space-y-7">
        {data.items.map((item, i) => (
          <FadeIn key={i} delay={i * 80}>
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[13px] font-semibold text-stone-900">{item.institution}</div>
                  <div className="text-[13px] text-stone-600 mt-0.5">{item.degree}</div>
                  <div className="text-[12px] text-stone-400 mt-0.5">{item.major}</div>
                </div>
                <div className="text-[12px] font-mono text-stone-400 shrink-0">{item.period}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
