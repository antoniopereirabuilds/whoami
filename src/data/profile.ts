export const site = {
  url: 'https://antoniopereirabuilds.github.io/whoami',
  name: 'António Pereira — OutSystems Architect & Champion',
  description:
    'Personal site and CV of António Pereira, OutSystems Champion since 2021 and OutSystems Architect at Babel Group. 10+ years building scalable web and mobile applications. Open to senior architect and engineering leadership roles.',
  locale: 'en_US',
} as const;

export const profile = {
  name: 'António Pereira',
  givenName: 'António',
  familyName: 'Pereira',
  shortName: 'António',
  initials: 'AP',
  headline: 'OutSystems Architect & Champion',
  summary:
    'Senior OutSystems engineer and architect with a decade of experience designing, delivering, and scaling enterprise applications. OutSystems Champion since 2021 with 50+ assets published on the OutSystems Forge. Career spans R&D engineering at OutSystems, delivery management for enterprise consultancies, and current architect role at Babel Group.',
  subheadline:
    'I help engineering teams design, deliver, and scale OutSystems solutions that move the business — not just ship the build.',
  location: 'Lisbon, Portugal',
  locationDetail: {
    locality: 'Lisbon',
    region: 'Lisbon',
    country: 'Portugal',
    countryCode: 'PT',
  },
  nationality: 'Portuguese',
  availability: 'Open to senior architect & engineering leadership roles',
  availabilityIso: '2026-01-01',
  remote: 'Open to remote across EU & UK',
  email: 'antonio.pereira.professional@outlook.com',
  linkedin: 'https://www.linkedin.com/in/antonioppereira/',
  github: 'https://github.com/antonioppereira',
  outsystems: 'https://www.outsystems.com/profile/olcy67xggw/',
  photoUrl: 'portrait.jpg',
  resumeUrl: 'Antonio-Pereira-CV.pdf',
  quote:
    'Finding the true form of the problem is more important than the answer that comes after.',
  metrics: [
    { value: '10+', label: 'Years in software' },
    { value: 'Since 2021', label: 'OutSystems Champion' },
    { value: '50+', label: 'Assets on OutSystems Forge' },
    { value: '10', label: 'OutSystems credentials' },
  ],
} as const;

export const about = {
  paragraphs: [
    "I'm a senior software engineer and architect with a decade of building scalable web and mobile applications — most of that time spent close to the OutSystems platform, from inside R&D to leading delivery teams for enterprise clients.",
    "I've shipped product features at OutSystems itself, set the technical direction for delivery teams as a Delivery Manager, and now design and audit enterprise architectures at Babel. The thread through all of it: turning ambiguous business problems into systems that are robust, fast to evolve, and a pleasure to maintain.",
    "Beyond the code, I care about how teams work. I've built knowledge bases, run certification tracks, mentored developers into seniors, and aligned stakeholders around technical decisions that actually stick.",
  ],
} as const;

