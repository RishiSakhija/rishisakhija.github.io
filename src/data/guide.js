export const guideTopics = [
  {
    id: 'story',
    title: 'Story',
    target: '/about',
    icon: '<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    questions: [
      { id: 'who', text: 'Who is Rishi?' },
      { id: 'aiming', text: 'What is he aiming for?' },
      { id: 'education', text: 'What is his education?' },
      { id: 'experience', text: 'How long has he been building?' },
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
      { id: 'ai-search', text: 'Tell me about the AI Search Engine' },
      { id: 'virtual-shelf', text: 'What is Virtual Shelf?' },
    ],
  },
  {
    id: 'skills',
    title: 'Skills',
    target: '/skills',
    icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
    questions: [
      { id: 'work-with', text: 'What does he work with?' },
      { id: 'learning', text: 'What is he currently learning?' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    target: '/contact',
    icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/>',
    questions: [
      { id: 'available', text: 'Is he available?' },
      { id: 'email', text: 'What is his email?' },
      { id: 'github', text: 'What is his GitHub?' },
      { id: 'linkedin', text: 'What is his LinkedIn?' },
    ],
  },
];

const keywordMap = {
  story: ['who', 'name', 'background', 'person', 'rishi', 'bio', 'about'],
  education: ['education', 'diploma', 'degree', 'study', 'university', 'college', 'semester', 'computer engineering'],
  experience: ['experience', 'years', 'building', 'self-taught', 'taught', 'hands-on', 'worked'],
  aiming: ['aim', 'goal', 'target', 'future', 'plan', 'career', 'brand', 'identity'],
  built: ['built', 'project', 'projects', 'made', 'created', 'portfolio'],
  'agentic-team': ['agentic', 'team', 'agent', 'agents', 'ceo', 'supervis', 'coordinat'],
  'ai-search': ['search', 'engine', 'query', 'index', 'tech', 'ai search'],
  'virtual-shelf': ['shelf', 'virtual', 'youtube', 'notes', 'video', 'link'],
  'work-with': ['work with', 'tool', 'tools', 'stack', 'language', 'languages', 'python', 'git', 'github', 'ml', 'machine learning', 'prompt', 'automation'],
  learning: ['learning', 'learn', 'study', 'currently', 'now', 'new', 'agentic era'],
  available: ['available', 'hire', 'hiring', 'job', 'work', 'freelance', 'contract', 'open'],
  email: ['email', 'mail', 'contact', 'reach', 'message'],
  github: ['github', 'git', 'code', 'repo', 'repository'],
  linkedin: ['linkedin', 'linked in', 'profile', 'network'],
};

function scoreTopic(input) {
  const lower = input.toLowerCase();
  let bestTopic = null;
  let bestScore = 0;
  for (const topic of guideTopics) {
    for (const q of topic.questions) {
      const keywords = keywordMap[q.id] || [q.id.replace('-', ' ')];
      for (const kw of keywords) {
        if (lower.includes(kw.toLowerCase())) {
          const score = kw.length;
          if (score > bestScore) {
            bestScore = score;
            bestTopic = { topicId: topic.id, questionId: q.id };
          }
        }
      }
    }
  }
  return bestTopic;
}

export function getReply(topicId, questionId) {
  const replies = {
    story: {
      who: "Rishi Sakhija is a self-taught AI/ML builder with 2.5+ years of hands-on work, currently a Computer Engineering diploma student in his 5th semester, focused on agents and automation.",
      aiming: "Building a professional personal brand and digital identity while going deep on AI, ML, and the agentic era.",
      education: "Diploma in Computer Engineering, currently 5th semester.",
      experience: "2.5+ years of self-taught, hands-on work in AI and machine learning.",
    },
    work: {
      built: "Three projects: an AI search engine for tech and AI, a personal agentic team, and Virtual Shelf. They are in progress or planned, and links are coming.",
      'agentic-team': "A personal team of AI agents that work alone or together under a supervising CEO agent to take work off his plate.",
      'ai-search': "A compact custom search engine built exclusively for tech and AI, cutting through the noise to surface what matters to builders. In progress.",
      'virtual-shelf': "A web app that converts YouTube links into structured, professional notes and keeps them organized in a personal shelf. Planned.",
    },
    skills: {
      'work-with': "Python, Git and GitHub, machine learning, prompt engineering, AI agents, and workflow automation (moderate).",
      learning: "The agentic era and new AI/ML tools and techniques.",
    },
    contact: {
      available: "Yes, he is open to work and remote.",
      email: "rishisakhija7@gmail.com",
      github: "https://github.com/RishiSakhija",
      linkedin: "https://www.linkedin.com/in/rishisakhija",
    },
  };

  return replies[topicId]?.[questionId] || null;
}

export function getReplyForInput(input) {
  const match = scoreTopic(input);
  if (match) {
    const reply = getReply(match.topicId, match.questionId);
    if (reply) return { reply, topicId: match.topicId };
  }
  return {
    reply: "I don't have that yet. The fastest way to reach Rishi is rishisakhija7@gmail.com.",
    topicId: 'contact',
  };
}