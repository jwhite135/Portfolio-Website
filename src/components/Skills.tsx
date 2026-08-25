import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, BarChart3, Wrench, Award } from 'lucide-react';
import PageHeader from './PageHeader';
import { fadeUp, stagger, viewportOnce, EASE } from '../lib/motion';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 88 },
      { name: 'SQL', level: 85 },
      { name: 'C++', level: 80 },
      { name: 'JavaScript', level: 70 },
    ],
  },
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    skills: [
      { name: 'Hugging Face', level: 85 },
      { name: 'PyTorch', level: 80 },
      { name: 'scikit-learn', level: 75 },
      { name: 'TensorFlow', level: 72 },
      { name: 'LangChain', level: 68 },
    ],
  },
  {
    title: 'Data & Analytics',
    icon: BarChart3,
    skills: [
      { name: 'Power BI', level: 85 },
      { name: 'ETL / Data Pipelines', level: 82 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'Azure SQL', level: 75 },
      { name: 'Apache Arrow', level: 70 },
    ],
  },
  {
    title: 'Tools & Frameworks',
    icon: Wrench,
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Spring Boot', level: 80 },
      { name: 'Azure', level: 78 },
      { name: 'React', level: 75 },
      { name: 'Docker', level: 70 },
    ],
  },
];

const otherTechnologies = [
  'REST APIs', 'Linux', 'Jira', 'Redis', 'Neon', 'Node.js', 'TypeScript',
  'JUnit', 'Maven', 'CMake', 'Qt', 'JavaFX', 'OpenCV', 'RISC-V Assembly',
  'Agile/Scrum', 'UML', 'Tailwind CSS', 'WordPress',
];

const certifications = [
  'NVIDIA Deep Learning Institute — Introduction to Deep Learning',
  'NVIDIA Deep Learning Institute — Building RAG Agents with LLMs',
];

const Skills: React.FC = () => (
  <motion.div
    variants={stagger(0.06)}
    initial="hidden"
    animate="show"
    className="p-6 sm:p-8 vscode-content"
  >
    <PageHeader
      className_="Skills"
      title="Skills"
      comment="A comprehensive overview of my technical expertise and capabilities"
    />

    <div className="grid md:grid-cols-2 gap-6">
      {skillCategories.map(({ title, icon: Icon, skills }) => (
        <motion.section
          key={title}
          variants={fadeUp}
          className="vscode-terminal vscode-card p-5"
          aria-labelledby={`skills-${title.replace(/\W+/g, '-')}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <Icon className="w-5 h-5 text-accent-text shrink-0" aria-hidden="true" />
            <h2
              id={`skills-${title.replace(/\W+/g, '-')}`}
              className="text-lg font-semibold vscode-class"
            >
              {title}
            </h2>
          </div>

          <ul className="space-y-4">
            {skills.map((skill, i) => (
              <li key={skill.name}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="font-medium vscode-string">"{skill.name}"</span>
                  <span className="vscode-number text-sm tabular-nums">{skill.level}%</span>
                </div>
                {/* The figure beside the bar already carries the value, so the
                    bar itself is decorative and stays out of the a11y tree. */}
                <div className="vscode-progress h-1.5" aria-hidden="true">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: skill.level / 100 }}
                    transition={{ duration: 0.7, delay: i * 0.04, ease: EASE }}
                    viewport={viewportOnce}
                    style={{ transformOrigin: 'left' }}
                    className="vscode-progress-bar w-full"
                  />
                </div>
              </li>
            ))}
          </ul>
        </motion.section>
      ))}
    </div>

    <motion.section variants={fadeUp} className="mt-10" aria-labelledby="skills-other">
      <h2 id="skills-other" className="text-xl font-semibold mb-5 vscode-syntax-highlight">
        <span className="sr-only">Other technologies</span>
        <span aria-hidden="true">
          <span className="vscode-keyword">private static final</span>{' '}
          <span className="vscode-keyword">String</span>[]{' '}
          <span className="vscode-function">otherTechnologies</span> = &#123;
        </span>
      </h2>
      <ul className="flex flex-wrap gap-2.5">
        {otherTechnologies.map((tech) => (
          <li
            key={tech}
            className="px-3.5 py-1.5 bg-surface rounded text-sm border border-line
                       hover:border-line-hi transition-colors duration-150"
          >
            <span className="vscode-string">"{tech}"</span>
          </li>
        ))}
      </ul>
      <p className="mt-4" aria-hidden="true">&#125;;</p>
    </motion.section>

    <motion.section variants={fadeUp} className="mt-10" aria-labelledby="skills-certs">
      <h2
        id="skills-certs"
        className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted mb-3"
      >
        Certifications
      </h2>
      <ul className="space-y-2">
        {certifications.map((cert) => (
          <li key={cert} className="flex items-start gap-2.5 text-sm">
            <Award className="w-4 h-4 text-accent-text shrink-0 mt-0.5" aria-hidden="true" />
            <span>{cert}</span>
          </li>
        ))}
      </ul>
    </motion.section>
  </motion.div>
);

export default Skills;
