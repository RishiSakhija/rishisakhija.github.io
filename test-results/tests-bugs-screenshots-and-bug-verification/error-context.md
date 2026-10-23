# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\bugs.spec.ts >> screenshots and bug verification
- Location: tests\bugs.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.card').nth(3).locator('.card-title')

```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - navigation [ref=f1e3]:
    - generic [ref=f1e4]:
      - link "Rishi Sakhija - Home" [ref=f1e5] [cursor=pointer]:
        - /url: /
        - generic [ref=f1e6]:
          - generic [ref=f1e7]: Rishi
          - generic [ref=f1e8]: Sakhija
        - generic [ref=f1e9]: Rishi Sakhija
      - navigation "Main navigation" [ref=f1e10]:
        - listitem [ref=f1e11]:
          - link "Home" [ref=f1e12] [cursor=pointer]:
            - /url: /
        - listitem [ref=f1e13]:
          - link "Projects" [ref=f1e14] [cursor=pointer]:
            - /url: /projects
        - listitem [ref=f1e15]:
          - link "Research" [ref=f1e16] [cursor=pointer]:
            - /url: /research
        - listitem [ref=f1e17]:
          - link "Blog" [ref=f1e18] [cursor=pointer]:
            - /url: /blog
        - listitem [ref=f1e19]:
          - link "About" [ref=f1e20] [cursor=pointer]:
            - /url: /about
        - listitem [ref=f1e21]:
          - link "Stack" [ref=f1e22] [cursor=pointer]:
            - /url: /stack
        - listitem [ref=f1e23]:
          - link "Contact" [ref=f1e24] [cursor=pointer]:
            - /url: /contact
  - main [ref=f1e25]:
    - region [ref=f1e26]:
      - generic [ref=f1e27]:
        - generic [ref=f1e28]:
          - generic [ref=f1e29]: ● open to work · remote
          - heading "Rishi Sakhija" [level=1] [ref=f1e31]:
            - generic [ref=f1e32]:
              - generic [ref=f1e33]: Rishi
              - generic [ref=f1e34]: Sakhija
          - paragraph [ref=f1e36]: AI/ML Engineer in the Making · Agents & Automation
          - paragraph [ref=f1e38]: Self-taught for 2.5+ years, I design and build AI agents, search systems, and automation that turn complex work into simple workflows.
          - generic [ref=f1e39]:
            - link "View Projects" [ref=f1e40] [cursor=pointer]:
              - /url: /projects
            - link "Get in Touch" [ref=f1e41] [cursor=pointer]:
              - /url: /contact
          - generic [ref=f1e42]:
            - generic [ref=f1e43]: Rishi Sakhija
            - generic [aria-hidden] [ref=f1e44]: "|"
            - generic [ref=f1e45]: AI/ML Engineer
        - complementary "Terminal simulation" [ref=f1e46]:
          - region "Terminal simulation showing AI agent workflow commands and outputs" [ref=f1e47]:
            - generic [ref=f1e48]:
              - generic [ref=f1e49]: "rishi@agent-hq: ~"
              - generic [ref=f1e55]:
                - generic [ref=f1e56]: $
                - generic [ref=f1e59]: $
                - generic [ref=f1e62]: $
                - generic [ref=f1e65]: "> supervisor: online |"
    - region [ref=f1e68]:
      - generic [ref=f1e69]:
        - generic [ref=f1e70]:
          - heading "Featured Projects" [level=2] [ref=f1e71]
          - link "View all" [ref=f1e72] [cursor=pointer]:
            - /url: /projects
        - list [ref=f1e75]:
          - listitem [ref=f1e76]:
            - generic [ref=f1e77]:
              - heading "AI Search Engine" [level=3] [ref=f1e78]
              - generic [ref=f1e79]: In Progress
            - generic [ref=f1e80]:
              - strong [ref=f1e81]: "In simple words:"
              - text: A search engine that only shows tech and AI results, so builders find useful answers faster.
            - paragraph [ref=f1e82]: A compact search engine built exclusively for tech and AI, cutting through the noise to surface what matters to builders.
            - list "Technologies" [ref=f1e83]:
              - generic [ref=f1e84]: Python
              - generic [ref=f1e85]: Search
              - generic [ref=f1e86]: AI
              - generic [ref=f1e87]: LLMs
              - generic [ref=f1e88]: RAG
            - generic [ref=f1e89]:
              - link "View Case Study" [ref=f1e90] [cursor=pointer]:
                - /url: /projects/ai-search-engine
              - link "Live Demo" [disabled]:
                - /url: "#"
              - link "Code" [disabled]:
                - /url: "#"
          - listitem [ref=f1e91]:
            - generic [ref=f1e92]:
              - heading "Agentic Team" [level=3] [ref=f1e93]
              - generic [ref=f1e94]: In Progress
            - generic [ref=f1e95]:
              - strong [ref=f1e96]: "In simple words:"
              - text: A small team of AI helpers, each with a job, led by a manager AI that coordinates them to take work off my plate.
            - paragraph [ref=f1e97]: A personal team of specialized AI agents that work independently or in coordination under a supervising CEO agent, designed to reduce workload and automate everyday tasks.
            - list "Technologies" [ref=f1e98]:
              - generic [ref=f1e99]: Python
              - generic [ref=f1e100]: AI Agents
              - generic [ref=f1e101]: Automation
              - generic [ref=f1e102]: LangGraph
              - generic [ref=f1e103]: LangChain
            - generic [ref=f1e104]:
              - link "View Case Study" [ref=f1e105] [cursor=pointer]:
                - /url: /projects/agentic-team
              - link "Live Demo" [disabled]:
                - /url: "#"
              - link "Code" [disabled]:
                - /url: "#"
          - listitem [ref=f1e106]:
            - generic [ref=f1e107]:
              - heading "Virtual Shelf" [level=3] [ref=f1e108]
              - generic [ref=f1e109]: In Progress
            - generic [ref=f1e110]:
              - strong [ref=f1e111]: "In simple words:"
              - text: Paste a YouTube link and get clean, well-organized notes saved on a personal shelf.
            - paragraph [ref=f1e112]: A web app that converts YouTube links into structured, professional notes and keeps them organized in a personal shelf.
            - list "Technologies" [ref=f1e113]:
              - generic [ref=f1e114]: Web App
              - generic [ref=f1e115]: AI
              - generic [ref=f1e116]: Automation
              - generic [ref=f1e117]: Next.js
              - generic [ref=f1e118]: TypeScript
            - generic [ref=f1e119]:
              - link "View Case Study" [ref=f1e120] [cursor=pointer]:
                - /url: /projects/virtual-shelf
              - link "Live Demo" [disabled]:
                - /url: "#"
              - link "Code" [disabled]:
                - /url: "#"
    - region [ref=f1e121]:
      - generic [ref=f1e122]:
        - heading "How I Work" [level=2] [ref=f1e124]
        - generic [ref=f1e125]:
          - article [ref=f1e126]:
            - generic [aria-hidden] [ref=f1e127]: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"> <path d="M12 2L2 7l10 5 10-5-10-5z"/> <path d="M2 17l10 5 10-5"/> <path d="M2 12l10 5 10-5"/> </svg>
            - heading "Build" [level=3] [ref=f1e128]
            - paragraph [ref=f1e129]: Ship small, useful things constantly. Working code > perfect plans. Every project starts as a prototype and earns its way to production.
          - article [ref=f1e130]:
            - generic [aria-hidden] [ref=f1e131]: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/> <path d="M4 12h16"/> <path d="M12 4v16"/> </svg>
            - heading "Automate" [level=3] [ref=f1e132]
            - paragraph [ref=f1e133]: If I do it twice, I automate it. Agents, scripts, and workflows handle the repetitive so I can focus on the novel. The goal is leverage, not just speed.
          - article [ref=f1e134]:
            - generic [aria-hidden] [ref=f1e135]: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> </svg>
            - heading "Learn in Public" [level=3] [ref=f1e136]
            - paragraph [ref=f1e137]: Write, share, and document as I go. Mistakes become lessons. The feedback loop with the community compounds faster than any solo study.
    - region [ref=f1e138]:
      - generic [ref=f1e139]:
        - heading "Latest" [level=2] [ref=f1e141]
        - generic [ref=f1e142]:
          - article [ref=f1e143]:
            - generic [aria-hidden] [ref=f1e144]: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"> <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/> <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/> </svg>
            - generic [ref=f1e145]: Blog
            - heading "Coming Soon" [level=3] [ref=f1e146]
            - paragraph [ref=f1e147]: Technical deep-dives, project retrospectives, and lessons learned building AI systems in public.
            - generic [ref=f1e148]:
              - generic [ref=f1e149]: Agents
              - generic [ref=f1e150]: LLMs
              - generic [ref=f1e151]: RAG
              - generic [ref=f1e152]: Automation
              - generic [ref=f1e153]: Search
            - link "Explore Blog" [ref=f1e154] [cursor=pointer]:
              - /url: /blog
          - article [ref=f1e155]:
            - generic [aria-hidden] [ref=f1e156]: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"> <circle cx="12" cy="12" r="10"/> <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/> <path d="M2 12h20"/> <path d="M12 2a15.3 15.3 0 0 0 4 10 15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0-4-10 15.3 15.3 0 0 0 4-10z"/> </svg>
            - generic [ref=f1e157]: Research
            - heading "Coming Soon" [level=3] [ref=f1e158]
            - paragraph [ref=f1e159]: Paper breakdowns, experiments, and learning notes on agents, LLMs, RAG, and automation.
            - generic [ref=f1e160]:
              - generic [ref=f1e161]: Agents
              - generic [ref=f1e162]: LLMs
              - generic [ref=f1e163]: RAG
              - generic [ref=f1e164]: Automation
              - generic [ref=f1e165]: Eval
            - link "Explore Research" [ref=f1e166] [cursor=pointer]:
              - /url: /research
    - region [ref=f1e167]:
      - generic [ref=f1e168]:
        - heading "Let's build something together" [level=2] [ref=f1e169]
        - paragraph [ref=f1e170]: Open to opportunities, collaborations, and conversations about AI.
        - generic [ref=f1e171]:
          - link "Get in Touch" [ref=f1e172] [cursor=pointer]:
            - /url: /contact
          - link "View Projects" [ref=f1e173] [cursor=pointer]:
            - /url: /projects
  - contentinfo [ref=f1e174]:
    - generic [ref=f1e175]:
      - generic [ref=f1e176]:
        - generic [ref=f1e177]:
          - generic [ref=f1e178]: Rishi
          - generic [ref=f1e179]: Sakhija
        - generic [ref=f1e180]: Rishi Sakhija
      - paragraph [ref=f1e181]: 2026 Rishi Sakhija. Built with Astro.
      - generic [ref=f1e182]:
        - link "GitHub" [ref=f1e183] [cursor=pointer]:
          - /url: https://github.com/RishiSakhija
        - link "LinkedIn" [ref=f1e184] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/rishisakhija
        - link "Email" [ref=f1e185] [cursor=pointer]:
          - /url: mailto:rishisakhija7@gmail.com
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test('screenshots and bug verification', async ({ page }) => {
  4   |   // Set viewport to 1440px
  5   |   await page.setViewportSize({ width: 1440, height: 900 });
  6   |   await page.goto('http://127.0.0.1:4321');
  7   |   await page.waitForLoadState('networkidle');
  8   |   await page.waitForTimeout(2000);
  9   | 
  10  |   // Take screenshot at 1440px
  11  |   await page.screenshot({ path: 'screenshots/home-1440.png', fullPage: true });
  12  | 
  13  |   // Check for SVG icon issues in "How I Work" and "Latest" sections
  14  |   const svgText = await page.locator('text=<svg').count();
  15  |   console.log('SVG text nodes found (should be 0):', svgText);
  16  | 
  17  |   // Check terminal - should have one cursor and typed text
  18  |   const terminalLines = await page.locator('.terminal-line').count();
  19  |   const terminalCursors = await page.locator('.terminal-cursor').count();
  20  |   console.log('Terminal lines:', terminalLines);
  21  |   console.log('Terminal cursors:', terminalCursors);
  22  | 
  23  |   // Check CTA buttons visibility
  24  |   const viewProjectsBtn = await page.locator('a:has-text("View Projects")').first();
  25  |   const getInTouchBtn = await page.locator('a:has-text("Get in Touch")').first();
  26  |   console.log('View Projects visible:', await viewProjectsBtn.isVisible());
  27  |   console.log('Get in Touch visible:', await getInTouchBtn.isVisible());
  28  | 
  29  |   // Check for duplicate "Rishi Sakhija | AI/ML Engineer" line
  30  |   const heroStatusText = await page.locator('.hero-status').textContent();
  31  |   console.log('Hero status text:', heroStatusText);
  32  | 
  33  |   // Check red status dot alignment
  34  |   const redDot = await page.locator('.red-dot').first();
  35  |   console.log('Red dot exists:', await redDot.count());
  36  | 
  37  |   // Check project tech tags
  38  |   const projectCards = await page.locator('.card').all();
  39  |   for (const card of projectCards) {
> 40  |     const title = await card.locator('.card-title').textContent();
      |                                                     ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  41  |     const tags = await card.locator('.chip').allTextContents();
  42  |     console.log(`Project: ${title}, Tags: ${tags.join(', ')}`);
  43  |   }
  44  | 
  45  |   // Check footer
  46  |   const footerText = await page.locator('footer').textContent();
  47  |   console.log('Footer contains 2026:', footerText.includes('2026'));
  48  |   console.log('Footer contains email:', footerText.includes('rishisakhija7@gmail.com'));
  49  | 
  50  |   // Now test at 390px
  51  |   await page.setViewportSize({ width: 390, height: 800 });
  52  |   await page.waitForTimeout(1000);
  53  |   await page.screenshot({ path: 'screenshots/home-390.png', fullPage: true });
  54  | 
  55  |   // Check CTA buttons at mobile
  56  |   console.log('Mobile - View Projects visible:', await viewProjectsBtn.isVisible());
  57  |   console.log('Mobile - Get in Touch visible:', await getInTouchBtn.isVisible());
  58  | 
  59  |   // Navigate to /about and check transition
  60  |   await page.goto('http://127.0.0.1:4321/about');
  61  |   await page.waitForLoadState('networkidle');
  62  |   await page.waitForTimeout(1000);
  63  |   await page.screenshot({ path: 'screenshots/about-1440.png', fullPage: true });
  64  | 
  65  |   // Go back to home
  66  |   await page.goto('http://127.0.0.1:4321');
  67  |   await page.waitForLoadState('networkidle');
  68  |   await page.waitForTimeout(1000);
  69  |   await page.screenshot({ path: 'screenshots/home-after-nav-1440.png', fullPage: true });
  70  | 
  71  |   // Check terminal still works after navigation
  72  |   const terminalLinesAfter = await page.locator('.terminal-line').count();
  73  |   const terminalCursorsAfter = await page.locator('.terminal-cursor').count();
  74  |   console.log('Terminal lines after nav:', terminalLinesAfter);
  75  |   console.log('Terminal cursors after nav:', terminalCursorsAfter);
  76  | });
  77  | 
  78  | test('transition test - capture frames', async ({ page }) => {
  79  |   await page.setViewportSize({ width: 1440, height: 900 });
  80  |   await page.goto('http://127.0.0.1:4321/about');
  81  |   await page.waitForLoadState('networkidle');
  82  |   await page.waitForTimeout(1000);
  83  | 
  84  |   // Start recording navigation to contact
  85  |   const contactLink = page.locator('a[href="/contact"]').first();
  86  |   
  87  |   // Capture frames at different intervals
  88  |   const startTime = Date.now();
  89  |   await contactLink.click();
  90  |   
  91  |   // Capture at ~200ms
  92  |   await page.waitForTimeout(200);
  93  |   await page.screenshot({ path: 'screenshots/transition-200ms.png', fullPage: true });
  94  |   
  95  |   await page.waitForTimeout(300); // 500ms total
  96  |   await page.screenshot({ path: 'screenshots/transition-500ms.png', fullPage: true });
  97  |   
  98  |   await page.waitForTimeout(300); // 800ms total
  99  |   await page.screenshot({ path: 'screenshots/transition-800ms.png', fullPage: true });
  100 |   
  101 |   await page.waitForTimeout(400); // 1200ms total
  102 |   await page.screenshot({ path: 'screenshots/transition-1200ms.png', fullPage: true });
  103 |   
  104 |   await page.waitForLoadState('networkidle');
  105 |   await page.screenshot({ path: 'screenshots/contact-final.png', fullPage: true });
  106 | });
```