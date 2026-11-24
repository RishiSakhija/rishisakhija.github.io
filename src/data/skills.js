export const skillsData = {
  groups: [
    {
      id: "core",
      label: "Core",
      skills: [
        {
          name: "Python",
          description: "The language I build most of my projects in.",
          level: null,
          usedIn: ["rishi-os", "virtual-shelf"]
        },
        {
          name: "Git",
          description: "Version control for every project, so its history shows how it grew.",
          level: null,
          usedIn: []
        },
        {
          name: "GitHub",
          description: "Where my code lives, and where this site is built and deployed.",
          level: null,
          usedIn: []
        }
      ]
    },
    {
      id: "ai-ml",
      label: "AI and machine learning",
      skills: [
        {
          name: "Machine learning",
          description: "Learning how models work and where they fit, by building with them.",
          level: null,
          usedIn: []
        },
        {
          name: "Prompt engineering",
          description: "Writing clear instructions that make AI tools give dependable, usable results.",
          level: null,
          usedIn: []
        },
        {
          name: "Large language model APIs",
          description: "Connecting language models to my own code so they can power agents and automations.",
          level: null,
          usedIn: ["rishi-os", "virtual-shelf"]
        },
        {
          name: "AI agents",
          description: "Designing agents with specific jobs and connecting them so they work alone or as a team, as in Rishi-OS.",
          level: null,
          usedIn: ["rishi-os"]
        },
        {
          name: "Agent frameworks and libraries",
          description: "I'm exploring agent frameworks. My own system, Rishi-OS, deliberately avoids them: plain Python and one fixed workflow keep it cheap, predictable and easy to debug.",
          level: null,
          usedIn: []
        }
      ]
    },
    {
      id: "automation",
      label: "Automation",
      skills: [
        {
          name: "Workflow automation",
          description: "Turning repetitive tasks into simple, reliable workflows.",
          level: null,
          usedIn: ["rishi-os"]
        }
      ]
    },
    {
      id: "ways-of-working",
      label: "Ways of working",
      skills: [
        {
          name: "Building with AI coding assistants",
          description: "Directing AI coding assistants to build projects, then reviewing the result before it goes live.",
          level: null,
          usedIn: []
        },
        {
          name: "Learning by building",
          description: "Picking a real problem, building something, and keeping what I learn.",
          level: null,
          usedIn: []
        }
      ]
    }
  ],

  exploring: [
    {
      name: "Search systems",
      description: "The foundation of the Tech Intelligence Engine: finding and ranking results."
    },
    {
      name: "Vector databases and embeddings",
      description: "Storing meaning as numbers so search can match ideas, not just keywords."
    },
    {
      name: "Web scraping",
      description: "Collecting information from the web for search and research projects."
    }
  ],

  learnSteps: [
    {
      number: "01",
      title: "Pick a real problem",
      description: "I start from something I actually want to solve."
    },
    {
      number: "02",
      title: "Build it",
      description: "I make a working version first, even a rough one."
    },
    {
      number: "03",
      title: "Keep what I learn",
      description: "I note what broke and why, so the next build is better."
    }
  ]
};