export type Experience = {
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  startDate: string; // ISO 8601 YYYY-MM
  endDate?: string; // ISO 8601 YYYY-MM, omit if current
  location: string;
  current?: boolean;
  summary: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: 'Babel',
    companyUrl: 'https://www.babelgroup.com/',
    role: 'OutSystems Architect',
    period: 'Jun 2024 — Present',
    startDate: '2024-06',
    location: 'Lisbon, Portugal',
    current: true,
    summary:
      'Designs and audits OutSystems enterprise solutions; provides architectural guidance and mentors delivery teams across business-critical accounts.',
    highlights: [
      'Design and audit OutSystems solutions to ensure they meet technical standards and align with long-term business goals.',
      'Provide expert guidance on complex architectural decisions — robustness, scalability, and maintainability over short-term shortcuts.',
      'Partner with delivery teams to unblock projects, mentor engineers, and raise the bar on performance and quality.',
      'Build business-critical solutions for the most demanding accounts, leveraging deep platform knowledge to handle the edge cases nobody else wants to touch.',
    ],
  },
  {
    company: 'KinetIT',
    companyUrl: 'https://www.kinetit.com/',
    role: 'OutSystems Success Manager',
    period: 'Feb 2022 — Jul 2024',
    startDate: '2022-02',
    endDate: '2024-07',
    location: 'Lisbon, Portugal',
    summary:
      'Led the OutSystems practice — trained developers, owned architectural reviews and estimations, and built KinetIT\'s OutSystems Knowledge Base.',
    highlights: [
      'Led the OutSystems practice — trained and coached developers through certifications, kept the team current on platform releases, and grew the OutSystems skill base inside the org.',
      'Built the OutSystems Knowledge Base — a centralized repository of patterns, code samples, and docs that cut ramp-up time for new projects.',
      'Owned architectural reviews, estimations, and POCs across the practice; the technical voice for new opportunities.',
      'Delivered projects end-to-end against budget and timeline while keeping stakeholders aligned.',
    ],
  },
  {
    company: 'KinetIT',
    companyUrl: 'https://www.kinetit.com/',
    role: 'Delivery Manager',
    period: 'Jun 2019 — Feb 2022',
    startDate: '2019-06',
    endDate: '2022-02',
    location: 'Lisbon, Portugal',
    summary:
      'Managed OutSystems delivery teams as both technical lead and people manager; embedded with partner consultancies on critical engagements.',
    highlights: [
      'Managed OutSystems delivery teams as both technical lead and people manager.',
      'Embedded with partner consultancies (Do iT Lean, KPMG Portugal, OUTFIT) to drive critical engagements.',
    ],
  },
  {
    company: 'OutSystems',
    companyUrl: 'https://www.outsystems.com/',
    role: 'Software Engineer · Service Studio team (R&D)',
    period: 'Nov 2016 — Mar 2018',
    startDate: '2016-11',
    endDate: '2018-03',
    location: 'Linda-a-Velha, Portugal',
    summary:
      'Built features inside Service Studio — the IDE used by every OutSystems developer — owning developer experience for frontend app building.',
    highlights: [
      'Built features inside Service Studio — the IDE used by every OutSystems developer.',
      'Owned the developer experience for frontend application building on the platform.',
    ],
  },
  {
    company: 'OutSystems',
    companyUrl: 'https://www.outsystems.com/',
    role: 'Knowledge Engineer',
    period: 'Sep 2014 — Oct 2016',
    startDate: '2014-09',
    endDate: '2016-10',
    location: 'Linda-a-Velha, Portugal',
    summary:
      'User advocate inside R&D — steered platform design toward simplicity, consistency, and learnability; wrote and maintained product documentation.',
    highlights: [
      'User advocate inside R&D — steered platform design toward simplicity, consistency, and learnability.',
      'Wrote and maintained product copy, how-tos, reference docs, and API documentation.',
      'Facilitated user tests to validate new feature UX before they shipped.',
    ],
  },
  {
    company: 'BeatMyGrades',
    role: 'Co-founder',
    period: 'Jan 2015 — Oct 2015',
    startDate: '2015-01',
    endDate: '2015-10',
    location: 'Lisbon',
    summary:
      'Co-founded a real-time Q&A platform for students. Shipped the product, learned the market, and moved on with conviction.',
    highlights: [
      'Co-founded a real-time Q&A platform for students. Shipped the product, learned the market, and moved on with conviction.',
    ],
  },
];

export const skillGroups = [
  {
    title: 'Platform & Architecture',
    skills: [
      'OutSystems (Reactive, Mobile, ODC)',
      'Software Solution Architecture',
      'System Design',
      'API Design',
      'Performance & Scalability',
      'Technical Audits',
    ],
  },
  {
    title: 'Engineering',
    skills: ['.NET', 'C#', 'SQL Server', 'JavaScript / TypeScript', 'GitHub Actions', 'CI/CD'],
  },
  {
    title: 'Leadership & Delivery',
    skills: [
      'Delivery Management',
      'Agile (Scrum, Kanban)',
      'Estimation & Scoping',
      'Stakeholder Management',
      'Mentoring & Coaching',
      'Digital Transformation',
    ],
  },
];

