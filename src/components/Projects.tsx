import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';
import PageHeader from './PageHeader';
import { fadeUp, stagger } from '../lib/motion';
import type { ProjectId } from '../lib/site';

interface ProjectsProps {
  onProjectClick: (projectName: ProjectId) => void;
}

interface ProjectCard {
  title: string;
  /** Short label for the card header; the full title lives in the heading. */
  headline: string;
  description: string;
  glyph: string;
  technologies: string[];
  githubUrl?: string;
  featured: boolean;
  projectName: ProjectId;
}

const projects: ProjectCard[] = [
  {
    title: 'Class Finder',
    headline: 'Cloud-native class scheduling',
    description:
      'Class scheduling and enrolment running entirely on Azure, built by a six-person Agile team in a course taught by Capgemini engineers. I led SQL development and presented the finished platform to Capgemini executives.',
    glyph: '▤',
    technologies: ['C#', '.NET 8', 'Azure SQL', 'Service Bus', 'Function Apps', 'Data Factory'],
    featured: true,
    projectName: 'classfinder',
  },
  {
    title: 'CockBots',
    headline: 'AI bot detection, CockyHacks 2024',
    description:
      'A social platform where a TensorFlow image classifier separates bot accounts from real ones. I owned data collection and the imaging pipeline. Won Best in AI and Best in Implementation.',
    glyph: '</>',
    technologies: ['Python', 'TensorFlow', 'PHP', 'SQL'],
    githubUrl: 'https://github.com/ethanhammer/Hackathon-Cock-Bots',
    featured: true,
    projectName: 'cockbots',
  },
  {
    title: 'CodeCollab',
    headline: 'Real-time collaborative editing',
    description:
      'Multiple developers editing the same file at once — the Monaco editor on the front end, a Spring Boot WebSocket backend syncing changes and tracking who is in a session.',
    glyph: '{ }',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'React', 'TypeScript', 'WebSocket'],
    githubUrl: 'https://github.com/jwhite135/CodeCollab',
    featured: true,
    projectName: 'codecollab',
  },
  {
    title: 'KeyQuest',
    headline: 'Music learning application',
    description:
      'A JavaFX app for reading, practising and writing sheet music. I led a five-person Agile team to an MVP in six weeks, and solved the timing problem of syncing notation rendering to audio playback.',
    glyph: '♪',
    technologies: ['Java', 'JavaFX', 'JUnit', 'UML'],
    githubUrl: 'https://github.com/jwhite135/KeyQuest',
    featured: false,
    projectName: 'keyquest',
  },
  {
    title: 'Portfolio Website',
    headline: 'This site',
    description:
      "You're looking at it — a VS Code–themed portfolio in React and TypeScript, with hash routing so every panel has its own shareable URL.",
    glyph: '⌘',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/jwhite135/PortfolioWebsite',
    featured: false,
    projectName: 'portfoliowebsite',
  },
  {
    title: 'Minesweeper',
    headline: 'Classic game, rebuilt in C++',
    description:
      'Minesweeper from scratch with a Qt GUI, keeping game logic cleanly separated from presentation through object-oriented design.',
    glyph: '◆',
    technologies: ['C++', 'Qt', 'CMake'],
    githubUrl: 'https://github.com/jwhite135/Minesweeper',
    featured: false,
    projectName: 'minesweeper',
  },
  {
    title: 'Sudoku Solver',
    headline: 'Backtracking in the browser',
    description:
      'Generates random Sudoku boards and solves them with a backtracking search that prioritises the most constrained cell first.',
    glyph: '#',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Backtracking'],
    githubUrl: 'https://github.com/jwhite135/SudokuSolver',
    featured: false,
    projectName: 'sudokusolver',
  },
];

const Projects: React.FC<ProjectsProps> = ({ onProjectClick }) => (
  <motion.div
    variants={stagger(0.05)}
    initial="hidden"
    animate="show"
    className="p-6 sm:p-8 vscode-content"
  >
    <PageHeader
      className_="Projects"
      title="Projects"
      comment="A showcase of my recent work and technical achievements"
    />

    <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {projects.map((project) => (
        <motion.li
          key={project.projectName}
          variants={fadeUp}
          className={`vscode-terminal vscode-card overflow-hidden flex flex-col ${
            project.featured ? 'border-l-2 border-l-accent' : ''
          }`}
        >
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-start gap-3 mb-4">
              <span
                className="shrink-0 w-10 h-10 rounded bg-surface flex items-center justify-center
                           text-accent-text text-base font-bold"
                aria-hidden="true"
              >
                {project.glyph}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-semibold text-white">{project.title}</h2>
                <p className="text-sm text-fg-muted mt-0.5">{project.headline}</p>
              </div>
              {project.featured && (
                <span className="vscode-badge shrink-0 mt-1">Featured</span>
              )}
            </div>

            <p className="text-sm leading-relaxed mb-4">{project.description}</p>

            <ul className="flex flex-wrap gap-1.5 mb-5">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="px-2 py-0.5 bg-surface text-xs rounded border border-line"
                >
                  <span className="vscode-string">"{tech}"</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onProjectClick(project.projectName)}
                className="group inline-flex items-center gap-1.5 px-3 py-2 bg-accent text-white
                           rounded text-sm hover:bg-accent-hi transition-colors duration-150"
              >
                Case study
                <span className="sr-only">for {project.title}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>

              {/* Only rendered when a repository actually exists — ClassFinder
                  is client work and has no public repo. */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-line text-fg rounded
                             text-sm hover:bg-line-hi transition-colors duration-150"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  Source
                  <span className="sr-only">
                    code for {project.title} on GitHub (opens in a new tab)
                  </span>
                </a>
              )}
            </div>
          </div>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

export default Projects;
