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
    period: 'May 2026 – Present',
    description: 'Developing data and business application solutions as part of a summer internship. Working with real-world data systems and contributing to business process improvements through software development.',
    technologies: ['Python', 'SQL', 'Data Analysis', 'Business Applications'],
    achievements: [
      'Contributing to data pipeline development and business application features',
      'Collaborating with cross-functional teams to deliver software solutions',
      'Applying data analysis and engineering skills to real-world business problems',
    ],
  },
  {
    title: 'AI Provost Fellow',
    company: 'USC Honors College',
    location: 'Columbia, SC',
    period: 'Mar 2026 – Present',
    description: 'Awarded a competitive $5,000 fellowship through the Honors College Provost AI Fellowship program to research cultural bias in AI and large language models, studying how LLM outputs reflect and reinforce cultural assumptions through literature review, experimental design, and technical analysis.',
    technologies: ['Python', 'LLMs', 'NLP', 'AI Ethics', 'Research'],
    achievements: [
      'Awarded a competitive $5,000 fellowship to conduct AI research on cultural bias in large language models',
      'Studying cultural bias in LLM outputs through literature review, experimental design, and technical analysis',
      'Working toward a research paper and presentation on findings',
    ],
  },
  {
    title: 'Machine Learning & AI Developer',
    company: 'Center for Industry Solutions',
    location: 'Columbia, SC',
    period: 'Nov 2025 – Present',
    description: 'Contributing to Cerberus, an anomaly-based intrusion detection system identifying cyberattacks, including day-zero threats, through deep learning on network traffic data.',
    technologies: ['Python', 'Hugging Face', 'Deep Learning', 'Cybersecurity'],
    achievements: [
      'Contribute to Cerberus, an anomaly-based intrusion detection system identifying cyberattacks, including day-zero threats',
      'Preprocess and analyze 900K+ network flow packets across 8 traffic classes to support model training and evaluation',
      'Fine-tune a pretrained deep learning model (NetFound) on cybersecurity traffic data using Hugging Face and Python-based tooling',
    ],
  },
  {
    title: 'Undergraduate Teaching Assistant',
    company: 'University of South Carolina',
    location: 'Columbia, SC',
    period: 'Aug 2025 – Present',
    description: 'Supporting computer science education by leading laboratory sessions and mentoring students in fundamental programming concepts. Collaborating with faculty to develop and enhance course materials while providing personalized guidance to help students master Java programming, object-oriented design, and problem-solving methodologies.',
    technologies: ['Java', 'Leadership', 'Teaching'],
    achievements: [
      'Supervise labs and mentor 50+ students in Java fundamentals, problem-solving, and algorithmic thinking',
      'Guide students through debugging and core OOP concepts; enhance exercises through faculty collaboration',
      'Grade assignments and provide feedback to improve programming and design skills',
    ],
  },
  {
    title: 'Undergraduate Research Assistant — Honors College Research Grant',
    company: 'University of South Carolina',
    location: 'Columbia, SC',
    period: 'Aug 2025 – May 2026',
    description: 'Received competitive research grant to develop a MIPS assembly interpreter within the Godot engine using C++. Designed a virtual machine to parse and execute MIPS instructions, modeling registers, memory, and instruction flow within a game engine environment.',
    technologies: ['C++', 'MIPS Assembly', 'Godot Engine', 'Virtual Machine', 'Systems Programming'],
    achievements: [
      'Received competitive research grant to develop a MIPS assembly interpreter within the Godot engine using C++',
      'Designed a virtual machine to parse and execute MIPS instructions, modeling registers, memory, and instruction flow within a game engine environment',
      'Explored integration of low-level systems concepts with game development, laying groundwork for a MIPS-based game engine',
    ],
  },
];

const leadership: ExperienceEntry[] = [
  {
    title: 'Product Manager — Heritage Library AI Initiative',
    company: 'Kappa Theta Pi',
    location: 'Hilton Head, SC (Remote)',
    period: 'Jun 2026 – Present',
    description: "Leading a nonprofit technology partnership with the Heritage Library in Hilton Head to add AI-driven components to their website, as part of Kappa Theta Pi's ongoing nonprofit project initiatives.",
    technologies: ['AI', 'Project Management', 'Web Development'],
    achievements: [
      'Leading product coordination for an AI integration project with the Heritage Library',
      'Scoping requirements and project plan in partnership with library stakeholders',
    ],
  },
  {
    title: 'Product Manager — ktpusc.com',
    company: 'Kappa Theta Pi',
    location: 'Columbia, SC',
    period: 'Aug 2025 – Dec 2025',
    description: 'Led product coordination for the fraternity website, managing a 5-person development team through Jira ticketing, sprint planning, and task assignment.',
    technologies: ['Jira', 'GitHub', 'Product Management', 'Web Development'],
    achievements: [
      'Led product coordination for the fraternity website, managing a 5-person development team through Jira ticketing, sprint planning, and task assignment',
      'Managed the GitHub repository, reviewed pull requests, resolved merge conflicts, and contributed bug fixes to support site reliability',
    ],
  },
  {
    title: 'Co-Founder & Executive Secretary',
    company: 'Kappa Theta Pi — South Carolina',
    location: 'Columbia, SC',
    period: 'Mar 2025 – Apr 2026',
    description: "Co-founded USC's first professional technology fraternity, growing the organization from 9 to 48+ members and building partnerships with 7 nonprofits to apply technical skills to real community challenges.",
    technologies: ['Leadership', 'Nonprofit Partnerships', 'Mentorship', 'Event Planning'],
    achievements: [
      "Co-founded USC's first professional technology fraternity, growing the organization from 9 to 48+ members, launching 9 projects, and building partnerships with 7 nonprofits",
      'Designed and led nonprofit-focused technology projects each semester, creating opportunities for members to apply technical skills to real community challenges',
      'Built onboarding, mentorship, and technical programming initiatives, including workshops, leadership pathways, and project-based involvement',
      'Managed organizational record keeping and coordinated logistics for 35+ events per semester, helping guide chapter growth and long-term direction as a founding member',
    ],
  },
];

const education = [
  { key: 'degree', label: 'Bachelor of Science in Computer Science', type: 'String' },
  { key: 'institution', label: 'University of South Carolina', type: 'String' },
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
            {education.map(({ key, label, type }) => (
              <React.Fragment key={key}>
                <span className="vscode-keyword">private static final {type}</span>{' '}
                <span className="vscode-function">{key}</span> ={' '}
                <span className="vscode-string">"{label}"</span>;{'\n'}
              </React.Fragment>
            ))}
            <span className="vscode-keyword">private static final int</span>{' '}
            <span className="vscode-function">graduating</span> ={' '}
            <span className="vscode-number">2027</span>;{'\n'}
            <span className="vscode-keyword">private static final double</span>{' '}
            <span className="vscode-function">gpa</span> ={' '}
            <span className="vscode-number">4.0</span>;
          </code>
        </pre>
      </div>
    </motion.section>
  </motion.div>
);

export default Experience;
