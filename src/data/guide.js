export const guideTopics = [
  {
    id: 'story',
    title: 'Story',
    target: '/about',
    icon: '<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    questions: [
      { id: 'who', text: 'Who is Rishi?' },
      { id: 'aiming', text: 'What is he aiming for?' },
    ],
  },
  {
    id: 'work',
    title: 'Work',
    target: '/projects',
    icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/>',
    questions: [
      { id: 'built', text: 'What has he built?' },
      { id: 'agentic-team', text: 'What is the Agentic Team?' },
    ],
  },
  {
    id: 'skills',
    title: 'Skills',
    target: '/skills',
    icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
    questions: [
      { id: 'work-with', text: 'What does he work with?' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    target: '/contact',
    icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/>',
    questions: [
      { id: 'available', text: 'Is he available?' },
    ],
  },
];

export function getReply(topicId, questionId) {
  const replies = {
    story: {
      who: "Rishi Sakhija is a self-taught AI/ML builder with 2.5+ years of hands-on work, currently a Computer Engineering diploma student in his 5th semester, focused on agents and automation.",
      aiming: "Building a professional personal brand and digital identity while going deep on AI, ML, and the agentic era.",
    },
    work: {
      built: "Three projects: an AI search engine for tech and AI, a personal agentic team, and Virtual Shelf. They are in progress or planned, and links are coming.",
      'agentic-team': "A personal team of AI agents that work alone or together under a supervising CEO agent to take work off his plate.",
    },
    skills: {
      'work-with': "Python, Git and GitHub, machine learning, prompt engineering, AI agents, and workflow automation.",
    },
    contact: {
      available: "Yes, he is open to work and remote. Email: rishisakhija7@gmail.com.",
    },
  };

  return replies[topicId]?.[questionId] || 'No information available.';
}