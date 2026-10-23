# AGENTS.md - Project Context for Future Sessions (Phase 2)

## Stack
- **Framework**: Astro (latest stable) with static output + Client Router (View Transitions)
- **Transitions**: Agent-style page transitions via persistent overlay + Astro View Transitions
- **Styling**: Vanilla CSS with CSS Custom Properties (design tokens in `src/styles/tokens.css`)
- **Fonts**: Self-hosted via `@fontsource` packages
  - Space Grotesk (headings) — weights 400, 500, 600, 700
  - Inter (body) — weights 400, 500, 600
  - JetBrains Mono (labels, tags, status, terminal) — weights 400, 500
- **Deployment**: GitHub Pages via official `actions/deploy-pages@v4` workflow
- **Node**: 24 (meets Astro's >=22.23.4 requirement)
- **No external requests** — all assets self-hosted
- **Content Collections**: `@astrojs/content` for Research and Blog

## Design Tokens (CSS Variables in `src/styles/tokens.css`)

### Colors
```css
--bg: #05070D;              /* Deep night background */
--surface: #0B1020;         /* Cards, navbar, footer */
--surface-elevated: #11182A; /* Terminal header, elevated cards */
--border: #16213A;          /* Borders, dividers */
--border-hover: #2F7BFF;    /* Blue on hover */
--text: #F5F8FF;            /* Primary text (white) */
--text-dim: #C8D0E8;        /* Secondary text */
--muted: #8B97B5;           /* Muted text, disabled states */
--blue: #2F7BFF;            /* PRIMARY BRAND — buttons, links, borders on hover, agent nodes, glows */
--blue-glow: #00B2FF;       /* Glows, highlights */
--blue-soft: #5C9DFF;       /* Small text, less intense than pure neon */
--blue-muted: #1E3A5F;      /* Subtle blue backgrounds */
--red: #FF4B2B;             /* SHARP ACCENT ONLY (~10%) — "open to work" dot, active nav marker, transition sweep leading edge, terminal cursor */
--red-glow: #FF6B4A;
--green: #10B981;           /* Success/online states */
--amber: #F59E0B;           /* Warning/standby states */
```

### Color Rules
- **Blue is the main brand color**: buttons, links, borders on hover, agent nodes, glows
- **White for all main text**
- **Red is only a sharp accent** (~10%): "open to work" dot, active-page marker in nav, leading edge of transition sweep, terminal cursor
- **Never put red and blue touching as large flat blocks** (they vibrate). Keep a dark gap between them.

### Typography
```css
--font-heading: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Fluid Type Scale
```css
--fs-hero: clamp(3rem, 8vw, 7rem);           /* Hero name */
--fs-hero-sub: clamp(1.125rem, 2.5vw, 1.5rem); /* Hero subtext */
--fs-h1: clamp(2.25rem, 5vw, 4rem);
--fs-h2: clamp(1.75rem, 4vw, 2.5rem);
--fs-h3: clamp(1.375rem, 3vw, 1.75rem);
--fs-h4: clamp(1.125rem, 2.5vw, 1.375rem);
--fs-body: clamp(1rem, 1.5vw, 1.125rem);
--fs-body-sm: clamp(0.875rem, 1.25vw, 1rem);
--fs-mono: clamp(0.75rem, 1vw, 0.875rem);
--fs-mono-sm: clamp(0.6875rem, 0.875vw, 0.75rem);
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
--space-5xl: 8rem;     /* 128px */
```

### Container
```css
--container-max: 72rem;        /* 1152px */
--container-padding: var(--space-lg);
--container-padding-lg: var(--space-2xl);
```

### Border Radius
```css
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-pill: 9999px;
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.5);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.6);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.7);
--shadow-blue: 0 0 24px rgba(47, 123, 255, 0.3);
--shadow-blue-strong: 0 0 48px rgba(47, 123, 255, 0.5);
--shadow-red: 0 0 16px rgba(255, 75, 43, 0.4);
```

### Transitions
```css
--transition-fast: 100ms ease;
--transition-base: 200ms ease;
--transition-slow: 350ms ease;
--transition-agent: 800ms cubic-bezier(0.4, 0, 0.2, 1);  /* Agent transition duration */
--transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);  /* Hero name load */
```

### Z-Index
```css
--z-nav: 100;
--z-transition-overlay: 9999;
--z-modal: 200;
--z-tooltip: 300;
```

### Breakpoints
```css
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
```

## Motion Rules

### Page Transitions (Agent-Style)
- **Duration**: ~800ms total (`--transition-agent`)
- **Overlay**: Persistent element in BaseLayout (`#transition-overlay`, z-index 9999)
- **Sequence**:
  1. `astro:before-preparation` → Start overlay, show status chip "agent_XX -> routing to /path"
  2. `astro:before-swap` → Sweep line crosses with red leading edge, 6 agent nodes travel along it
  3. `astro:after-swap` → Fade out overlay, show "ready" status
  4. `astro:page-load` → Re-init terminal, network canvas, scroll reveals
