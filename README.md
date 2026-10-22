# rishisakhija.github.io

Personal portfolio website showcasing my projects, skills, and experience.

## Tech Stack

- **Astro** — Static site generator with View Transitions
- **Vanilla CSS** — Design tokens, CSS custom properties
- **Self-hosted fonts** — Space Grotesk, Inter, JetBrains Mono via @fontsource
- **GitHub Pages** — Deployed via GitHub Actions

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro check  # Type-check
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── layouts/          # Base HTML layout
├── pages/            # Route pages (index, projects, about, contact)
├── styles/           # Global styles & design tokens
├── data/             # Content (single source of truth)
├── scripts/          # Client-side JS (network animation)
public/               # Static assets (favicon, robots.txt)
.github/workflows/    # GitHub Pages deployment
```

## Design System

Colors, spacing, typography defined in `src/styles/tokens.css` as CSS custom properties.

## Deployment

Push to `master`/`main` triggers automatic deployment to GitHub Pages via the official Astro deploy action.

## License

MIT