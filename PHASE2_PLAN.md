# Phase 2 Implementation Plan: "Electric Control Room" Redesign

## Overview
Complete redesign with new identity (Rishi Sakhija), Electric Control Room design system, Terminal hero component, Agent-style page transitions, and expanded site structure (7 pages + dynamic routes).

---

## File Structure Changes

### New Files to Create

```
src/
├── components/
│   ├── layout/
│   │   ├── MobileMenu.astro          # Hamburger menu for mobile nav
│   │   └── TransitionOverlay.astro   # Persistent transition overlay (sweep line, agent nodes, status chip)
│   ├── home/
│   │   ├── Terminal.astro            # Terminal component with typing/erasing animation
│   │   ├── HowIWork.astro            # 3-card strip: Build, Automate, Learn in public
│   │   └── LatestContent.astro       # Placeholder cards for Blog/Research teasers
│   ├── projects/
│   │   ├── ProjectCard.astro         # Updated card with "In simple words" line
│   │   └── ProjectDetail.astro       # Case study template component
│   ├── research/
│   │   └── ResearchPlaceholder.astro # Polished coming-soon state
│   ├── blog/
│   │   └── BlogPlaceholder.astro     # Polished coming-soon state
│   ├── about/
│   │   └── LearningRoadmap.astro     # Placeholder section
│   ├── stack/
│   │   └── StackCategories.astro     # Skills grouped as chips/cards
│   ├── contact/
│   │   └── ContactButtons.astro      # Updated with real links
│   └── ui/
│       ├── TerminalLine.astro        # Reusable line component for terminal
│       └── PageTitle.astro           # For transition:name morphing
├── layouts/
│   └── BaseLayout.astro              # Major update: ClientRouter, transition overlay, persistence
├── pages/
│   ├── research.astro                # New page
│   ├── blog.astro                    # New page
│   ├── stack.astro                   # New page
│   ├── 404.astro                     # New page
│   ├── projects/
│   │   └── [slug].astro              # Dynamic route for case studies
│   └── index.astro                   # Updated home page
├── styles/
│   ├── tokens.css                    # Complete rewrite with new color system
│   ├── globals.css                   # Update: new fonts, backgrounds, patterns
│   ├── components.css                # Update: new component styles
│   ├── transitions.css               # Rewrite: agent transition animations
│   ├── terminal.css                  # New: terminal-specific styles
│   └── hero.css                      # New: hero-specific styles
├── scripts/
│   ├── network-animation.js          # Update: blue theme, reduced motion
│   ├── terminal-animation.js         # New: terminal typing/erasing logic
│   └── transition-controller.js      # New: manages overlay, agent sweep, status chip
├── data/
│   ├── terminal.ts                   # New: terminal script lines
│   ├── agents.ts                     # New: per-page agent names
│   ├── projects.ts                   # Update: add slug, simpleWords, detail sections
│   ├── skills.ts                     # Update: minor tweaks
│   ├── experience.ts                 # No change
│   ├── education.ts                  # No change
│   └── contact.ts                    # Update: real GitHub/LinkedIn links
├── content/
│   ├── config.ts                     # New: content collections config
│   ├── research/
│   │   └── .gitkeep                  # Placeholder
│   └── blog/
│       └── sample-draft.md           # Hidden draft sample
└── utils/
    └── transitions.ts                # Update: transition helpers
```

### Files to Modify Significantly

