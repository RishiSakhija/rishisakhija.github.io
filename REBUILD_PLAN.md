# REBUILD PLAN: RishiSakhija Portfolio v2 ("Amethyst Control Room")

## File Tree (New)

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── Layout.astro
│   │   ├── ScanLine.astro          # Thin cyan line under navbar
│   │   └── GateOverlay.astro       # Agent Gate transition overlay
│   ├── home/
│   │   ├── Hero.astro
│   │   ├── Terminal.astro
│   │   ├── Ticker.astro
│   │   ├── AgentHQ.astro
│   │   ├── FeaturedProjects.astro
│   │   ├── NowPanel.astro
│   │   └── ClosingCTA.astro
│   ├── projects/
│   │   └── ProjectCard.astro
│   ├── lab/
│   │   ├── LabTabs.astro
│   │   ├── ResearchTab.astro
│   │   └── BlogTab.astro
│   ├── about/
│   │   ├── Timeline.astro
│   │   ├── StackChips.astro
│   │   └── LearningRoadmap.astro
│   ├── contact/
│   │   └── ContactButtons.astro
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Chip.astro
│   │   ├── Icon.astro
│   │   ├── StatusBadge.astro
│   │   ├── Monogram.astro
│   │   └── SectionNumber.astro
│   └── lab/
│       ├── LabTabs.astro
│       ├── ResearchTab.astro
│       └── BlogTab.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── projects.astro
│   ├── projects/
│   │   └── [slug].astro
│   ├── lab.astro
│   ├── about.astro
│   ├── contact.astro
│   └── 404.astro
├── styles/
│   ├── tokens.css
│   ├── globals.css
│   ├── transitions.css
│   ├── components.css
│   ├── terminal.css
│   ├── hero.css
│   ├── ticker.css
│   ├── agent-hq.css
│   └── gate.css
├── scripts/
│   ├── network-animation.js
│   ├── terminal-animation.js
│   ├── ticker-animation.js
│   ├── gate-controller.js
│   └── scroll-reveal.js
├── data/
│   ├── projects.js
│   ├── agents.js
│   ├── terminal.js
│   ├── ticker.js
│   ├── skills.js
│   ├── experience.js
│   ├── education.js
│   └── lab.js
├── content/
│   ├── config.ts
│   ├── research/
│   └── blog/
│       └── sample-draft.md
└── utils/
    └── gate-helpers.js
public/
├── favicon.svg
├── apple-touch-icon.png
└── robots.txt
astro.config.mjs
package.json
tsconfig.json
.github/workflows/deploy.yml
AGENTS.md
README.md
```

## Build Order

### Phase 1: Foundation (Tokens, Layout, Navbar, Footer, Scan Line)
1. `src/styles/tokens.css` - All CSS variables
2. `src/styles/globals.css` - Reset, base styles, fonts
3. `src/components/ui/Icon.astro` - Inline SVG icons
4. `src/components/ui/SectionNumber.astro` - Numbered sections
5. `src/components/ui/Monogram.astro` - RS monogram
6. `src/components/ui/Button.astro` - Primary, secondary, ghost
7. `src/components/ui/Chip.astro` - Tags, status chips
8. `src/components/ui/Card.astro` - Base card component
9. `src/components/ui/StatusBadge.astro` - Status dot
10. `src/components/layout/Navbar.astro` - Floating pill navbar
11. `src/components/layout/Footer.astro` - Footer with links
12. `src/components/layout/ScanLine.astro` - Cyan scan line
13. `src/components/layout/Layout.astro` - Compose navbar + slot + footer
13. `src/layouts/BaseLayout.astro` - HTML shell, ClientRouter, GateOverlay
14. `src/scripts/gate-controller.js` - Gate controller skeleton

### Phase 2: Home Page Sections
15. `src/data/terminal.js` - Terminal script lines
16. `src/scripts/terminal-animation.js` - Typing/erasing logic
17. `src/components/home/Terminal.astro` - Terminal component
18. `src/data/ticker.js` - Ticker items
19. `src/scripts/ticker-animation.js` - CSS marquee logic
20. `src/components/home/Ticker.astro` - Ticker band
21. `src/data/agents.js` - Agent data for HQ and gate
22. `src/components/home/AgentHQ.astro` - Agent HQ with cards & connectors
23. `src/data/projects.js` - Project data
24. `src/components/home/FeaturedProjects.astro` - 3 project cards
25. `src/components/home/NowPanel.astro` - Now panel
26. `src/components/home/ClosingCTA.astro` - Closing CTA
27. `src/components/home/Hero.astro` - Hero with name, role, subtext, buttons, stats
28. `src/pages/index.astro` - Assemble home page

### Phase 3: Other Pages
29. `src/components/projects/ProjectCard.astro` - Reusable project card
30. `src/pages/projects.astro` - Projects grid
31. `src/pages/projects/[slug].astro` - Dynamic case study
32. `src/content/config.ts` - Content collections config
33. `src/components/lab/LabTabs.astro` - Tabs for Research/Blog
34. `src/components/lab/ResearchTab.astro` - Research with content collection
35. `src/components/lab/BlogTab.astro` - Blog with content collection
36. `src/data/lab.js` - Lab roadmap data
36. `src/pages/lab.astro` - Lab page
37. `src/components/about/Timeline.astro` - Experience/education timeline
38. `src/components/about/StackChips.astro` - Skills grouped
39. `src/components/about/LearningRoadmap.astro` - Placeholder
40. `src/pages/about.astro` - About page
41. `src/components/contact/ContactButtons.astro` - Contact links
42. `src/pages/contact.astro` - Contact page
43. `src/pages/404.astro` - 404 page

### Phase 4: Agent Gate Transition
44. `src/components/layout/GateOverlay.astro` - Full-screen gate overlay
45. `src/styles/gate.css` - Gate animations (door panels, seam, agents)
45. `src/scripts/gate-controller.js` - Full gate controller
46. `src/scripts/scroll-reveal.js` - IntersectionObserver for reveals
47. Integration in BaseLayout

### Phase 5: Polish & Deploy
48. `src/scripts/network-animation.js` - Hero canvas
49. `src/scripts/ticker-animation.js` - Ticker marquee
50. `src/styles/transitions.css` - View transitions
51. `src/styles/components.css` - All component styles
52. `src/styles/hero.css` - Hero-specific styles
53. `src/styles/terminal.css` - Terminal styles
54. `src/styles/ticker.css` - Ticker styles
55. `src/styles/agent-hq.css` - Agent HQ styles
56. `public/favicon.svg` - RS monogram
57. `public/robots.txt`
58. Update `AGENTS.md` with new tokens, rules, page map, data locations
59. Update `README.md`
60. `npm run build` + `npm run astro check`
61. Commit, push, verify GitHub Actions

## Verification Checklist (Playwright)

For each phase, run `npm run build && npm run preview` and take screenshots at 1440px and 390px. Verify:

- **Phase 1**: Navbar, footer, scan line visible; no horizontal scroll at 390px
- **Phase 2**: Hero name gradient, terminal types/erases, ticker moves, Agent HQ cards connect, projects show, Now panel visible, CTA works
- **Phase 3**: All pages render, dynamic routes work, content collections load
- **Phase 4**: Gate triggers on navigation, 200/500/800/1200ms frames show panels closing, gate shut with RS+agents, panels opening, final page; back/forward works; rapid clicks don't break; reduced motion = 150ms fade
- **Final**: All pages pass `npm run build` + `npm run astro check`; GitHub Actions green

## Commit Strategy
Small, logical commits per phase. Push to master after each phase passes verification.