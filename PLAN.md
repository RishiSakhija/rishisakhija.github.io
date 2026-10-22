# Project Plan: Sakhija Rishi Portfolio

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── Layout.astro
│   ├── home/
│   │   ├── Hero.astro
│   │   ├── FeaturedProjects.astro
│   │   ├── SkillsStrip.astro
│   │   └── ContactCTA.astro
│   ├── projects/
│   │   └── ProjectCard.astro
│   ├── about/
│   │   ├── Timeline.astro
│   │   └── PlaceholderSection.astro
│   ├── contact/
│   │   └── ContactLinks.astro
│   └── ui/
│       ├── Button.astro
│       ├── Card.astro
│       ├── Chip.astro
│       ├── StatusBadge.astro
│       └── Monogram.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── projects.astro
│   ├── about.astro
│   └── contact.astro
├── styles/
│   ├── globals.css
│   ├── tokens.css
│   ├── transitions.css
│   ├── components.css
│   └── network-animation.css
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   ├── experience.ts
│   ├── education.ts
│   └── contact.ts
├── scripts/
│   └── network-animation.js
└── utils/
    └── transitions.ts
public/
├── favicon.svg
└── robots.txt
astro.config.mjs
package.json
tsconfig.json
.github/
└── workflows/
    └── deploy.yml
AGENTS.md
README.md
```

## Implementation Steps

### Phase 1: Scaffold & Configuration
1. Initialize Astro project with TypeScript
2. Configure `astro.config.mjs` with:
   - `site: https://RishiSakhija.github.io`
   - `base: /rishisakhija.github.io`
   - View Transitions enabled
   - Static output adapter
3. Install dependencies: `@fontsource/space-grotesk`, `@fontsource/inter`, `@fontsource/jetbrains-mono`
4. Create GitHub Actions deploy workflow (official Astro action)
5. Create `AGENTS.md` and `README.md`

### Phase 2: Design Tokens & Layout Foundation
1. Create `src/styles/tokens.css` with CSS variables (colors, spacing, typography)
2. Create `src/styles/globals.css` with reset, base styles, background pattern
3. Create `src/styles/transitions.css` for View Transitions + reduced motion
4. Create `BaseLayout.astro` with meta tags, fonts, View Transitions wrapper
5. Create `Navbar.astro` with active state indicator
6. Create `Footer.astro`
7. Create `Layout.astro` composing navbar + slot + footer

### Phase 3: Home Page
1. Create data files: `projects.ts`, `skills.ts`, `contact.ts`
2. Create UI components: `Button`, `Card`, `Chip`, `StatusBadge`, `Monogram`
3. Create `Hero.astro` with network canvas animation
4. Create `FeaturedProjects.astro` (3 cards from data)
4. Create `SkillsStrip.astro` (grouped chips)
5. Create `ContactCTA.astro`
6. Assemble `index.astro`

### Phase 4: Projects Page
1. Create `ProjectCard.astro` component
2. Assemble `projects.astro` with grid of all projects

### Phase 5: About Page
1. Create data files: `experience.ts`, `education.ts`
2. Create `Timeline.astro` component
3. Create `PlaceholderSection.astro` for Blog/Proof of Work
4. Assemble `about.astro`

### Phase 6: Contact Page
1. Create `ContactLinks.astro` component
2. Assemble `contact.astro`

### Phase 7: Polish & Deploy
1. Create `network-animation.js` (lightweight, pauses on hidden tab)
2. Add `favicon.svg` and `robots.txt`
3. Run `npm run build`, fix any errors
4. Test locally with `npm run preview`
5. Commit and push

## Key Technical Decisions

- **View Transitions**: Use `<meta name="astro-view-transitions-enabled" content="true">` in BaseLayout
- **Fonts**: Self-hosted via @fontsource, imported in globals.css
- **Network Animation**: Canvas-based, requestAnimationFrame, pause on `document.hidden`
- **Data Files**: TypeScript modules exporting typed arrays for single-source-of-truth
- **Reduced Motion**: `@media (prefers-reduced-motion: reduce)` disables transitions/animation
- **GitHub Pages**: Official `withastro/action` workflow, `site` and `base` configured correctly