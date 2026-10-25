export const agentData = [
  {
    id: 'ceo',
    name: 'CEO Agent',
    role: 'Supervises the team and assigns tasks',
    status: 'online',
    icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  },
  {
    id: 'research',
    name: 'Research Agent',
    role: 'Finds and collects information',
    status: 'online',
    icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>`,
  },
  {
    id: 'analysis',
    name: 'Analysis Agent',
    role: 'Evaluates and summarizes findings',
    status: 'online',
    icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>`,
  },
  {
    id: 'content',
    name: 'Content Agent',
    role: 'Drafts the final output',
    status: 'standby',
    icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  },
];

export const AGENT_MAP = {
  '/': 'ceo',
  '/projects': 'builder',
  '/lab': 'analyst',
  '/about': 'archivist',
  '/contact': 'courier',
};

export function getAgentForPath(path) {
  if (AGENT_MAP[path]) return AGENT_MAP[path];
  if (path.startsWith('/projects/') && path !== '/projects') return 'builder';
  if (path.startsWith('/lab/')) return 'analyst';
  return 'agent';
}