- **Sweep Line**: 4px wide, blue gradient, red leading edge dot (8px)
- **Agent Nodes**: 6 nodes, 6px blue circles with ring, staggered delays (0.1s each)
- **Status Chip**: Bottom-left, mono font, shows "agent_XX -> routing..." then "ready"
- **Persistent Elements**: Navbar (`view-transition-name: nav`), Footer (`view-transition-name: footer`), Hero glow (`view-transition-name: hero-glow`) — never flash
- **Content Reveal**: Old page fades/shifts, new page assembles with stagger on main blocks
- **Named Shared Elements**: Page title morphs via `view-transition-name: page-title`
- **Reduced Motion**: Replace everything with simple 150ms fade, no overlay
- **Performance**: Transform/opacity only (GPU), `will-change`, `requestAnimationFrame`, cancel on rapid clicks
- **Must feel fast and premium, not slow** — never block navigation >900ms

### Hero Load Animation
- **Name**: "Rishi Sakhija" — two words, fluid type (`clamp(3rem, 8vw, 7rem)`)
- **Gradient**: White → blue-glow → blue, with soft blue glow (`text-shadow` + `filter: drop-shadow`)
- **Stagger**: 120ms delay between words, total <900ms
- **Reduced Motion**: Instant, no animation

### Scroll Reveals
- **Class**: `.reveal` + `.reveal-delay-1` through `.reveal-delay-6`
- **Animation**: Gentle fade-up (1.5rem), `transition: opacity var(--transition-slow), transform var(--transition-slow)`
- **Trigger**: IntersectionObserver (threshold 0.1, rootMargin -50px)
- **Once per element** (unobserves after visible)

### Hover States
- Buttons, cards, links: `transform: translateY(-2px)` + shadow/color changes
- Cards get blue glow on hover (`--shadow-blue`)
- Transition: `var(--transition-base)`

### Terminal Animation
- **Typing**: 35-50ms/char (randomized), **Erase**: 20ms/char, **Pause**: 1.4s after line, 0.8s before erase
- **Cursor**: Red blinking block (`::after`, step-end 1s)
- **Loop**: 10 lines, infinite
- **Accessibility**: `aria-live="off"`, `aria-label` with full script, static fallback for reduced motion/no-JS
- **Pause**: When tab hidden (`visibilitychange`) or off-screen (IntersectionObserver, 100px margin)
- **Re-init**: On `astro:page-load` and `astro:after-swap`

### Network Animation (Hero)
- **Canvas**: ~40 nodes, connection distance 180px, blue theme
- **Mouse**: Gentle attraction within 150px radius
- **Pause**: When tab hidden, respects `prefers-reduced-motion`
- **Re-init**: On `astro:page-load` and `astro:after-swap`

### Reduced Motion
- `@media (prefers-reduced-motion: reduce)` disables ALL transitions/animations
- View Transitions: 150ms fade only
- Terminal: Static fallback (full script visible, no animation)
- Network: Paused completely
- Hero load: Instant
- Status dot pulse: Disabled
- Scroll reveals: Instant

## Content File Locations

| Content | File |
|---------|------|
| Projects (all + featured) | `src/data/projects.ts` |
| Skills (grouped) | `src/data/skills.ts` |
| Experience timeline | `src/data/experience.ts` |
| Education timeline | `src/data/education.ts` |
| Contact links | `src/data/contact.ts` |
| Terminal script | `src/data/terminal.ts` |
| Agent mappings | `src/data/agents.ts` |
| Research entries | `src/content/research/*.md` (content collections) |
| Blog posts | `src/content/blog/*.md` (content collections) |

**Adding a new project**: Add entry to `projects` array in `src/data/projects.ts`. Include `slug`, `simpleWords`, and all detail sections.

**Adding a skill**: Add to appropriate group in `src/data/skills.ts`.

**Adding experience/education**: Add to respective arrays in `src/data/experience.ts` or `src/data/education.ts`.

**Adding contact link**: Add to `contactLinks` array in `src/data/contact.ts`.

**Adding research entry**: Create `.md` file in `src/content/research/` with frontmatter matching schema in `src/content/config.ts`.

**Adding blog post**: Create `.md` file in `src/content/blog/` with frontmatter matching schema. Set `draft: true` to hide from public feed.

