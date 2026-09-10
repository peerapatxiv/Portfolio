"use client";

import { useState } from "react";
import { ProjectItem } from "@/types/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";

interface FeaturedProjectProps {
  item: ProjectItem;
  index: number;
}

function ArrowUpRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FeaturedProject({ item, index }: FeaturedProjectProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <ExternalLink
      href={item.link}
      ariaLabel={`View ${item.name}`}
      className="group block"
    >
      <article
        className="relative rounded-xl p-6 transition-all duration-300 cursor-pointer"
        style={{
          background: hovered ? "var(--bg-card)" : "var(--bg-subtle)",
          border: `1px solid ${hovered ? "var(--border-strong)" : "var(--border)"}`,
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="label-xs mb-1.5" style={{ color: "var(--fg-muted)" }}>
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="text-[17px] font-bold tracking-tight leading-snug" style={{ color: "var(--fg)" }}>
              {item.name}
            </h3>
          </div>
          <span
            className="shrink-0 mt-1 transition-colors duration-200"
            style={{ color: hovered ? "var(--fg)" : "var(--fg-muted)" }}
          >
            <ArrowUpRight />
          </span>
        </div>

        <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--fg-secondary)" }}>
          {item.description}
        </p>

        <p className="label-xs" style={{ color: "var(--fg-muted)" }}>
          {item.period}
        </p>
      </article>
    </ExternalLink>
  );
}
