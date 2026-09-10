import { Projects as ProjectsType } from "@/types/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import FeaturedProject from "@/components/projects/FeaturedProject";
import ProjectCard from "@/components/projects/ProjectCard";

interface WorkProps {
  data: ProjectsType;
}

// Indices of the featured projects in data.json order
const FEATURED_NAMES = [
  "Foremost Mini Game",
  "Thailand Gallery Interactive Exhibition",
  "Journal Magnetic Attraction",
  "NIVEA",
  "Bluuu",
];

export default function Work({ data }: WorkProps) {
  const featured = FEATURED_NAMES.map((name) =>
    data.items.find((p) => p.name === name)
  ).filter(Boolean) as typeof data.items;

  const rest = data.items.filter(
    (p) => !FEATURED_NAMES.includes(p.name)
  );

  return (
    <section id="work" className="py-24 px-6 max-w-6xl mx-auto">
      <FadeIn>
        <SectionHeading label="Selected Work" title="What I've Built" />
      </FadeIn>

      {/* Featured grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {featured.map((item, i) => (
          <FadeIn key={item.name} delay={i * 70}>
            <FeaturedProject item={item} index={i} />
          </FadeIn>
        ))}
      </div>

      {/* Other projects */}
      {rest.length > 0 && (
        <>
          <FadeIn delay={400}>
            <p className="label-xs mt-16 mb-6" style={{ color: "var(--fg-muted)" }}>
              More Projects
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rest.map((item, i) => (
              <FadeIn key={item.name} delay={i * 50}>
                <ProjectCard item={item} />
              </FadeIn>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
