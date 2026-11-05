export const agents = [
  {
    id: 'ceo',
    name: 'CEO Agent',
    description: 'Supervises the team and assigns tasks',
    status: 'live' as const,
  },
  {
    id: 'research',
    name: 'Research Agent',
    description: 'Finds and collects information',
    status: 'live' as const,
  },
  {
    id: 'analysis',
    name: 'Analysis Agent',
    description: 'Evaluates and summarizes findings',
    status: 'live' as const,
  },
  {
    id: 'content',
    name: 'Content Agent',
    description: 'Drafts the final output',
    status: 'standby' as const,
  },
];