export const projects = [
  {
    slug: 'rishi-os',
    name: 'Rishi-OS',
    subtitle: 'Agentic Team',
    status: 'In progress',
    statusNote: 'The agents run on a schedule and produce drafts for my review.',
    repo: 'https://github.com/RishiSakhija/Rishi-OS',
    demo: '',
    tags: ['Python', 'AI Agents', 'Automation'],
    diagram: 'hub',
    tagline: 'A seven-agent system for research, content and growth, where I approve every output.',
    plainWords: 'Think of a small office of AI helpers, each with one job. They prepare research, ideas and drafts on a schedule, a manager agent reviews the team\'s work each week, and nothing is published until I approve it.',
    summary: [
      'Rishi-OS is a system of seven scheduled agents that handle marketing, research and personal-growth work for two startups and my personal brand. Each agent has one job, such as finding fresh research, compressing a long video into notes, or turning an idea into platform-ready posts.',
      'It is designed to cost nothing to run: scheduling runs on GitHub Actions, data lives in a Supabase Postgres database, and a Streamlit dashboard lets me review, approve or reject what the agents produce. The agents only ever write drafts, so a human is always the last step.'
    ],
    goal: 'Take research, content and growth work off my plate without losing control of what gets published.',
    coverAlt: 'Concept visual: a lead robot coordinating a team of robots around a holographic network.',
    facts: [
      { label: 'Agents', value: '7' },
      { label: 'Model calls per run', value: '1' },
      { label: 'Output', value: 'Drafts for human review' },
      { label: 'Runs on', value: 'GitHub Actions (scheduled)' },
      { label: 'Data', value: 'Supabase (PostgreSQL)' },
      { label: 'Control room', value: 'Streamlit dashboard' }
    ],
    problem: {
      intro: 'Running marketing, research and personal-growth work for two startups and a personal brand takes more hours than one person has.',
      points: [
        'Too much repetitive research, drafting and reporting for one person.',
        'Paid platforms and open-ended agent loops make costs hard to predict.',
        'Letting AI publish by itself is risky, so a person has to stay in control.'
      ]
    },
    boundaries: {
      title: 'What it deliberately avoids',
      items: [
        'No agent frameworks such as LangChain or CrewAI.',
        'No planning rounds or reflection loops, only one fixed workflow.',
        'No automatic publishing of any kind.'
      ]
    },
    steps: [
      { title: 'Check the cap', text: 'Before doing anything, the agent confirms it is enabled and under its daily limit.' },
      { title: 'Load the brand and gather input', text: 'It loads the brand profile and collects fresh material with plain code, trimmed to under 4,000 characters.' },
      { title: 'Make one model call', text: 'A single call goes through a shared router that falls back across providers if one fails.' },
      { title: 'Validate and save', text: 'The result is checked against a template and saved as a draft for review.' },
      { title: 'Log the run', text: 'Every run is recorded in an append-only log, including failures.' }
    ],
    architecture: [
      {
        name: 'Scheduler',
        note: 'Serverless cron, no always-on server',
        items: ['GitHub Actions: daily, weekly and 20-minute jobs']
      },
      {
        name: 'Shared core',
        note: 'The only place that touches models',
        items: ['Cap checker', 'Brand loader', 'Search and de-duplication', 'Model router', 'Validator', 'Telemetry logger']
      },
      {
        name: 'Seven agents',
        note: 'Thin, linear scripts with one model call each',
        items: ['Research', 'Growth Coach', 'Summarize Librarian', 'Idea Strategist', 'Packaging Studio', 'Analytics Auditor', 'CEO Supervisor']
      },
      {
        name: 'Datahouse',
        note: 'The single source of truth',
        items: ['Supabase PostgreSQL', '7 tables: agents, tasks, outputs, logs, brands, usage, notes']
      },
      {
        name: 'Control room',
        note: 'Review and approve, with no AI inside',
        items: ['Streamlit dashboard', 'Approve, reject and edit drafts', 'Queue work and toggle limits']
      }
    ],
    agents: [
      { name: 'Research Agent', job: 'Finds fresh, de-duplicated signal on a topic.', output: 'Draft' },
      { name: 'Growth Coach Agent', job: 'Gives personal progress and habit coaching.', output: 'Needs review' },
      { name: 'Summarize Librarian', job: 'Compresses long-form input into a library entry.', output: 'Draft' },
      { name: 'Idea Strategist', job: 'Turns research into ranked content angles.', output: 'Needs review' },
      { name: 'Packaging Studio', job: 'Drafts platform-ready posts from one angle.', output: 'Needs review' },
      { name: 'Analytics Auditor', job: 'Reads metrics and reports what actually worked.', output: 'Draft' },
      { name: 'CEO Supervisor', job: 'Reviews the whole team each week and sets priorities.', output: 'Needs review' }
    ],
    principles: [
      { title: 'Plain code first', text: 'Scheduling, de-duplicating, counting and formatting are ordinary Python. The model never does a job a simple loop can do.' },
      { title: 'One model call per run', text: 'No planning rounds or reflection loops. One fixed workflow, one call, then exit, which keeps cost and behavior predictable.' },
      { title: 'A human is always last', text: 'Agents only write drafts or items that need review. There is no publish path anywhere in the system.' },
      { title: 'Zero budget by design', text: 'Hard daily limits, short inputs and low-frequency schedules are enforced in code, not left to discipline.' },
      { title: 'No single point of failure', text: 'A router tries several model providers in turn, so any one reachable provider is enough.' }
    ],
    ledger: [
      { label: 'Compute', value: 'GitHub Actions free tier' },
      { label: 'Database', value: 'Supabase free tier' },
      { label: 'Models', value: 'Free tiers across several providers, then a local model' },
      { label: 'Dashboard', value: 'Streamlit, run locally' },
      { label: 'Orchestration', value: 'Plain Python, no paid agent platform' }
    ],
    ledgerNote: 'Built to run on free tiers. They can change, which is why the router keeps several providers.',
    tech: [
      { name: 'Python' },
      { name: 'Supabase (PostgreSQL)' },
      { name: 'GitHub Actions' },
      { name: 'Streamlit' },
      { name: 'DeepSeek' },
      { name: 'NVIDIA NIM' },
      { name: 'Gemini' },
      { name: 'Groq' },
      { name: 'Ollama' },
      { name: 'Tavily' },
      { name: 'feedparser' },
      { name: 'youtube-transcript-api' }
    ],
    roadmap: [],
    learned: '',
    nextSteps: [],
    screenshots: []
  },
  {
    slug: 'tech-intelligence-engine',
    name: 'Tech Intelligence Engine',
    subtitle: '',
    status: 'Foundation complete',
    statusNote: 'Research and architecture are complete. The build starts with Goal 1: ingesting arXiv papers into PostgreSQL.',
    repo: 'https://github.com/RishiSakhija/tech-intelligence-engine',
    demo: '',
    tags: ['Search', 'AI', 'System design'],
    diagram: 'flow',
    tagline: 'A vertical search and tracking engine built only for the technology ecosystem.',
    plainWords: 'Instead of searching the whole web, it will watch the sources that matter for tech and AI, such as research papers, code releases and model announcements, and help you find, understand and follow what\'s new.',
    summary: [
      'The Tech Intelligence Engine is a personalized search and tracking platform for the fast-moving technology ecosystem. It is designed to combine focused search over high-quality technical sources, discovery of things you didn\'t know to look for, and tracking of what actually changed in releases, benchmarks and models.',
      'The project is at the end of its foundation phase: the product vision, requirements, competitor analysis, data source strategy, search design, system architecture, data model, security and evaluation plans are written, and ten architecture decisions are documented. The application itself has not been built yet.'
    ],
    goal: 'Help people discover, understand and track technology developments, with results they can trace back to their sources.',
    coverAlt: 'Concept visual: a glowing magnifying glass lifting search result cards in front of a curved monitor.',
    facts: [
      { label: 'Stage', value: 'Foundation complete' },
      { label: 'Next goal', value: 'arXiv ingestion into PostgreSQL' },
      { label: 'Documentation', value: '13 design documents, 10 decision records' },
      { label: 'Application', value: 'Not built yet' },
      { label: 'Budget', value: '$0, local-first and open source' },
      { label: 'Planned phases', value: '7 (Phase 0 to 6)' }
    ],
    problem: {
      intro: 'The technology world moves faster than anyone can follow. New models, papers, releases and benchmarks appear every day, and existing tools each solve only part of the problem.',
      points: [
        'What new papers matter this week? arXiv is a firehose with no ranking by relevance.',
        'Where are all the coding benchmark results? They are scattered across papers, blogs and leaderboards.',
        'Which release broke my dependency? Changelogs are buried and notifications are noisy.'
      ]
    },
    boundaries: {
      title: 'What it is not',
      items: [
        'Not a Google replacement or a generic web search engine.',
        'Not an RSS or news aggregator.',
        'Not a chatbot wrapper or a code completion tool.'
      ]
    },
    steps: [
      { title: 'Collect', text: 'Pull from trusted sources such as arXiv, GitHub, Hugging Face, RSS feeds and company blogs.', state: 'planned' },
      { title: 'Clean and de-duplicate', text: 'Normalize everything into one format and remove repeats.', state: 'planned' },
      { title: 'Enrich', text: 'Extract entities such as models, papers, researchers and benchmarks, and the links between them.', state: 'planned' },
      { title: 'Index', text: 'Store the results for both keyword and meaning-based search.', state: 'planned' },
      { title: 'Search, discover, track', text: 'Answer queries, build personalized briefings and show what changed.', state: 'planned' }
    ],
    architecture: [
      {
        name: 'Frontend',
        note: 'Next.js',
        items: ['Search', 'Discovery feed', 'Research workspace', 'Settings'],
        state: 'planned'
      },
      {
        name: 'API',
        note: 'FastAPI',
        items: ['Authentication', 'Rate limiting', 'Request routing'],
        state: 'planned'
      },
      {
        name: 'Services',
        note: 'Three focused services',
        items: ['Search', 'Discovery', 'Research'],
        state: 'planned'
      },
      {
        name: 'Storage',
        note: 'Replaceable, open-source parts',
        items: ['PostgreSQL', 'OpenSearch', 'Qdrant', 'Redis'],
        state: 'planned'
      },
      {
        name: 'Ingestion',
        note: 'Sources to index',
        items: ['arXiv', 'GitHub', 'Hugging Face', 'RSS and blogs'],
        state: 'planned'
      }
    ],
    agents: [],
    principles: [
      { title: 'Evidence over intuition', text: 'Every architectural claim is backed by research or an experiment.' },
      { title: 'Vertical depth over breadth', text: 'Own the tech ecosystem completely before expanding.' },
      { title: 'Simplicity first', text: 'Start with deterministic pipelines and add agents only where they clearly help.' },
      { title: 'Source transparency', text: 'Every result is traceable to its source, and citations are mandatory.' },
      { title: 'Zero budget, no lock-in', text: 'Local-first, open-source and replaceable dependencies.' }
    ],
    ledger: [],
    tech: [
      { name: 'Python', state: 'planned' },
      { name: 'FastAPI', state: 'planned' },
      { name: 'PostgreSQL', state: 'planned' },
      { name: 'OpenSearch', state: 'planned' },
      { name: 'Qdrant', state: 'planned' },
      { name: 'Redis', state: 'planned' },
      { name: 'Next.js', state: 'planned' }
    ],
    roadmap: [
      {
        phase: 'Phase 0',
        title: 'Foundation and research',
        state: 'done',
        items: [
          'Vision, requirements and competitor analysis',
          'Data source and search strategy',
          'System architecture and data model',
          'Evaluation framework and 10 decision records'
        ]
      },
      {
        phase: 'Phase 1',
        title: 'Data foundation',
        state: 'next',
        items: [
          'Ingestion framework',
          'Source connectors: arXiv, GitHub, Hugging Face, RSS',
          'Normalization and de-duplication',
          'Basic indexing pipeline'
        ]
      },
      {
        phase: 'Phase 2',
        title: 'Search MVP',
        state: 'planned',
        items: [
          'Hybrid keyword and semantic search',
          'Basic ranking',
          'Search API and a minimal interface'
        ]
      },
      {
        phase: 'Phase 3',
        title: 'Search quality',
        state: 'planned',
        items: [
          'Reranking',
          'Query understanding',
          'Evaluation benchmarks'
        ]
      },
      {
        phase: 'Phase 4',
        title: 'Personalized discovery',
        state: 'planned',
        items: [
          'Interest modeling',
          'Follow system',
          'Personalized ranking'
        ]
      },
      {
        phase: 'Phase 5',
        title: 'Tracking and change detection',
        state: 'planned',
        items: [
          'Release diffing',
          'Benchmark tracking',
          'Alerts'
        ]
      },
      {
        phase: 'Phase 6',
        title: 'Agentic research',
        state: 'planned',
        items: [
          'Research planner',
          'Source research agents',
          'Synthesis and verification'
        ]
      }
    ],
    nextSteps: [
      { text: 'Goal 1: ingest arXiv papers into PostgreSQL', done: false }
    ],
    learned: '',
    screenshots: []
  },
  {
    slug: 'virtual-shelf',
    name: 'Virtual Shelf',
    subtitle: '',
    status: 'Early stage',
    statusNote: 'Working on Step 1: proving that the core note generation is consistently good before any interface work.',
    repo: 'https://github.com/RishiSakhija/virtual-shelf',
    demo: '',
    tags: ['Web App', 'AI', 'Automation'],
    diagram: 'flow',
    tagline: 'Turns YouTube lectures and PDFs into structured notes with auto-generated diagrams, shelved in a bookshelf-style library.',
    plainWords: 'Paste a lecture link or add a PDF and get clean, organized notes with diagrams, saved on a digital shelf you can browse.',
    summary: [
      'Virtual Shelf takes long lectures and documents and turns them into structured, study-friendly notes, including auto-generated Mermaid diagrams. The finished product is meant to present them in a bookshelf-style interface with a handwritten-note look.',
      'The project follows one firm rule: prove the core generation first. No interface work starts until the notes the pipeline produces are consistently good, so the product never becomes a beautiful shelf of mediocre notes.'
    ],
    goal: 'Turn long lectures into notes worth keeping, organized in a personal library.',
    coverAlt: 'Concept visual: video notes turning into organized note cards on a glowing shelf.',
    facts: [
      { label: 'Stage', value: 'Step 1: core generation' },
      { label: 'Input', value: 'YouTube lectures and PDFs' },
      { label: 'Output', value: 'Structured notes with Mermaid diagrams' },
      { label: 'Models', value: 'Gemini and Groq, swappable by config' },
      { label: 'Interface', value: 'Bookshelf UI, planned' }
    ],
    problem: {
      intro: 'Learning from long lectures is slow, and notes are hard to keep organized.',
      points: [
        'Long lectures take hours to rewatch.',
        'Hand-written notes are slow and inconsistent.'
      ]
    },
    boundaries: {
      title: 'How the build stays on track',
      items: [
        'Core generation first, interface later.',
        'Every model provider sits behind one interface and is chosen in a config file, so it can be swapped without touching code.',
        'Results are cached by content, so the same input with the same prompt is never generated twice.'
      ]
    },
    steps: [
      { title: 'Take an input', text: 'A YouTube lecture link or a PDF.' },
      { title: 'Generate with a model', text: 'A provider such as Gemini or Groq turns it into structured notes.' },
      { title: 'Add diagrams', text: 'Mermaid diagrams are generated automatically from the content.' },
      { title: 'Cache the result', text: 'The output is stored by content, so repeat requests are instant.' },
      { title: 'Shelve it', text: 'The notes appear in a bookshelf-style library with a handwritten-note look.', state: 'planned' }
    ],
    architecture: [
      {
        name: 'Input',
        note: 'What goes in',
        items: ['YouTube lectures', 'PDFs']
      },
      {
        name: 'Providers',
        note: 'Swappable by config',
        items: ['Gemini', 'Groq']
      },
      {
        name: 'Cache',
        note: 'Content-addressed',
        items: ['Same input and same prompt version are never generated twice']
      },
      {
        name: 'Output',
        note: 'What comes out',
        items: ['Structured notes', 'Mermaid diagrams']
      },
      {
        name: 'Shelf',
        note: 'Bookshelf interface',
        items: ['Library view', 'Handwritten-note look'],
        state: 'planned'
      }
    ],
    agents: [],
    principles: [
      { title: 'Prove the core before the interface', text: 'No UI work happens until the generated notes are consistently good.' },
      { title: 'Providers are replaceable', text: 'Free-tier models get deprecated or rate-limited without notice, so model choice lives in one config file.' },
      { title: 'Never pay twice', text: 'A content-addressed cache means identical requests are never regenerated.' }
    ],
    ledger: [],
    tech: [
      { name: 'Python' },
      { name: 'Gemini API' },
      { name: 'Groq' },
      { name: 'Mermaid.js' }
    ],
    roadmap: [
      {
        phase: 'Step 1',
        title: 'Prove core generation',
        state: 'current',
        items: [
          'Reliable, consistently good note generation from YouTube lectures and PDFs'
        ]
      },
      {
        phase: 'Next',
        title: 'Bookshelf interface',
        state: 'planned',
        items: [
          'Library view',
          'Handwritten-note look'
        ]
      }
    ],
    nextSteps: [],
    learned: '',
    screenshots: []
  }
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