# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server at localhost:3000
npm run build      # production build → out/
npm run lint       # ESLint

# Type-check (the .bin/tsc symlink is broken on this machine — use node directly)
node node_modules/typescript/lib/tsc.js --noEmit
```

No test suite exists.

## Stack

- **Next.js 16** (App Router, static export)
- **React 19**
- **TypeScript 5** (strict)
- **Tailwind CSS v4** — uses `@import "tailwindcss"` syntax, not the v3 `@tailwind` directives
- **Geist** font family (loaded via `next/font/google`)

## Architecture

Single-page portfolio with static export. All content comes from `src/data/data.json` — never hardcode portfolio information in components.

```
src/data/data.json          ← single source of truth for all content
src/types/portfolio.ts      ← TypeScript interfaces mirroring data.json
src/app/page.tsx            ← composes all sections
src/app/layout.tsx          ← metadata, fonts, root HTML
src/components/layout/      ← Sidebar (sticky nav + active-section tracking)
src/components/sections/    ← one file per content section
src/components/ui/          ← FadeIn, SectionHeading, Tag, ExternalLink
```

The `Sidebar` component uses `IntersectionObserver` to track the active section and highlight the nav accordingly. On mobile it renders a hamburger menu. It is a `"use client"` component; all section components are server components except where `FadeIn` is used.

## Deployment

Deployed to GitHub Pages at `peerapatxiv.github.io/Portfolio` via `.github/workflows/deploy.yml`.

Push to `main` triggers the workflow automatically.

**basePath quirk**: `next.config.ts` sets `basePath: "/Portfolio"` and `assetPrefix: "/Portfolio"` only when `NODE_ENV === "production"`. Local dev (`npm run dev`) runs without a base path. The static export lands in `out/`.

`images: { unoptimized: true }` and `trailingSlash: true` are required by the static export + GitHub Pages combination — do not remove them.

## Data rules

- `data.json` sections: `about`, `experience`, `languages`, `education`, `skills`, `projects`, `certificates`
- Several `link` fields may be empty strings — always guard with `{link && ...}` or the `ExternalLink` component (which returns `null` when `href` is falsy)
- `experience.items[1]` has a nested `previousRole` (intern → full-time promotion) — optional field
- `education.items[0].period` is "2021 - Present" (ongoing degree)
