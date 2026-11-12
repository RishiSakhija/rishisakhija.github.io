# RishiSakhija — Personal Portfolio

[![Deploy to GitHub Pages](https://github.com/RishiSakhija/rishisakhija.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/RishiSakhija/rishisakhija.github.io/actions/workflows/deploy.yml)

Personal portfolio website showcasing my projects, skills, and experience.

**Live site:** https://rishisakhija.github.io

## About

I'm Rishi Sakhija, a self-taught AI/ML builder with 2.5+ years of hands-on experience, currently studying for a Computer Engineering diploma. My focus is the agentic era: AI agents, automation, and search systems. This site replaces a traditional CV, so everything on it is real work in progress.

## Pages

- **Home:** introduction, featured projects, and what I'm working on
- **Projects:** AI Search Engine, Agentic Team, and Virtual Shelf, each with its own detail page
- **Skills:** what I work with and what I'm learning
- **About:** my story and timeline
- **Contact:** how to reach me

## Tech stack

- [Astro](https://astro.build) (static site generation)
- Plain CSS and vanilla JavaScript, with no UI framework
- Instrument Serif and Instrument Sans via Google Fonts
- GitHub Actions and GitHub Pages for hosting and deployment

## Design

A black and sapphire theme with a soft blue glow, a serif display typeface, and card-based layouts. All colors, spacing, and fonts are defined as CSS variables in `src/styles/tokens.css`, so the look can be changed in one place.

## Project structure

- `src/pages`: one file per route
- `src/components`: reusable UI components
- `src/layouts`: the shared page layout
- `src/styles`: design tokens and global styles
- `src/data`: project and site content
- `public`: static assets such as the favicon
- `.github/workflows`: the deployment workflow

## Getting started

1. Clone the repository: `git clone https://github.com/RishiSakhija/rishisakhija.github.io.git`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Build for production: `npm run build`

Requires Node.js 22 or newer.

## Deployment

Every push to the main branch triggers the GitHub Actions workflow, which builds the site with Astro and publishes it to GitHub Pages. The Pages source in the repository settings is set to "GitHub Actions".

## Roadmap (planned)

- Lab: research notes and a build log
- Detailed case studies for each project, with architecture notes and links
- Resume download
- More projects and proof of work as they are completed

## Contact

- Email: [rishisakhija7@gmail.com](mailto:rishisakhija7@gmail.com)
- GitHub: [github.com/RishiSakhija](https://github.com/RishiSakhija)
- LinkedIn: [linkedin.com/in/rishisakhija](https://www.linkedin.com/in/rishisakhija)

© 2026 Rishi Sakhija. All rights reserved.
