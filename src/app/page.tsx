import data from "@/data/data.json";
import { PortfolioData } from "@/types/portfolio";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

const portfolio = data as PortfolioData;

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero data={portfolio.about} />
        <Work data={portfolio.projects} />
        <Experience data={portfolio.experience} />
        <Skills data={portfolio.skills} />
        <About data={portfolio.about} languages={portfolio.languages} />
        <Education education={portfolio.education} certificates={portfolio.certificates} />
        <Contact data={portfolio.about} />
      </main>
      <Footer data={portfolio.about} />
    </>
  );
}
