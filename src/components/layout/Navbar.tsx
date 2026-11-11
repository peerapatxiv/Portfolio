"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, animate, useMotionTemplate, useMotionValue, useTransform } from "motion/react";
import Logo from "@/components/ui/Logo";
import data from "@/data/data.json";

// Liquid pill: the edge moving toward the new link is quicker than the trailing edge.
const LEAD  = { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.9 };
const TRAIL = { type: "spring" as const, stiffness: 190, damping: 28, mass: 0.9 };
const HOVER = { type: "spring" as const, stiffness: 420, damping: 38 };

const NAV_LINKS = [
  { href: "experience", label: "Experience" },
  { href: "skills",     label: "Skills" },
  { href: "work",       label: "Work" },
  { href: "education",  label: "Education" },
  { href: "contact",    label: "Contact" },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState<string>("");
  const [hovered,        setHovered]        = useState<string | null>(null);

  // While a nav click is scrolling the page, hold the clicked item active
  // so the pill doesn't hop through every section on the way.
  const lockRef = useRef<string | null>(null);

  // Header state and current section, both read from scroll position.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 48);
      if (lockRef.current) return;

      // Back in the hero: no section is active.
      if (window.scrollY < window.innerHeight * 0.5) return setActiveSection("");

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) return setActiveSection(NAV_LINKS[NAV_LINKS.length - 1].href);

      // The last section whose top has passed 40% of the viewport.
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const { href } of NAV_LINKS) {
        const el = document.getElementById(href);
        if (el && el.getBoundingClientRect().top <= line) current = href;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;

    lockRef.current = id;
    setActiveSection(id);
    let release = window.setTimeout(() => (lockRef.current = null), 1200);
    // Release the lock once scrolling settles.
    const onScrollSettle = () => {
      window.clearTimeout(release);
      release = window.setTimeout(() => {
        lockRef.current = null;
        window.removeEventListener("scroll", onScrollSettle);
      }, 150);
    };
    window.addEventListener("scroll", onScrollSettle, { passive: true });

    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // ── Desktop indicators: measured from the buttons so they can glide and stretch ──
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeL = useMotionValue(0);
  const activeR = useMotionValue(0);
  const activeW = useTransform(() => activeR.get() - activeL.get());
  const activeShown = useRef(false);
  // Clip for the dark label layer, so text turns dark exactly where the pill is.
  const activeClip = useMotionTemplate`inset(4px calc(100% - ${activeR}px) 4px ${activeL}px round 999px)`;

  const hoverL = useMotionValue(0);
  const hoverW = useMotionValue(0);
  const hoverShown = useRef(false);

  const edges = (id: string) => {
    const el = itemRefs.current[id];
    return el ? { l: el.offsetLeft, r: el.offsetLeft + el.offsetWidth } : null;
  };

  const moveActive = useCallback((id: string, instant = false) => {
    const e = edges(id);
    if (!e) return;
    if (instant || !activeShown.current) {
      activeL.jump(e.l);
      activeR.jump(e.r);
      activeShown.current = true;
      return;
    }
    const movingRight = e.l > activeL.get();
    animate(activeL, e.l, movingRight ? TRAIL : LEAD);
    animate(activeR, e.r, movingRight ? LEAD : TRAIL);
  }, [activeL, activeR]);

  useLayoutEffect(() => {
    if (activeSection) moveActive(activeSection);
    else activeShown.current = false;
  }, [activeSection, moveActive]);

  useLayoutEffect(() => {
    if (!hovered) {
      hoverShown.current = false;
      return;
    }
    const e = edges(hovered);
    if (!e) return;
    if (!hoverShown.current) {
      hoverL.jump(e.l);
      hoverW.jump(e.r - e.l);
      hoverShown.current = true;
    } else {
      animate(hoverL, e.l, HOVER);
      animate(hoverW, e.r - e.l, HOVER);
    }
  }, [hovered, hoverL, hoverW]);

  // Re-measure when fonts load or the layout changes size.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const ro = new ResizeObserver(() => {
      if (activeSection) moveActive(activeSection, true);
    });
    ro.observe(list);
    return () => ro.disconnect();
  }, [activeSection, moveActive]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "saturate(140%) blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(140%) blur(16px)" : "none",
        }}
      >
        <nav
          className="max-w-6xl mx-auto flex items-center justify-between px-6 transition-all duration-300"
          style={{ height: scrolled ? "66px" : "96px" }}
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
          {/* Glass capsule with a liquid active pill and a gliding hover highlight */}
          <ul
            ref={listRef}
            className="relative hidden md:flex items-center gap-0.5 rounded-full p-1 backdrop-blur-xl"
            style={{
              background: "color-mix(in srgb, var(--bg-card) 70%, transparent)",
              border: "1px solid var(--border)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
            }}
            role="list"
            onMouseLeave={() => setHovered(null)}
          >
            <motion.span
              aria-hidden="true"
              className="absolute top-1 bottom-1 left-0 rounded-full"
              style={{ x: hoverL, width: hoverW, background: "var(--bg-subtle)" }}
              animate={{ opacity: hovered && hovered !== activeSection ? 1 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute top-1 bottom-1 left-0 rounded-full"
              style={{
                x: activeL,
                width: activeW,
                // Accent-to-violet fill with a glossy top, crisp inner edge and a tight glow
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 55%), linear-gradient(120deg, var(--pill-from), var(--pill-to))",
                boxShadow:
                  "inset 0 0 0 1px rgba(255, 255, 255, 0.18), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 6px 20px -8px color-mix(in srgb, var(--pill-to) 85%, transparent)",
              }}
              initial={false}
              animate={{ opacity: activeSection ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* A quick shine sweeps across whenever the pill lands on a new link */}
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <motion.span
                  key={activeSection}
                  className="absolute inset-y-0 w-1/2"
                  style={{ background: "linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.45), transparent)" }}
                  initial={{ left: "-60%" }}
                  animate={{ left: "120%" }}
                  transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1], delay: 0.25 }}
                />
              </span>
            </motion.span>

            {/* Dark copy of the labels, visible only inside the pill */}
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 flex items-center gap-0.5 p-1"
              style={{ clipPath: activeClip, color: "var(--on-pill)" }}
              initial={false}
              animate={{ opacity: activeSection ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {NAV_LINKS.map(link => (
                <span key={link.href} className="px-3.5 py-1.5 text-[12.5px] font-medium">
                  {link.label}
                </span>
              ))}
            </motion.span>

            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href;
              const isHovered = hovered === link.href;
              return (
                <li key={link.href}>
                  <button
                    ref={el => { itemRefs.current[link.href] = el; }}
                    onClick={() => handleNavClick(link.href)}
                    onMouseEnter={() => setHovered(link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className="relative px-3.5 py-1.5 text-[12.5px] font-medium rounded-full transition-colors duration-300"
                    style={{ color: isActive || isHovered ? "var(--fg)" : "var(--fg-secondary)" }}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <a
            href={`mailto:${data.about.email}`}
            className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-full px-4 py-2 transition-[filter] hover:brightness-110"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            Email me
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
            style={{ background: "var(--bg)", paddingTop: "96px" }}
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
                      aria-current={activeSection === link.href ? "true" : undefined}
                      className="w-full flex items-center gap-3 text-left text-[2.5rem] font-bold tracking-tight py-2 transition-opacity hover:opacity-50"
                      style={{ color: activeSection === link.href ? "var(--accent)" : "var(--fg)" }}
                    >
                      {link.label}
                      {activeSection === link.href && (
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: "var(--accent)", boxShadow: "0 0 12px 2px var(--accent)" }}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href={`mailto:${data.about.email}`}
                className="mt-10 inline-flex text-[13px] font-semibold rounded-full px-5 py-2.5"
                style={{ background: "var(--accent)", color: "var(--on-accent)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
              >
                Email me
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
