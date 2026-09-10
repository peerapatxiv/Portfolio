"use client";

import { useState, useEffect } from "react";
import { About } from "@/types/portfolio";

interface NavItem {
  href: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#certificates", label: "Certificates" },
];

interface SidebarProps {
  about: About;
}

export default function Sidebar({ about }: SidebarProps) {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map(n => n.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-50 bg-[#FAFAF9]/95 backdrop-blur border-b border-stone-100 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-[13px] font-semibold tracking-tight text-stone-900">
            {about.firstname} {about.lastname}
          </div>
          <div className="text-[11px] text-stone-400">{about.role}</div>
        </div>
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="text-stone-500 hover:text-stone-900 transition-colors p-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <nav className="lg:hidden fixed top-[57px] left-0 right-0 z-40 bg-[#FAFAF9] border-b border-stone-100 shadow-sm px-6 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left text-[13px] py-1.5 transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-stone-900 font-medium"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 xl:w-72 lg:px-10 lg:py-14 justify-between">
        <div>
          <div className="mb-10">
            <h1 className="text-[22px] font-bold tracking-tight text-stone-900 leading-tight">
              {about.firstname}<br />{about.lastname}
            </h1>
            <div className="text-[13px] text-stone-500 mt-2">{about.role}</div>
          </div>

          <nav aria-label="Page sections">
            <ul className="space-y-1">
              {NAV_ITEMS.map(item => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`group flex items-center gap-3 text-[12px] py-1 w-full text-left transition-colors ${
                        isActive ? "text-stone-900" : "text-stone-400 hover:text-stone-700"
                      }`}
                    >
                      <span
                        className={`block h-px transition-all duration-300 ${
                          isActive ? "w-8 bg-stone-900" : "w-4 bg-stone-300 group-hover:w-6 group-hover:bg-stone-500"
                        }`}
                      />
                      <span className={`tracking-wide uppercase text-[10px] font-semibold ${isActive ? "" : ""}`}>
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="space-y-1.5">
          <a
            href={`mailto:${about.email}`}
            className="flex items-center gap-2 text-[11px] text-stone-400 hover:text-stone-900 transition-colors group"
          >
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="group-hover:underline underline-offset-2">{about.email}</span>
          </a>
          <div className="text-[11px] text-stone-300">
            {about.address.line2}
          </div>
        </div>
      </aside>
    </>
  );
}
