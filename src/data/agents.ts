/**
 * Agent Names for Page Transitions
 * Maps each route to its corresponding agent name
 * Used in transition status chip: "agent_02 -> routing to /projects"
 */

export interface AgentMapping {
  path: string;
  agent: string;
  number: string;
}

export const agentMappings: AgentMapping[] = [
  { path: '/', agent: 'supervisor', number: '01' },
  { path: '/projects', agent: 'builder', number: '02' },
  { path: '/research', agent: 'analyst', number: '03' },
  { path: '/blog', agent: 'writer', number: '04' },
  { path: '/about', agent: 'archivist', number: '05' },
  { path: '/stack', agent: 'engineer', number: '06' },
  { path: '/contact', agent: 'courier', number: '07' },
];

// Dynamic routes
export const dynamicAgentMappings: Array<{ pattern: RegExp; agent: string; number: string }> = [
  { pattern: /^\/projects\/[^/]+$/, agent: 'builder', number: '02' },
  { pattern: /^\/blog\/[^/]+$/, agent: 'writer', number: '04' },
  { pattern: /^\/research\/[^/]+$/, agent: 'analyst', number: '03' },
];

/**
 * Get agent info for a given path
 */
export function getAgentForPath(path: string): { agent: string; number: string } {
  // Exact match first
  const exact = agentMappings.find(m => m.path === path);
  if (exact) return { agent: exact.agent, number: exact.number };

  // Dynamic routes
  for (const mapping of dynamicAgentMappings) {
    if (mapping.pattern.test(path)) {
      return { agent: mapping.agent, number: mapping.number };
    }
  }

  return { agent: 'agent', number: '00' };
}

/**
 * Get all agent names for display
 */
export function getAllAgents(): Array<{ name: string; number: string; description: string }> {
  return [
    { name: 'supervisor', number: '01', description: 'Home - coordinates all agents' },
    { name: 'builder', number: '02', description: 'Projects - builds and ships' },
    { name: 'analyst', number: '03', description: 'Research - analyzes and synthesizes' },
    { name: 'writer', number: '04', description: 'Blog - writes and publishes' },
    { name: 'archivist', number: '05', description: 'About - preserves history' },
    { name: 'engineer', number: '06', description: 'Stack - maintains infrastructure' },
    { name: 'courier', number: '07', description: 'Contact - delivers messages' },
  ];
}