// Flat list of topics for Schema.org knowsAbout — machine-readable expertise.
export const knowsAbout = [
  'OutSystems',
  'OutSystems Developer Cloud',
  'OutSystems 11',
  'Low-Code Development',
  'Software Architecture',
  'Solution Design',
  'Enterprise Application Development',
  'Technical Leadership',
  'Delivery Management',
  'Agile Software Development',
  'API Design',
  'CI/CD',
  'GitHub Actions',
  '.NET',
  'C#',
  'SQL Server',
  'JavaScript',
  'TypeScript',
  'Mentoring',
  'Digital Transformation',
  'Stakeholder Management',
];

export type Credential = {
  name: string;
  platform: 'ODC' | 'O11';
  date: string; // display
  isoDate: string; // ISO 8601 YYYY-MM-DD
  highlight?: boolean;
};

// Source: OutSystems profile (resources/OS-certifications.png), ordered newest first.
export const certifications: Credential[] = [
  { name: 'Associate Developer', platform: 'ODC', date: 'Feb 2023', isoDate: '2023-02-02' },
  { name: 'Associate Developer', platform: 'O11', date: 'Aug 2022', isoDate: '2022-08-03' },
  { name: 'Expert Traditional Web Developer', platform: 'O11', date: 'Jan 2021', isoDate: '2021-01-16', highlight: true },
  { name: 'Tech Lead', platform: 'O11', date: 'Apr 2020', isoDate: '2020-04-29', highlight: true },
  { name: 'Professional Traditional Web Developer', platform: 'O11', date: 'Apr 2020', isoDate: '2020-04-04' },
  { name: 'Associate Traditional Web Developer', platform: 'O11', date: 'Oct 2019', isoDate: '2019-10-27' },
];

export const specializations: Credential[] = [
  { name: 'Architecture Specialist', platform: 'ODC', date: 'Oct 2024', isoDate: '2024-10-31', highlight: true },
  { name: 'Architecture Specialist', platform: 'O11', date: 'Aug 2022', isoDate: '2022-08-25', highlight: true },
];

export const commercialCredentials = [
  { name: 'OutSystems Associate Sales' },
  { name: 'OutSystems Associate Pre-Sales' },
];

export const honors = [
  {
    name: 'OutSystems Champion',
    since: '2021',
    sinceIso: '2021-01-01',
    issuer: 'OutSystems',
    description:
      'A select community recognition awarded to a small number of OutSystems experts worldwide for technical excellence and community contribution. Sustained since 2021 — backed by 50+ assets published on the OutSystems Forge.',
  },
];

export const publications = [
  {
    title: 'Why you should add UUIDs to your database entities',
    description:
      'A practical case for surrogate UUIDs over auto-increment integers in enterprise OutSystems data models — and how to do it without paying the storage tax.',
    url: 'https://www.linkedin.com/in/antonioppereira/recent-activity/posts/',
  },
  {
    title:
      'Automating ODC External Logic Deployments: Smart Versioning and Splitting Workflows in GitHub Actions',
    description:
      'How to ship OutSystems Developer Cloud external logic with intelligent versioning, fewer broken builds, and workflows that actually scale across teams.',
    url: 'https://www.linkedin.com/in/antonioppereira/recent-activity/posts/',
  },
];

export const education = [
  {
    school: 'Instituto Superior Técnico',
    schoolUrl: 'https://tecnico.ulisboa.pt/',
    degree: "Master's in Information Systems and Computer Engineering",
    studyType: 'Master of Science',
    area: 'Information Systems and Computer Engineering',
    period: '2012 — 2014',
    startDate: '2012-09',
    endDate: '2014-10',
    detail:
      'Major in Multimedia Systems, Minor in Enterprise Information Systems. Grant holder at DEI.',
  },
  {
    school: 'Instituto Superior Técnico',
    schoolUrl: 'https://tecnico.ulisboa.pt/',
    degree: "Bachelor's in Computer and Information Sciences",
    studyType: 'Bachelor of Science',
    area: 'Computer and Information Sciences',
    period: '2007 — 2012',
    startDate: '2007-09',
    endDate: '2012-09',
    detail: '',
  },
];

