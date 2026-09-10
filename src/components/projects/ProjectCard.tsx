"use client";

import { useState } from "react";
import { ProjectItem } from "@/types/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";

interface ProjectCardProps {
  item: ProjectItem;
}

function ArrowUpRight() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M2.5 10.5L10.5 2.5M10.5 2.5H5M10.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProjectCard({ item }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <article
      className="group p-4 rounded-lg transition-all duration-200 h-full flex flex-col"
      style={{
        background: hovered ? "var(--bg-subtle)" : "transparent",
        border: `1px solid ${hovered ? "var(--border)" : "var(--border)"}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-[13px] font-semibold leading-snug" style={{ color: "var(--fg)" }}>
          {item.name}
        </h3>
        {item.link && (
          <span className="shrink-0 mt-0.5 transition-colors" style={{ color: hovered ? "var(--fg)" : "var(--fg-muted)" }}>
            <ArrowUpRight />
          </span>
        )}
      </div>
      <p className="label-xs mb-2" style={{ color: "var(--fg-muted)" }}>
        {item.period}
      </p>
      <p className="text-[12px] leading-relaxed flex-1" style={{ color: "var(--fg-secondary)" }}>
        {item.description}
      </p>
    </article>
  );

  if (item.link) {
    return (
      <ExternalLink href={item.link} ariaLabel={`View ${item.name}`} className="block h-full">
        {inner}
      </ExternalLink>
    );
  }

  return inner;
}
