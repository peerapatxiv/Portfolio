"use client";

import { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "@/components/ui/Logo";

const NAV_LINKS = [
  { href: "work",       label: "Work" },
  { href: "experience", label: "Experience" },
  { href: "about",      label: "About" },
  { href: "contact",    label: "Contact" },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState<string>("");
  const layoutId = useId();

  // Compact navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href);
    const observers: IntersectionObserver[] = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -65% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "color-mix(in oklch, var(--bg) 88%, transparent)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <nav
          className="max-w-6xl mx-auto flex items-center justify-between px-6 transition-all duration-300"
          style={{ height: scrolled ? "54px" : "72px" }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition-opacity hover:opacity-60"
            aria-label="Back to top"
          >
            <Logo size={22} style={{ color: "var(--fg)" }} />
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="relative px-3 py-1.5 text-[12px] font-medium transition-colors duration-150 rounded-md"
                    style={{ color: isActive ? "var(--fg)" : "var(--fg-secondary)" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={layoutId}
                        className="absolute inset-0 rounded-md"
                        style={{ background: "var(--bg-subtle)" }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <a
            href="mailto:peerapat.xiv@gmail.com"
            className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-full px-4 py-2 transition-opacity hover:opacity-80"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
          >
            Let&apos;s Talk
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden p-2 -mr-2 transition-opacity hover:opacity-60"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ color: "var(--fg)" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "var(--bg)", paddingTop: "72px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="px-8 py-10" aria-label="Mobile navigation">
              <ul className="space-y-1" role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left text-[2.5rem] font-bold tracking-tight py-2 transition-opacity hover:opacity-50"
                      style={{ color: "var(--fg)" }}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href="mailto:peerapat.xiv@gmail.com"
                className="mt-10 inline-flex text-[13px] font-semibold rounded-full px-5 py-2.5"
                style={{ background: "var(--fg)", color: "var(--bg)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
              >
                Let&apos;s Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
