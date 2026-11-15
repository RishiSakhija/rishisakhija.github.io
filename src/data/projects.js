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
    summary: [
      'A compact search engine built only for tech and AI topics. General search results are crowded with noise, so builders spend a lot of time hunting for reliable answers.',
      'By limiting its scope to tech and AI instead of the whole web, it aims to surface what matters faster. It is still in progress, and details will be added here as it takes shape.'
    ],
    goal: 'Help builders find useful tech and AI answers faster.'
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
    summary: [
      'A personal team of AI agents, each with its own specialty: a CEO agent that supervises and assigns tasks, plus agents for research, analysis and content. Each agent can work alone on its own job, or be connected so the CEO agent coordinates them.',
      'The aim is to reduce my day-to-day workload by delegating routine work to the team. It is in progress, and I am documenting what I learn as I build it.'
    ],
    goal: 'Take routine work off my plate with a coordinated team of agents.'
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
    summary: [
      'A web app where you paste a YouTube link and get clean, structured notes, saved on a personal shelf so they stay organized and easy to find later.',
      'It is useful for anyone who learns from videos and wants notes without writing them by hand. It is currently planned and not built yet.'
    ],
    goal: 'Turn videos into organized notes automatically.'
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