## File Structure (Key Files)

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.astro           # Name "Rishi Sakhija", monogram "RS", 7 nav items, mobile menu
│   │   ├── Footer.astro           # Updated name, real links
│   │   ├── Layout.astro           # Composes navbar + slot + footer
│   │   └── TransitionOverlay.astro # Persistent transition overlay (sweep, nodes, status)
│   ├── home/
│   │   ├── Hero.astro             # Fluid name, gradient, load stagger, terminal, status line
│   │   ├── Terminal.astro         # Terminal component with typing/erasing animation
│   │   ├── FeaturedProjects.astro # 3 cards with "In simple words"
│   │   ├── HowIWork.astro         # 3 principle cards: Build, Automate, Learn in Public
│   │   ├── LatestContent.astro    # Blog/Research placeholder cards
│   │   └── ContactCTA.astro       # CTA buttons
│   ├── projects/
│   │   └── ProjectCard.astro      # Updated with simpleWords, status variants
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Chip.astro
│   │   ├── Monogram.astro
│   │   └── StatusBadge.astro
│   └── contact/
│       └── ContactButtons.astro   # Real GitHub/LinkedIn links
├── layouts/
│   └── BaseLayout.astro           # ClientRouter, TransitionOverlay, hero-glow, scripts, re-init logic
├── pages/
│   ├── index.astro                # Home: Hero+Terminal, FeaturedProjects, HowIWork, LatestContent, ContactCTA
│   ├── projects.astro             # Grid of 3 projects
│   ├── projects/[slug].astro      # Dynamic case study template
│   ├── research.astro             # Polished placeholder + content collection
│   ├── blog.astro                 # Polished placeholder + content collection
│   ├── stack.astro                # Skills as chips/cards
│   ├── about.astro                # Story, timeline, Learning Roadmap placeholder
│   ├── contact.astro              # Real links, closing line
│   └── 404.astro                  # Themed 404
├── styles/
│   ├── tokens.css                 # CSS custom properties (ALL design tokens)
│   ├── globals.css                # Reset, base styles, background pattern, hero-glow
│   ├── components.css             # ALL component styles (btn, card, chip, navbar, footer, hero, etc.)
│   ├── transitions.css            # Agent transitions, sweep line, nodes, status chip, reveals
│   ├── terminal.css               # Terminal-specific styles
│   └── hero.css                   # Hero-specific styles (network, glow, load anim)
├── scripts/
│   ├── network-animation.js       # Hero canvas (blue theme, pause on hidden/reduced-motion)
│   ├── terminal-animation.js      # Terminal typing/erasing loop, IntersectionObserver, visibility
│   └── transition-controller.js   # Orchestrates overlay on astro lifecycle events
├── data/
│   ├── projects.ts                # Projects with slug, simpleWords, detail sections
│   ├── skills.ts
│   ├── experience.ts
│   ├── education.ts
│   ├── contact.ts                 # Real GitHub/LinkedIn URLs
│   ├── terminal.ts                # Terminal script lines + config
│   └── agents.ts                  # Page-to-agent mapping + helpers
├── content/
│   ├── config.ts                  # Content collections config (research, blog)
│   ├── research/                  # Research entries (md files)
│   └── blog/                      # Blog posts (md files), sample-draft.md (hidden)
├── utils/
    └── transitions.ts             # Transition helpers (if needed)
public/
├── favicon.svg
├── apple-touch-icon.png
└── robots.txt
.github/workflows/
└── deploy.yml                     # GitHub Pages deployment (Node 24)
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
- Configured for `site: https://rishisakhija.github.io` and `base: '/'`
- Ensure GitHub Pages source is set to "GitHub Actions" in repo settings

## Key Conventions

1. **Content in data files / content collections** — never hardcode in components
2. **Styles in tokens/components** — not scattered in component `<style>` blocks
3. **Semantic HTML** — proper heading hierarchy, ARIA labels, roles
4. **Accessibility** — focus states (blue), color contrast (WCAG AA), keyboard navigation, `aria-live="off"` for terminal
5. **Responsive** — mobile-first, tested at 360px, 768px, 1280px, no horizontal scroll
6. **Commit small** — logical steps with clear messages
7. **Transitions re-init on `astro:page-load`** — terminal, network, scroll reveals must re-initialize after every navigation

## Placeholders (v1)

- Blog section — content collection ready, `src/content/blog/` with sample draft (hidden)
- Research section — content collection ready, `src/content/research/` empty
- Resume download button — commented slot in `contact.astro`
- Project demo/code buttons — disabled until URLs added in `projects.ts`

## Identity

- **Name**: "Rishi Sakhija" (everywhere — hero, nav, footer, titles, meta, copy)
- **Monogram**: "RS" (not "SR")
- **Links**:
  - GitHub: https://github.com/RishiSakhija (opens new tab, `rel="noopener noreferrer"`)
  - LinkedIn: https://www.linkedin.com/in/rishisakhija (opens new tab, `rel="noopener noreferrer"`)
  - Email: rishisakhija7@gmail.com
- **Status**: "open to work · remote" (red pulsing dot)
- **Role**: "AI/ML Engineer in the Making · Agents & Automation"