/**
 * Terminal Animation Script Lines
 * Each line will be typed character by character, then erased, then next line
 */

export interface TerminalLine {
  type: 'command' | 'output';
  text: string;
  // For command lines, the prompt is shown separately
  prompt?: string;
}

export const terminalScript: TerminalLine[] = [
  { type: 'command', text: 'whoami', prompt: '$' },
  { type: 'output', text: '> Rishi Sakhija: AI/ML builder, agents & automation' },
  { type: 'command', text: 'cat focus.txt', prompt: '$' },
  { type: 'output', text: '> agents | automation | search | prompt engineering' },
  { type: 'command', text: 'agents --status', prompt: '$' },
  { type: 'output', text: '> supervisor: online | builder: online | analyst: standby' },
  { type: 'command', text: 'ls projects/', prompt: '$' },
  { type: 'output', text: '> ai-search-engine/  agentic-team/  virtual-shelf/' },
  { type: 'command', text: 'echo $STATUS', prompt: '$' },
  { type: 'output', text: '> open to work, remote, building daily' },
];

// Animation timing constants
export const TERMINAL_CONFIG = {
  typeSpeedMin: 35,      // ms per character (min)
  typeSpeedMax: 50,      // ms per character (max)
  eraseSpeed: 20,        // ms per character when erasing
  pauseAfterLine: 1400,  // ms to pause after completing a line
  pauseBeforeErase: 800, // ms to pause before starting to erase
};