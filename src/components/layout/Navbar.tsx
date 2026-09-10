"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.slice(1);
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
          background: scrolled ? "var(--bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <nav
          className="max-w-6xl mx-auto flex items-center justify-between px-6 transition-all duration-300"
          style={{ height: scrolled ? "56px" : "72px" }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
            aria-label="Back to top"
          >
            <Logo size={24} style={{ color: "var(--fg)" } as React.CSSProperties} />
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-[13px] font-medium transition-colors duration-150"
                  style={{ color: "var(--fg-secondary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-secondary)")}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="mailto:peerapat.xiv@gmail.com"
            className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-full px-4 py-2 transition-all duration-150 hover:opacity-80"
            style={{
              background: "var(--fg)",
              color: "var(--bg)",
            }}
          >
            Let&apos;s Talk
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 -mr-2 transition-opacity hover:opacity-70"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ color: "var(--fg)" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden animate-fade-in"
          style={{ background: "var(--bg)", paddingTop: "72px" }}
        >
          <nav className="px-6 py-8" aria-label="Mobile navigation">
            <ul className="space-y-2" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left text-3xl font-bold tracking-tight py-3 transition-opacity hover:opacity-60"
                    style={{ color: "var(--fg)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <a
              href="mailto:peerapat.xiv@gmail.com"
              className="mt-8 inline-flex text-[13px] font-semibold rounded-full px-5 py-2.5"
              style={{ background: "var(--fg)", color: "var(--bg)" }}
              onClick={() => setMenuOpen(false)}
            >
              Let&apos;s Talk
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