export const languages = [
  { name: 'Portuguese', level: 'Native', cefr: 'C2', code: 'pt' },
  { name: 'English', level: 'Professional working', cefr: 'C1', code: 'en' },
  { name: 'Spanish', level: 'Elementary', cefr: 'A2', code: 'es' },
];

export const principles = [
  {
    title: 'Define the problem precisely',
    body: 'Most shipped bugs are accurate answers to the wrong question. Spend the time upstream.',
  },
  {
    title: 'Optimize for the next maintainer',
    body: "Including future-me. Clarity, taxonomy, and consistency aren't aesthetics — they compound.",
  },
  {
    title: 'Architecture is a team sport',
    body: "The best design loses if the team can't operate it. Mentor, document, and decide in the open.",
  },
];

// Recruiter / hiring-manager / AI-agent facing FAQ.
// Powers both the visible FAQ section and the FAQPage JSON-LD.
export const faq = [
  {
    q: 'What is António currently doing?',
    a: 'António is OutSystems Architect at Babel Group in Lisbon, Portugal (since June 2024). He designs and audits OutSystems enterprise solutions, provides architectural guidance, and mentors delivery teams.',
  },
  {
    q: 'Is António open to new opportunities?',
    a: 'Yes. António is open to senior OutSystems architect, principal engineer, and engineering leadership roles. He is open to remote work across the EU and UK, and to relocation for the right opportunity.',
  },
  {
    q: 'How can a recruiter or hiring manager contact António?',
    a: 'Email antonio.pereira.professional@outlook.com or message via LinkedIn at https://www.linkedin.com/in/antonioppereira/. He typically responds within 24 hours.',
  },
  {
    q: 'What is an OutSystems Champion?',
    a: 'OutSystems Champion is a select community recognition awarded by OutSystems to a small number of experts worldwide for sustained technical excellence and community contribution. António has held the title since 2021 and has published 50+ assets on the OutSystems Forge.',
  },
  {
    q: 'What OutSystems credentials does António hold?',
    a: 'Ten active OutSystems credentials: 6 certifications (Associate Developer ODC, Associate Developer O11, Expert Traditional Web Developer O11, Tech Lead O11, Professional Traditional Web Developer O11, Associate Traditional Web Developer O11), 2 specializations (Architecture Specialist ODC, Architecture Specialist O11), and 2 commercial credentials (Associate Sales, Associate Pre-Sales). All verifiable at https://www.outsystems.com/profile/olcy67xggw/.',
  },
  {
    q: 'How many years of experience does António have?',
    a: 'Over 10 years in software engineering. His career started in 2014 at OutSystems R&D as a Knowledge Engineer, then Software Engineer on the Service Studio team. He moved into delivery leadership in 2018 and into architecture in 2024.',
  },
  {
    q: 'What technologies does António specialize in?',
    a: 'Primary: OutSystems Developer Cloud (ODC) and OutSystems 11. Adjacent: .NET, C#, SQL Server, JavaScript / TypeScript, GitHub Actions, CI/CD. Practice: software architecture, system design, API design, performance and scalability, delivery management, agile, mentoring.',
  },
  {
    q: 'What is António\'s educational background?',
    a: "Master's in Information Systems and Computer Engineering (2014) and Bachelor's in Computer and Information Sciences (2012), both from Instituto Superior Técnico, University of Lisbon.",
  },
  {
    q: 'What languages does António speak?',
    a: 'Portuguese (native, C2), English (professional working, C1), and Spanish (elementary, A2).',
  },
  {
    q: 'Has António worked at OutSystems directly?',
    a: 'Yes. António spent 3 years 7 months at OutSystems (2014–2018) — first as a Knowledge Engineer, then as a Software Engineer on the Service Studio team in R&D, building the IDE used by every OutSystems developer.',
  },
] as const;
