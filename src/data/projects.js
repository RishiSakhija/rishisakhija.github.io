export const projects = [
  {
    slug: 'ai-search-engine',
    name: 'AI Search Engine',
    description: 'A compact custom search engine built exclusively for tech and AI, cutting through the noise to surface what matters to builders.',
    plainWords: 'A search engine that only shows tech and AI results, so builders find useful answers faster.',
    tags: ['Python', 'Search', 'AI'],
    status: 'In progress',
    demoUrl: null,
    codeUrl: null,
    problem: 'Documentation in progress',
    howItWorks: 'Documentation in progress',
    tech: 'Documentation in progress',
  },
  {
    slug: 'agentic-team',
    name: 'Agentic Team',
    description: 'A personal team of specialized AI agents that work independently or in coordination under a supervising CEO agent, designed to reduce workload and automate everyday tasks.',
    plainWords: 'A small team of AI helpers, each with a job, led by a manager AI that coordinates them to take work off my plate.',
    tags: ['Python', 'AI Agents', 'Automation'],
    status: 'In progress',
    demoUrl: null,
    codeUrl: null,
    problem: 'Documentation in progress',
    howItWorks: 'Documentation in progress',
    tech: 'Documentation in progress',
  },
  {
    slug: 'virtual-shelf',
    name: 'Virtual Shelf',
    description: 'A web app that converts YouTube links into structured, professional notes and keeps them organized in a personal shelf.',
    plainWords: 'Paste a YouTube link and get clean, well-organized notes saved on a personal shelf.',
    tags: ['Web App', 'AI', 'Automation'],
    status: 'Planned',
    demoUrl: null,
    codeUrl: null,
    problem: 'Documentation in progress',
    howItWorks: 'Documentation in progress',
    tech: 'Documentation in progress',
  },
];

export function getProject(slug) {
  return projects.find(p => p.slug === slug);
}

export function getProjectPaths() {
  return projects.map(p => ({ params: { slug: p.slug } }));
}

export function getPrevNext(slug) {
  const idx = projects.findIndex(p => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}