import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import PageHeader from './PageHeader';
import { fadeUp, stagger } from '../lib/motion';

interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

/**
 * One role on the timeline.
 *
 * The rail and node are drawn with borders on the list item rather than an
 * absolutely positioned overlay, so they track the card's real height.
 */
const ExperienceCard: React.FC<{ exp: ExperienceEntry }> = ({ exp }) => (
  <motion.li variants={fadeUp} className="relative pl-6 sm:pl-8">
    {/* Node on the shared rail. Decorative: the order is already carried by
        the dates inside each entry. */}
    <span
      className="absolute left-0 top-6 w-2.5 h-2.5 -translate-x-1/2 rounded-full
                 bg-accent-text ring-4 ring-editor"
      aria-hidden="true"
    />

    <div className="vscode-terminal vscode-card p-5">
      <h3 className="text-lg font-semibold text-white mb-2">{exp.title}</h3>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-fg-muted text-sm mb-4">
        <span className="inline-flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 shrink-0" aria-hidden="true" />
          {exp.company}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
          {exp.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
          {exp.period}
        </span>
      </div>

      <p className="text-sm leading-relaxed mb-4">{exp.description}</p>

      <ul className="flex flex-wrap gap-1.5 mb-4">
        {exp.technologies.map((tech) => (
          <li key={tech} className="px-2 py-0.5 bg-surface text-xs rounded border border-line">
            <span className="vscode-string">"{tech}"</span>
          </li>
        ))}
      </ul>

      <h4 className="text-sm font-semibold text-white mb-2">Key achievements</h4>
      <ul className="space-y-1.5">
        {exp.achievements.map((achievement) => (
          <li key={achievement} className="text-sm flex items-start gap-2.5">
            <span className="text-accent-text mt-1 leading-none" aria-hidden="true">▸</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.li>
);

/** A timeline column: one continuous rail with a card hanging off each node. */
const Timeline: React.FC<{ entries: ExperienceEntry[] }> = ({ entries }) => (
  <ul className="relative space-y-5">
    <span
      className="absolute left-0 top-6 bottom-6 w-px bg-line"
      aria-hidden="true"
    />
    {entries.map((exp) => (
      <ExperienceCard key={exp.title} exp={exp} />
    ))}
  </ul>
);

/** Group label, matching the eyebrow headings used across the site. */
const GroupHeading: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <motion.h2
    id={id}
    variants={fadeUp}
    className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted mb-4"
  >
    {children}
  </motion.h2>
);

const experiences: ExperienceEntry[] = [
  {
    title: 'Data & Business Applications Intern',
    company: 'CEEUS Inc.',
    location: 'Columbia, SC',
    period: 'May 2026 – Aug 2026',
    description:
      'Built the reporting layer for sales and warehouse operations, replacing manual one-off reports with self-service dashboards, and prototyped an interactive training tool for new inventory staff.',
    technologies: ['Power BI', 'SQL', 'ERP/CRM', 'Data Modeling', 'Stakeholder Analysis'],
    achievements: [
      'Built Power BI dashboards surfacing sales and warehouse KPIs — regional revenue, product-line performance, month-over-month trends, order fulfillment speed and pick/pack accuracy — for cross-departmental stakeholders',
      'Replaced manual, one-off reporting with self-service, auto-refreshing dashboards, cutting recurring report-request turnaround for sales and warehouse teams',
      'Wrote and optimized SQL queries, views and stored procedures against the ERP/CRM database, joining across orders, inventory, customers and shipments to power dashboard pipelines and ad hoc requests',
      'Designed and prototyped an interactive training tool for new inventory staff covering FIFO/LIFO, reorder points, SKU tracking and cycle counting, then iterated on it from new-hire feedback and wrote the accompanying training guide',
      'Partnered with sales, warehouse operations and finance to translate informal asks into defined KPIs, data sources and visualizations',
    ],
  },
  {
    title: 'Provost Undergraduate AI Fellow',
    company: 'University of South Carolina',
    location: 'Columbia, SC',
    period: 'Mar 2026 – Present',
    description:
      'Researching inherent political and societal bias in large language models, and the measurement problem that makes it hard to detect reliably.',
    technologies: ['Python', 'LLMs', 'Llama 4', 'Experimental Design', 'AI Ethics'],
    achievements: [
      'Awarded a competitive $5,000 fellowship to research inherent political and societal bias in large language models',
      'Designed a forced-choice survey administered to a local LLM (Llama 4 Scout), covering political and societal issues, to test whether responses reveal a directional bias',
      'Ran the survey across varying temperature and top-k sampling settings, randomizing question order across sessions to isolate and control for positional bias',
      'Identified positional bias — response bias driven by answer ordering rather than content — as a major confound in LLM bias evaluation, and am developing an averaging method to separate true attitude signal from ordering artifacts',
      'Selected to present findings as a poster at the AI Provost Symposium',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Center for Industry Solutions',
    location: 'Columbia, SC',
    period: 'Nov 2025 – Present',
    description:
      'Own the data and model side of Cerberus, an anomaly-based intrusion detection system that identifies cyberattacks, including day-zero threats, from network traffic.',
    technologies: ['Python', 'Hugging Face', 'PyTorch', 'Apache Arrow', 'Deep Learning', 'Cybersecurity'],
    achievements: [
      'Own the end-to-end data pipeline for Cerberus: parsing raw, day-long PCAP network captures into packet-level records and converting them to Apache Arrow for ingestion by NetFound, a pretrained deep learning model',
      'Fine-tune NetFound on curated cybersecurity traffic spanning 900K+ packets across 8 traffic classes, including day-zero threat scenarios, using Hugging Face and Python tooling',
      'Solved the core data-engineering problem of converting full-day PCAP captures into a packet-level, model-ingestible format at scale',
      'Selected to present ongoing project work at the Center for Industry Solutions opening event',
    ],
  },
  {
    title: 'Undergraduate Teaching Assistant',
    company: 'University of South Carolina',
    location: 'Columbia, SC',
    period: 'Aug 2025 – Present',
    description:
      'Supporting computer science education by leading laboratory sessions and mentoring students in fundamental programming concepts, while collaborating with faculty on course materials.',
    technologies: ['Java', 'Object-Oriented Design', 'Mentorship'],
    achievements: [
      'Supervise labs and mentor 50+ students in Java fundamentals, problem-solving and algorithmic thinking',
      'Guide students through debugging and core OOP concepts, and enhance lab exercises through faculty collaboration',
      'Grade assignments and give feedback aimed at improving programming and design skills',
    ],
  },
  {
    title: 'Undergraduate Research Assistant',
    company: 'University of South Carolina',
    location: 'Columbia, SC',
    period: 'Aug 2025 – Present',
    description:
      'Grant-funded solo project building a RISC-V instruction set interpreter in C++, designed as a teaching tool for low-level computing and computer architecture.',
    technologies: ['C++', 'RISC-V', 'Assembly', 'Virtual Machines', 'Systems Programming'],
    achievements: [
      'Secured a competitive research grant to independently design and implement a RISC-V instruction set interpreter in C++, covering 120+ general assembly instructions alongside memory and register operations',
      'Engineered a virtual machine for real-time instruction flow simulation, built to support student learning in low-level computing and computer architecture education',
      "Designed the interpreter for eventual integration into USC's Introduction to Computer Architecture course curriculum",
    ],
  },
];

const leadership: ExperienceEntry[] = [
  {
    title: 'Product Manager — heritagelib.org',
    company: 'Kappa Theta Pi',
    location: 'Hilton Head, SC (Remote)',
    period: 'May 2026 – Aug 2026',
    description:
      "Product lead on a nonprofit partnership with the Heritage Library, adding retrieval-augmented search over an archive that had never been machine-readable.",
    technologies: ['RAG', 'LLMs', 'Python', 'Document Processing', 'WordPress'],
    achievements: [
      "Implemented an AI retrieval-augmented generation solution on a nonprofit's WordPress site, making a 6,000+ document archive searchable through a chatbot interface",
      'Built a document preprocessing pipeline that converted handwritten documents into plain text and generated alt text for images, enabling the RAG system to ingest and retrieve previously unsearchable archival content',
      "Served as product lead on the integration, balancing accessibility goals against the nonprofit's existing WordPress site and content constraints",
    ],
  },
  {
    title: 'Product Manager — ktpusc.com',
    company: 'Kappa Theta Pi',
    location: 'Columbia, SC',
    period: 'Aug 2025 – Dec 2025',
    description:
      'Led product coordination for the fraternity website, directing a 5-person development team while contributing to the codebase directly.',
    technologies: ['TypeScript', 'Vite', 'Node.js', 'Neon', 'Jira', 'GitHub'],
    achievements: [
      'Led product coordination for the fraternity website — built on Vite, TypeScript, Node.js and Neon — managing a 5-person development team through Jira ticketing, sprint planning and task assignment',
      "Directed engineering priorities and participated in major design decisions as the project's product manager",
      'Contributed hands-on to development when needed, shipping small fixes and unblocking the team to hold deadlines',
      'Managed the GitHub repository, reviewed pull requests and resolved merge conflicts to support site reliability',
    ],
  },
  {
    title: 'Executive Secretary & Founding Member',
    company: 'Kappa Theta Pi',
    location: 'Columbia, SC',
    period: 'Mar 2025 – Present',
    description:
      "Co-founded USC's first professional technology fraternity and helped scale it from a founding cohort into a chapter running projects with nonprofits across the state.",
    technologies: ['Leadership', 'Nonprofit Partnerships', 'Mentorship', 'Event Planning'],
    achievements: [
      "Co-founded USC's first professional technology fraternity, growing the organization to 50+ members, 9 projects and partnerships with 10+ nonprofits",
      "Authored the organization's governing constitution and helped establish its foundational structure as a founding member",
      'Delivered 100% internship and project placement for the graduating junior and senior class of 2026 over summer 2026, through partnerships including Dominion Energy and Capgemini and a workshop hosted by QNX',
      'Designed and maintained a points and attendance tracking system used to monitor member engagement across meetings and events',
      'Built onboarding, mentorship and technical programming initiatives, including recurring workshops and hackathon partnerships',
    ],
  },
];

const education = [
  { key: 'degree', label: 'Bachelor of Science in Computer Science' },
  { key: 'minor', label: 'Data Science' },
  { key: 'institution', label: 'University of South Carolina' },
  { key: 'program', label: 'South Carolina Honors College' },
];

const coursework = [
  'Data Structures & Algorithms',
  'Applied Machine Learning',
  'Advanced Machine Learning',
  'Database System Design (Honors)',
  'Software Engineering',
  'Operating Systems',
  'Azure Cloud Native Development',
  'Math Foundations of Data Science & ML',
];

const Experience: React.FC = () => (
  <motion.div
    variants={stagger(0.06)}
    initial="hidden"
    animate="show"
    className="p-6 sm:p-8 vscode-content"
  >
    <PageHeader
      className_="Experience"
      title="Experience"
      comment="My professional journey and career milestones"
    />

    <section aria-labelledby="exp-professional">
      <GroupHeading id="exp-professional">Professional experience</GroupHeading>
      <Timeline entries={experiences} />
    </section>

    <section className="mt-12" aria-labelledby="exp-leadership">
      <GroupHeading id="exp-leadership">Leadership &amp; extracurriculars</GroupHeading>
      <Timeline entries={leadership} />
    </section>

    <motion.section className="mt-12" aria-labelledby="exp-education">
      <GroupHeading id="exp-education">Education</GroupHeading>
      <div className="vscode-terminal p-5">
        <pre
          className="text-sm leading-6 overflow-x-auto vscode-scrollbar"
          tabIndex={0}
          role="region"
          aria-label="Education details"
        >
          <code>
            {education.map(({ key, label }) => (
              <React.Fragment key={key}>
                <span className="vscode-keyword">private static final String</span>{' '}
                <span className="vscode-function">{key}</span> ={' '}
                <span className="vscode-string">"{label}"</span>;{'\n'}
              </React.Fragment>
            ))}
            <span className="vscode-keyword">private static final int</span>{' '}
            <span className="vscode-function">graduating</span> ={' '}
            <span className="vscode-number">2027</span>;{'\n'}
            <span className="vscode-keyword">private static final double</span>{' '}
            <span className="vscode-function">gpa</span> ={' '}
            <span className="vscode-number">3.92</span>;{'\n'}
            <span className="vscode-comment">{'// President\'s List / Dean\'s List every term to date'}</span>
          </code>
        </pre>
      </div>

      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted mt-8 mb-3">
        Relevant coursework
      </h3>
      <ul className="flex flex-wrap gap-2">
        {coursework.map((course) => (
          <li
            key={course}
            className="px-3 py-1.5 bg-surface rounded text-sm border border-line
                       hover:border-line-hi transition-colors duration-150"
          >
            <span className="vscode-string">"{course}"</span>
          </li>
        ))}
      </ul>
    </motion.section>
  </motion.div>
);

export default Experience;
