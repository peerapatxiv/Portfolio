import { About as AboutType } from "@/types/portfolio";
import FadeIn from "@/components/ui/FadeIn";

interface AboutProps {
  data: AboutType;
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="mb-20">
      <FadeIn>
        <p className="text-[15px] leading-relaxed text-stone-700 max-w-prose">
          {data.bio}
        </p>

        <div className="mt-8 space-y-1">
          <a
            href={`mailto:${data.email}`}
            className="flex items-center gap-2 text-[13px] text-stone-500 hover:text-stone-900 transition-colors group w-fit"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="group-hover:underline underline-offset-2">{data.email}</span>
          </a>
          <a
            href={`tel:${data.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-[13px] text-stone-500 hover:text-stone-900 transition-colors group w-fit"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="group-hover:underline underline-offset-2">{data.phone}</span>
          </a>
          <div className="flex items-start gap-2 text-[13px] text-stone-400 pt-1">
            <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <div>{data.address.line2}</div>
              <div>{data.address.line3}</div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
