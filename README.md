# rishisakhija-portfolio

Personal portfolio website for Rishi Sakhija — AI/ML Engineer building intelligent systems for the agentic era.

## Tech Stack

- **Astro** — Static site generator with Client Router (View Transitions)
- **Vanilla CSS** — Design tokens, CSS custom properties (Electric Control Room theme)
- **Self-hosted fonts** — Space Grotesk, Inter, JetBrains Mono via @fontsource
- **Content Collections** — @astrojs/content for Research and Blog
- **GitHub Pages** — Deployed via GitHub Actions

## Features

- **Agent-style page transitions** — Sweep line with agent nodes and status chip (~800ms)
- **Terminal hero component** — Typing/erasing animation with blinking red cursor
- **Network canvas** — Subtle node-and-line animation reacting to mouse
- **Fluid typography** — Clamp-based scaling, gradient hero name
- **Responsive** — Mobile-first, tested at 360px, 768px, 1280px
- **Accessible** — WCAG AA contrast, semantic HTML, focus states, keyboard navigation
- **Reduced motion support** — Disables all animations when preferred

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro check  # Type-check Astro files
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── layouts/          # Base HTML layout with transition overlay
├── pages/            # Route pages (7 pages + dynamic routes)
├── styles/           # Global styles & design tokens
├── scripts/          # Client-side JS (terminal, network, transitions)
├── data/             # Content (single source of truth)
└── content/          # Content collections (research, blog)
```

## Design System

Electric Control Room theme defined in `src/styles/tokens.css`:
- **Primary**: Blue (#2F7BFF) — buttons, links, glows, agent nodes
- **Accent**: Red (#FF4B2B) — status dot, active nav marker, transition leading edge, terminal cursor
- **Background**: Deep navy (#05070D) with subtle dot pattern
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (labels/terminal)

## Deployment

Push to `master`/`main` triggers automatic deployment to GitHub Pages via the official Astro deploy action.

Site: https://rishisakhija.github.io/