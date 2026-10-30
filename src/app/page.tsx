import data from "@/data/data.json";
import { PortfolioData } from "@/types/portfolio";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

const portfolio = data as PortfolioData;

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero
          data={portfolio.about}
          current={portfolio.experience.items[0]}
          degree={portfolio.education.items[0]}
        />
        <Work data={portfolio.projects} />
        <Experience data={portfolio.experience} />
        <Skills data={portfolio.skills} />
        <Education education={portfolio.education} certificates={portfolio.certificates} />
        <Contact data={portfolio.about} languages={portfolio.languages} />
      </main>
      <Footer data={portfolio.about} />
    </>
  );
}
