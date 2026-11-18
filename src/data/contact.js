export const contactData = {
  email: "rishisakhija7@gmail.com",
  github: "https://github.com/RishiSakhija",
  linkedin: "https://www.linkedin.com/in/rishisakhija",
  resumeUrl: "",
  bookingUrl: "",

  intents: [
    {
      id: "roles",
      title: "Roles and internships",
      description: "Opportunities in AI/ML, agents and automation. Tell me about the role and the team.",
      subject: "Opportunity: AI/ML role or internship",
      body: `Hi Rishi,

I'd like to talk about an opportunity.

Company / team:
Role:
Location or remote:
Timeline:

Thanks,
[Your name]`
    },
    {
      id: "freelance",
      title: "Freelance and projects",
      description: "A task to automate, an AI feature or a prototype to build. Tell me what you need.",
      subject: "Project inquiry",
      body: `Hi Rishi,

I have a project in mind.

What I need:
Why it matters:
Deadline (if any):
Links or context:

Thanks,
[Your name]`
    },
    {
      id: "collaboration",
      title: "Collaboration or hello",
      description: "Ideas, learning together or just a conversation about AI and agents.",
      subject: "Hello from your portfolio",
      body: `Hi Rishi,

I came across your portfolio and wanted to say hello.

What I'm working on / curious about:

Thanks,
[Your name]`
    }
  ],

  channels: [
    {
      id: "email",
      title: "Email",
      bestFor: "Anything, and the fastest way to reach me",
      icon: "email",
      action: { type: "copy", label: "Copy email" }
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      bestFor: "Professional contact and roles",
      icon: "linkedin",
      action: { type: "link", label: "Open LinkedIn", href: "https://www.linkedin.com/in/rishisakhija" }
    },
    {
      id: "github",
      title: "GitHub",
      bestFor: "Seeing my code and projects",
      icon: "github",
      action: { type: "link", label: "Open GitHub", href: "https://github.com/RishiSakhija" }
    }
  ],

  availability: {
    status: "Open to work · Remote",
    openTo: [
      "Roles and internships in AI/ML, agents and automation",
      "Freelance projects",
      "Collaborations"
    ],
    rightNow: [
      "Building a personal team of AI agents",
      "Building a compact search engine for tech and AI",
      "Studying for a Computer Engineering diploma alongside"
    ]
  },

  whatToInclude: [
    { number: "01", title: "Who you are", description: "A line about you or your team." },
    { number: "02", title: "What you need", description: "The role, task or idea in a sentence or two." },
    { number: "03", title: "Timeline", description: "When you'd like to get started, if there is a date." },
    { number: "04", title: "Links or context", description: "Anything that helps me understand the request." }
  ],

  faq: [
    {
      question: "Are you open to remote work?",
      answer: "Yes. I'm based remotely and open to remote roles and projects."
    },
    {
      question: "What kind of work are you looking for?",
      answer: "Roles, internships and projects around AI and machine learning, agents, automation and search systems."
    },
    {
      question: "Can I see your code?",
      answer: "Yes. My repositories are on GitHub, and detailed case studies are being added to the Projects page."
    },
    {
      question: "Do you have a resume?",
      answer: "A downloadable resume is coming soon. Until then, this site and my LinkedIn show my background."
    }
  ]
};