| File | Changes |
|------|---------|
| `src/layouts/BaseLayout.astro` | Add ClientRouter, TransitionOverlay, persist navbar/background, event listeners for astro:before-preparation, astro:before-swap, astro:after-swap, astro:page-load |
| `src/components/layout/Navbar.astro` | Update name to "Rishi Sakhija", monogram "RS", new nav items (Research, Blog, Stack), active red marker, mobile menu integration |
| `src/components/layout/Footer.astro` | Update name, links, monogram |
| `src/components/home/Hero.astro` | Complete redesign: fluid type name, gradient, load animation, status line, role line, subtext, buttons, Terminal component integration |
| `src/components/home/FeaturedProjects.astro` | Update to use new ProjectCard with "In simple words" |
| `src/pages/index.astro` | Reassemble with new sections: Hero+Terminal, FeaturedProjects, HowIWork, LatestContent, ContactCTA |
| `src/pages/projects.astro` | Grid of 3 projects linking to `/projects/[slug]` |
| `src/pages/projects/[slug].astro` | New dynamic route using ProjectDetail component |
| `src/pages/about.astro` | Update name, add LearningRoadmap placeholder |
| `src/pages/contact.astro` | Real links, update copy |
| `src/pages/research.astro` | New page with ResearchPlaceholder |
| `src/pages/blog.astro` | New page with BlogPlaceholder |
| `src/pages/stack.astro` | New page with StackCategories |
| `src/pages/404.astro` | New themed 404 page |
| `src/styles/tokens.css` | Complete rewrite with new Electric Control Room tokens |
| `src/styles/globals.css` | New background pattern, font imports, base styles |
| `src/styles/transitions.css` | Agent transition keyframes, sweep line, nodes, status chip |
| `src/scripts/network-animation.js` | Blue theme, pause on hidden/prefers-reduced-motion |
| `src/scripts/terminal-animation.js` | New: typing/erasing loop, IntersectionObserver, visibility handling |
| `src/scripts/transition-controller.js` | New: orchestrates overlay animation on navigation events |
| `src/data/projects.ts` | Add slug, simpleWords, detail sections (overview, problem, architecture, tech, learned, status, links) |
| `src/data/terminal.ts` | New: terminal script lines |
| `src/data/agents.ts` | New: page-to-agent mapping |
| `src/data/contact.ts` | Real GitHub/LinkedIn URLs, open in new tab |
| `astro.config.mjs` | Add content collections config import |
| `package.json` | Add @astrojs/content dependency |
| `AGENTS.md` | Full update with new tokens, motion rules, page map, content locations |
| `README.md` | Update description |

### Files to Delete/Replace

| File | Action |
|------|--------|
| `src/components/home/SkillsStrip.astro` | Replace with HowIWork + Stack page |
| `src/components/about/PlaceholderSection.astro` | Replace with research/blog specific placeholders |
| `src/components/about/Timeline.astro` | Keep but update styling |
| `src/styles/network-animation.css` | Merge into components.css/hero.css |
| `src/styles/components.css` | Major rewrite |

---

## Implementation Order

### Phase 2A: Foundation (Tokens, Layout, Name Change)
1. **Tokens & Global Styles** — `tokens.css`, `globals.css`, `components.css`, `transitions.css`, `hero.css`, `terminal.css`
2. **BaseLayout** — ClientRouter, TransitionOverlay integration, persist navbar/background
3. **Navbar & Footer** — Name "Rishi Sakhija", monogram "RS", new nav items, red active marker, mobile menu
4. **Global name search/replace** — All components, pages, meta tags, AGENTS.md, README.md

### Phase 2B: Hero & Terminal
5. **Hero component** — Fluid type name, gradient, load stagger, status line, role, subtext, buttons
6. **Terminal component** — Typing/erasing loop, blinking cursor, IntersectionObserver, reduced motion fallback
7. **Terminal data** — `terminal.ts` with script lines
8. **Home page assembly** — Hero+Terminal, FeaturedProjects, HowIWork, LatestContent, ContactCTA

### Phase 2C: Agent Transitions
9. **Transition overlay component** — Sweep line, agent nodes, status chip
10. **Transition controller script** — Event handlers for astro lifecycle events
11. **Agent data** — `agents.ts` mapping
12. **Integration** — Wire into BaseLayout, test navigation, back/forward, rapid clicks

### Phase 2D: Pages & Content
13. **Projects page** — Grid with updated ProjectCard (simpleWords)
14. **Project detail page** — Dynamic route `[slug].astro` with case study template
15. **Research page** — Polished placeholder, content collection setup
16. **Blog page** — Polished placeholder, content collection setup
17. **Stack page** — Skills as chips/cards
18. **About page** — Updated copy, LearningRoadmap placeholder
19. **Contact page** — Real links, updated copy
20. **404 page** — Themed

### Phase 2E: Polish & Deploy
21. **Content collections config** — `src/content/config.ts`
22. **AGENTS.md** — Full rewrite
23. **README.md** — Update
24. **Build & type-check** — `npm run build`, `npm run astro check`
25. **Commit & push** — Small logical commits

---

## Key Technical Decisions

