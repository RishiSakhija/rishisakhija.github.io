export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'coming-soon' | 'live';
  demoUrl?: string;
  codeUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'ai-search-engine',
    title: 'AI Search Engine',
    description:
      'A compact search engine built exclusively for tech and AI, cutting through the noise to surface what matters to builders.',
    tags: ['Python', 'Search', 'AI'],
    status: 'coming-soon',
  },
  {
    id: 'agentic-team',
    title: 'Agentic Team',
    description:
      'A personal team of specialized AI agents that work independently or in coordination under a supervising CEO agent, designed to reduce workload and automate everyday tasks.',
    tags: ['Python', 'AI Agents', 'Automation'],
    status: 'coming-soon',
  },
  {
    id: 'virtual-shelf',
    title: 'Virtual Shelf',
    description:
      'A web app that converts YouTube links into structured, professional notes and keeps them organized in a personal shelf.',
    tags: ['Web App', 'AI', 'Automation'],
    status: 'coming-soon',
  },
];

export const featuredProjects = projects.slice(0, 3);