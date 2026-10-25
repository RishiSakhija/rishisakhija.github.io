export const terminalScript = [
  { type: 'command', text: 'whoami', prompt: '$' },
  { type: 'output', text: '> Rishi Sakhija: AI/ML builder, agents & automation' },
  { type: 'command', text: 'cat focus.txt', prompt: '$' },
  { type: 'output', text: '> agents | automation | search | prompt engineering' },
  { type: 'command', text: 'agents --status', prompt: '$' },
  { type: 'output', text: '> ceo: online | research: online | analysis: online | content: standby' },
  { type: 'command', text: 'ls projects/', prompt: '$' },
  { type: 'output', text: '> ai-search-engine/  agentic-team/  virtual-shelf/' },
  { type: 'command', text: 'echo $STATUS', prompt: '$' },
  { type: 'output', text: '> open to work, remote, building daily' },
];

export const TERMINAL_CONFIG = {
  typeSpeedMin: 35,
  typeSpeedMax: 50,
  eraseSpeed: 20,
  pauseAfterLine: 1400,
  pauseBeforeErase: 800,
};