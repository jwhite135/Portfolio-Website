import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, Wrench, Lightbulb } from 'lucide-react';
import PageHeader from './PageHeader';
import { fadeUp, stagger, viewportOnce, EASE } from '../lib/motion';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'Java', level: 90 },
      { name: 'C++', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'JavaScript', level: 70 },
      { name: 'SQL', level: 70 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: Layers,
    skills: [
      { name: 'Spring Boot', level: 85 },
      { name: 'React', level: 75 },
      { name: 'JavaFX', level: 70 },
      { name: 'TensorFlow', level: 70 },
      { name: 'Qt', level: 65 },
    ],
  },
  {
    title: 'Development Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', level: 90 },
      { name: 'JUnit', level: 80 },
      { name: 'CMake', level: 80 },
      { name: 'Maven', level: 75 },
      { name: 'GitHub Projects', level: 75 },
    ],
  },
  {
    title: 'Concepts & Methodologies',
    icon: Lightbulb,
    skills: [
      { name: 'Object-Oriented Design', level: 85 },
      { name: 'Agile/Scrum', level: 80 },
      { name: 'Unit Testing', level: 75 },
      { name: 'Systems Programming', level: 70 },
      { name: 'AI/ML Basics', level: 65 },
    ],
  },
];

const otherTechnologies = [
  'HTML/CSS', 'UML', 'Backtracking Algorithms', 'REST APIs',
  'MIPS Assembly', 'Godot Engine', 'TypeScript', 'Tailwind CSS',
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
  </motion.div>
);

export default Skills;
