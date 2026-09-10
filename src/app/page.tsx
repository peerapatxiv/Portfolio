import data from "@/data/data.json";
import { PortfolioData } from "@/types/portfolio";
import Sidebar from "@/components/layout/Sidebar";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Certificates from "@/components/sections/Certificates";
import Languages from "@/components/sections/Languages";

const portfolio = data as PortfolioData;

export default function Home() {
  return (
    <div className="min-h-screen">
      <Sidebar about={portfolio.about} />

      {/* Main content — offset for desktop sidebar */}
      <main className="lg:pl-64 xl:pl-72">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 xl:px-16 py-16 lg:py-20">


          {/* Mobile page header */}
          <div className="lg:hidden mb-12">
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">
              {portfolio.about.firstname} {portfolio.about.lastname}
            </h1>
            <div className="text-[13px] text-stone-500 mt-1">{portfolio.about.role}</div>
          </div>

          <About data={portfolio.about} />
          <Experience data={portfolio.experience} />
          <Projects data={portfolio.projects} />
          <Skills data={portfolio.skills} />
          <Education data={portfolio.education} />
          <Certificates data={portfolio.certificates} />
          <Languages data={portfolio.languages} />

          <footer className="mt-8 pt-8 border-t border-stone-100">
            <p className="text-[11px] text-stone-300">
              {portfolio.about.firstname} {portfolio.about.lastname} · {portfolio.about.address.line2}
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
