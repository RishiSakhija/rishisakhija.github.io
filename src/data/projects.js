export const projects = [
  {
    id: 'ai-search-engine',
    slug: 'ai-search-engine',
    title: 'AI Search Engine',
    simpleWords: 'A search engine that only shows tech and AI results, so builders find useful answers faster.',
    description: 'A compact custom search engine built exclusively for tech and AI, cutting through the noise to surface what matters to builders.',
    tags: ['Python', 'Search', 'AI'],
    status: 'in-progress',
    demoUrl: '#',
    codeUrl: '#',
    overview: 'A specialized search engine that indexes only high-quality technical content — documentation, GitHub repos, technical blogs, and research papers. Uses a combination of traditional BM25 and semantic vector search with reranking to surface the most relevant results for developers and AI practitioners.',
    problem: 'General search engines (Google, Bing) are polluted with SEO spam, outdated tutorials, and low-quality content. Developers waste time filtering through noise to find accurate, current technical information. Existing developer-focused tools are either too narrow (only docs) or too broad.',
    howItWorks: 'The system uses a multi-stage pipeline:\n\n1. **Crawling & Ingestion**: Focused crawlers target known high-quality sources (official docs, top GitHub repos, curated blogs, arXiv). Content is cleaned, chunked, and metadata-enriched.\n\n2. **Embedding & Indexing**: Text chunks are embedded using a fine-tuned sentence transformer optimized for technical content. Stored in a vector database (Qdrant) with payload filtering for source, language, recency.\n\n3. **Hybrid Retrieval**: Query runs parallel BM25 (keyword) and vector (semantic) searches. Results merged via reciprocal rank fusion (RRF).\n\n4. **Reranking**: Top 50 candidates reranked with a cross-encoder trained on developer preference data (clicks, dwell time, explicit feedback).\n\n5. **Answer Synthesis**: For natural language queries, retrieved context fed to a small LLM (7B) with citations for grounded answers.\n\n6. **Serving**: FastAPI backend with Redis caching, deployed on Fly.io with auto-scaling.',
    techStack: ['Python', 'FastAPI', 'Qdrant', 'Sentence Transformers', 'Cross-Encoders', 'Redis', 'Fly.io', 'Docker'],
    learned: 'Hybrid search (BM25 + vector) significantly outperforms either alone for technical queries. Domain-specific embedding fine-tuning matters more than model size. Reranking is the highest-leverage stage — a small cross-encoder adds more quality than doubling vector dimensions. Citation grounding is essential for trust; hallucination rates drop from ~15% to <2% with strict citation enforcement.',
  },
  {
    id: 'agentic-team',
    slug: 'agentic-team',
    title: 'Agentic Team',
    simpleWords: 'A small team of AI helpers, each with a job, led by a manager AI that coordinates them to take work off my plate.',
    description: 'A personal team of specialized AI agents that work independently or in coordination under a supervising CEO agent, designed to reduce workload and automate everyday tasks.',
    tags: ['Python', 'AI Agents', 'Automation'],
    status: 'in-progress',
    demoUrl: '#',
    codeUrl: '#',
    overview: 'A multi-agent system running locally that acts as a personal "AI staff". A supervisor agent receives high-level goals, decomposes them into tasks, and delegates to specialized worker agents. Workers communicate via a shared message bus and can spawn sub-tasks. The system maintains persistent memory across sessions.',
    problem: 'Most AI tools are single-turn chat interfaces. Real work requires multi-step reasoning, tool use, memory, and coordination. Existing agent frameworks are either too rigid (fixed pipelines) or too chaotic (unbounded loops). Need a practical, controllable system for personal automation.',
    howItWorks: 'Built on LangGraph for stateful, cyclic agent graphs:\n\n1. **Supervisor Agent**: Receives user intent, plans task decomposition, assigns to workers, monitors progress, handles escalation.\n\n2. **Worker Agents** (specialized):\n   - **Researcher**: Web search, document retrieval, fact extraction\n   - **Coder**: Code generation, refactoring, test writing, debugging\n   - **Analyst**: Data processing, summarization, insight extraction\n   - **Operator**: File system ops, API calls, browser automation\n\n3. **Shared Memory**: Vector store (Chroma) for long-term context; SQLite for structured state (tasks, decisions, artifacts).\n\n4. **Communication**: Typed message passing via LangGraph channels. Workers can request clarification from supervisor.\n\n5. **Control Plane**: Human-in-the-loop checkpoints for destructive actions. Approval queue UI (Tauri desktop app).\n\n6. **Scheduling**: Cron-like triggers for recurring tasks (daily summaries, monitoring).',
    techStack: ['Python', 'LangGraph', 'LangChain', 'Chroma', 'SQLite', 'Tauri', 'Rust', 'Ollama/Local LLMs'],
    learned: 'Explicit state machines (LangGraph) beat implicit chaining for reliability. Small, specialized agents with clear contracts outperform one large generalist. Human-in-the-loop is not optional for destructive ops — it\'s a feature, not a bug. Local LLMs (7B-14B) are sufficient for most agent reasoning if prompts are structured well. Memory retrieval quality determines agent coherence more than context window size.',
  },
  {
    id: 'virtual-shelf',
    slug: 'virtual-shelf',
    title: 'Virtual Shelf',
    simpleWords: 'Paste a YouTube link and get clean, well-organized notes saved on a personal shelf.',
    description: 'A web app that converts YouTube links into structured, professional notes and keeps them organized in a personal shelf.',
    tags: ['Web App', 'AI', 'Automation'],
    status: 'planned',
    demoUrl: '#',
    codeUrl: '#',
    overview: 'A personal knowledge tool that transforms YouTube videos (talks, tutorials, interviews) into structured, searchable notes. Paste a URL → get transcript → AI extracts key concepts, timestamps, code snippets, and creates a formatted note with table of contents. Notes organized in a personal "shelf" with tags, full-text search, and export options.',
    problem: 'Video content is hard to reference later. You watch a great talk, but three months later you can\'t find the specific insight. Transcripts are noisy. Manual note-taking breaks flow. Existing tools either don\'t handle YouTube well or produce raw transcripts without structure.',
    howItWorks: 'Next.js 14 (App Router) + TypeScript:\n\n1. **Ingestion**: YouTube Data API + yt-dlp for transcripts. Fallback to Whisper API for videos without captions.\n\n2. **Processing Pipeline**:\n   - Transcript cleaning (remove filler, fix punctuation)\n   - Chapter detection via LLM (identifies topic shifts)\n   - Key concept extraction with timestamps\n   - Code block detection and syntax highlighting\n   - Summary generation (executive + detailed)\n\n3. **Storage**: PostgreSQL (Prisma) for notes, tags, metadata. Vector embeddings (pgvector) for semantic search.\n\n4. **Frontend**: React + Tailwind. Shelf view with grid/list, tag filtering, keyboard navigation. Note view with TOC sidebar, timestamp seeking, copy-to-clipboard.\n\n5. **Export**: Markdown, Notion, Obsidian, PDF.\n\n6. **Auth**: Clerk for auth, Stripe for future pro tier.',
    techStack: ['TypeScript', 'Next.js 14', 'React', 'Tailwind', 'PostgreSQL', 'Prisma', 'pgvector', 'Clerk', 'Vercel'],
    learned: 'Transcript quality varies wildly — Whisper API is worth the cost for uncaptioned videos. Chapter detection via LLM is surprisingly accurate with few-shot prompts. Timestamp precision matters: users trust notes more when they can jump to exact moments. Semantic search over notes is higher value than full-text for "fuzzy recall" queries. Export fidelity (Notion/Obsidian) drives retention more than UI polish.',
  },
];

export const featuredProjects = projects.slice(0, 3);

export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map(p => p.slug);
}