### Agent Transitions
- **Overlay**: Single persistent `<div id="transition-overlay">` in BaseLayout with SVG/Canvas for sweep line + nodes
- **Events**: 
  - `astro:before-preparation` → start overlay, show status chip "agent_X -> routing to /page"
  - `astro:before-swap` → sweep line crosses, nodes travel
  - `astro:after-swap` → fade out overlay, show "ready"
  - `astro:page-load` → re-init terminal, network, scroll reveals
- **Performance**: Transform/opacity only, `will-change`, requestAnimationFrame, cancel on rapid clicks
- **Reduced motion**: 150ms fade only, no overlay

### Terminal Component
- **State machine**: `typing` → `paused` → `erasing` → `paused` → next line
- **Speeds**: Type 35-50ms/char, erase 20ms/char, pause 1.4s
- **Cursor**: Red blinking block (`::after` with animation)
- **Accessibility**: `aria-live="off"`, `aria-label` with full script, static fallback for reduced motion/no-JS
- **Visibility**: IntersectionObserver pauses when off-screen, `visibilitychange` pauses when tab hidden
- **Re-init**: On `astro:page-load`, reset to first line

### Design System (CSS Variables)
```css
/* Colors */
--bg: #05070D;
--surface: #0B1020;
--border: #16213A;
--text: #F5F8FF;
--muted: #8B97B5;
--blue: #2F7BFF;        /* Primary brand */
--blue-glow: #00B2FF;   /* Glows, highlights */
--blue-soft: #5C9DFF;   /* Small text, less intense */
--red: #FF4B2B;         /* Sharp accent only */

/* Typography */
--font-heading: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Spacing (keep existing scale) */
/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 400ms ease;
--transition-agent: 800ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Content Collections
```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    readingTime: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { research, blog };
```

---

## Commits Plan (Small & Logical)

1. `feat(tokens): Electric Control Room design tokens`
2. `feat(layout): BaseLayout with ClientRouter and TransitionOverlay`
3. `feat(nav): Rishi Sakhija identity, new nav items, mobile menu`
4. `feat(hero): Fluid type name, gradient, load animation, status line`
5. `feat(terminal): Terminal component with typing/erasing animation`
6. `feat(transitions): Agent-style page transitions with sweep line`
7. `feat(projects): Grid, cards with "In simple words", detail pages`
8. `feat(pages): Research, Blog, Stack, About, Contact, 404`
9. `feat(content): Collections config for research/blog`
10. `chore: Update AGENTS.md, README.md, package.json`
11. `fix: Build and type-check fixes`

---

## Verification Checklist (Post-Deploy)

- [ ] Site loads at https://rishisakhija.github.io/
- [ ] Name shows "Rishi Sakhija" everywhere (hero, nav, footer, titles, meta)
- [ ] Monogram shows "RS" not "SR"
- [ ] Nav items: Home, Projects, Research, Blog, About, Stack, Contact
- [ ] Active nav item has red marker
- [ ] Mobile menu works
- [ ] Hero: Name gradient, load stagger, red pulsing status dot, role line, subtext, buttons
- [ ] Terminal: Types/erases lines, red blinking cursor, pauses when tab hidden/off-screen
- [ ] Network canvas: Blue theme, mouse reaction, pauses on hidden/reduced-motion
- [ ] Page transitions: Sweep line + nodes + status chip on every internal nav (~800ms)
- [ ] Transitions persist navbar/background, no flash
- [ ] Back/forward navigation works correctly
- [ ] Rapid clicks don't break transition state
- [ ] Reduced motion: Simple 150ms fade, no overlay
- [ ] Projects page: 3 cards with "In simple words" lines, link to detail pages
- [ ] Project detail pages: Case study template with all sections
- [ ] Research page: Polished placeholder, topic chips
- [ ] Blog page: Polished placeholder, tags, reading time
- [ ] Stack page: Skills grouped as chips
- [ ] About page: Story, timeline, Learning Roadmap placeholder
- [ ] Contact page: Email, GitHub (new tab), LinkedIn (new tab), closing line
- [ ] 404 page: Themed, link back to home
- [ ] No horizontal scroll at 360px, 768px, 1280px
- [ ] WCAG AA contrast on body text
- [ ] Focus states visible in blue
- [ ] Scroll reveals work, staggered
- [ ] No external requests (fonts self-hosted)
- [ ] GitHub Actions deploys successfully on push to master