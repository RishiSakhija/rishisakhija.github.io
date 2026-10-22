# AGENTS.md - Project Context for Future Sessions

## Stack
- **Framework**: Astro (latest stable) with static output
- **Transitions**: Built-in Astro View Transitions (enabled in `astro.config.mjs`)
- **Styling**: Vanilla CSS with CSS Custom Properties (design tokens)
- **Fonts**: Self-hosted via `@fontsource` packages
  - Space Grotesk (headings) — weights 400, 500, 600, 700
  - Inter (body) — weights 400, 500, 600
  - JetBrains Mono (labels/tags/status) — weights 400, 500
- **Deployment**: GitHub Pages via official `withastro/action` workflow
- **No external requests** — all assets self-hosted

## Design Tokens (CSS Variables in `src/styles/tokens.css`)

### Colors
```css
--bg: #0A0D12;           /* Deep night background */
--surface: #111620;      /* Cards, navbar, footer */
--border: #1E2633;       /* Borders, dividers */
--text: #E8ECF2;         /* Primary text */
--muted: #8A94A6;        /* Secondary text, disabled states */
--accent: #4DE2C5;       /* Primary accent (teal) */
--accent-2: #7C8CFF;     /* Secondary accent (purple), use sparingly */
```

### Typography
```css
--font-heading: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Spacing Scale
```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
--space-4xl: 6rem;     /* 96px */
```

### Other Tokens
```css
--container-max: 72rem;        /* 1152px */
--container-padding: var(--space-lg);
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 1rem;
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 400ms ease;
--shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
--shadow-md: 0 4px 12px rgba(0,0,0,0.4);
--shadow-lg: 0 8px 24px rgba(0,0,0,0.5);
--shadow-accent: 0 0 20px rgba(77, 226, 197, 0.15);
```

## Motion Rules

### Page Transitions
- Fade + slight slide via View Transitions (`src/styles/transitions.css`)
- Nav stays persistent (`view-transition-name: nav`)
- Duration: `--transition-base` (250ms)

### Scroll Reveals
- Gentle fade-up with staggered delays
- Classes: `.reveal` + `.reveal-delay-1` through `.reveal-delay-6`
- Implemented via IntersectionObserver in BaseLayout

### Hover States
- Buttons, cards, links: `transform: translateY(-2px)` + shadow/color changes
- Cards get accent glow on hover (`--shadow-accent`)

### Reduced Motion
- `@media (prefers-reduced-motion: reduce)` disables ALL transitions/animations
- View Transitions animation set to `none`
- Network animation pauses completely
- Pulse animation on status badge disabled

### Network Animation (Hero)
- Canvas-based node-and-line animation (`src/scripts/network-animation.js`)
- ~40 nodes, connection distance ~180px
- Subtle mouse attraction/repulsion
- Pauses when tab hidden (`document.hidden`)
- Respects `prefers-reduced-motion`
- Lightweight: ~2KB gzipped, no dependencies

## Content File Locations

| Content | File |
|---------|------|
| Projects (all + featured) | `src/data/projects.ts` |
| Skills (grouped) | `src/data/skills.ts` |
| Experience timeline | `src/data/experience.ts` |
| Education timeline | `src/data/education.ts` |
| Contact links | `src/data/contact.ts` |

**Adding a new project**: Add entry to `projects` array in `src/data/projects.ts`. Featured projects are first 3 automatically.

**Adding a skill**: Add to appropriate group in `src/data/skills.ts`.

**Adding experience/education**: Add to respective arrays in `src/data/experience.ts` or `src/data/education.ts`.

**Adding contact link**: Add to `contactLinks` array in `src/data/contact.ts`.

## File Structure (Key Files)

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout
│   ├── home/            # Hero, FeaturedProjects, SkillsStrip, ContactCTA
│   ├── projects/        # ProjectCard
│   ├── about/           # Timeline, PlaceholderSection
│   ├── contact/         # ContactLinks
│   └── ui/              # Button, Card, Chip, StatusBadge, Monogram
├── layouts/
│   └── BaseLayout.astro # HTML shell, meta, fonts, View Transitions
├── pages/
│   ├── index.astro      # Home
│   ├── projects.astro   # All projects
│   ├── about.astro      # About + placeholders
│   └── contact.astro    # Contact links
├── styles/
│   ├── tokens.css       # CSS custom properties (design tokens)
│   ├── globals.css      # Reset, base styles, background pattern
│   ├── components.css   # Shared component styles
│   └── transitions.css  # View Transitions, scroll reveals, hover
├── data/                # Content (single source of truth)
├── scripts/
│   └── network-animation.js  # Hero canvas animation
public/
├── favicon.svg
└── robots.txt
.github/workflows/
└── deploy.yml           # GitHub Pages deployment
```

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build
npm run astro check  # Type-check Astro files
```

## Deployment

- Push to `master`/`main` triggers GitHub Actions workflow
- Uses official `actions/deploy-pages@v4`
- Configured for `site: https://RishiSakhija.github.io` and `base: /rishisakhija.github.io`
- Ensure GitHub Pages source is set to "GitHub Actions" in repo settings

## Key Conventions

1. **Content in data files** — never hardcode in components
2. **Styles in tokens/components** — not scattered in component `<style>` blocks
3. **Semantic HTML** — proper heading hierarchy, ARIA labels, roles
4. **Accessibility** — focus states, color contrast, keyboard navigation
5. **Responsive** — mobile-first, breakpoints at 640px, 1024px
6. **Commit small** — logical steps with clear messages

## Placeholders (v1)

- Blog section (`/about` — not linked in nav)
- Proof of Work section (`/about` — not linked in nav)
- Resume download button (commented in `contact.astro`)
- GitHub/LinkedIn links show "Coming soon" (`src/data/contact.ts`)
- Project demo/code buttons disabled until URLs added