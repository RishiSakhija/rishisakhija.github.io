export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages and Tools',
    skills: ['Python', 'Git', 'GitHub'],
  },
  {
    category: 'AI and ML',
    skills: ['Machine Learning', 'Prompt Engineering', 'AI Agents'],
  },
  {
    category: 'Automation',
    skills: ['Workflow Automation (moderate)'],
  },
];