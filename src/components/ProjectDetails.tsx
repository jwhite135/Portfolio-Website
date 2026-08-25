import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Clock, Users, ArrowLeft } from 'lucide-react';
import { fadeUp, stagger } from '../lib/motion';
import type { ProjectId } from '../lib/site';

interface ProjectDetailsProps {
  projectName: ProjectId;
  /** Returns to the projects index — the only way back for a deep link. */
  onBack: () => void;
}

// Render inline **bold** markers within a line of text.
const renderInline = (text: string): React.ReactNode =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );

/**
 * Lightweight renderer for the Markdown-ish longDescription (## headings,
 * - bullets, **bold**).
 *
 * Consecutive bullets are collected into a real <ul> rather than emitted as
 * loose divs, so assistive technology announces "list, 4 items" instead of
 * reading four unrelated paragraphs.
 */
const renderRichText = (text: string): React.ReactNode => {
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="space-y-1.5 mb-3">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2.5">
            <span className="text-accent-text mt-1 leading-none" aria-hidden="true">▸</span>
            <span>{renderInline(b)}</span>
          </li>
        ))}
      </ul>
    );
    bullets = [];
  };

  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      bullets.push(trimmed.slice(2));
      continue;
    }
    flushBullets();
    if (trimmed === '') continue;
    if (trimmed.startsWith('## ')) {
      blocks.push(
        <h3 key={`h-${blocks.length}`} className="vscode-class font-semibold text-base mt-6 mb-2 first:mt-0">
          {trimmed.slice(3)}
        </h3>
      );
    } else {
      blocks.push(
        <p key={`p-${blocks.length}`} className="mb-3 leading-relaxed">
          {renderInline(trimmed)}
        </p>
      );
    }
  }
  flushBullets();
  return blocks;
};

interface CaseStudy {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  /** Omitted where there is no figure worth standing behind. */
  duration?: string;
  teamSize: string;
  achievements?: string[];
}

const projects: Record<string, CaseStudy> = {
  classfinder: {
    title: 'Class Finder — Cloud-Native Class Scheduling Platform',
    description:
      'A class scheduling and enrolment platform hosted entirely on Microsoft Azure, built by a six-person Agile team in a course taught by practising Capgemini engineers.',
    longDescription: `Class Finder is a full-stack class scheduling and enrolment platform that runs entirely on Microsoft Azure. It was built for CSCE 590: Azure Cloud Native Development at USC — a course taught by working Capgemini engineers, which meant building against the same cloud architecture patterns and Azure tooling they use in practice rather than a textbook version of them.

## My role
I led SQL development on a six-person Agile team, owning the database layer that everything else depended on.

## What I built
- **Database design**: designed and maintained an Azure SQL schema supporting real-time class enrolment, multi-role user management, and catalog data
- **REST APIs**: built and integrated APIs in C# (.NET Core 8.0) handling enrolment CRUD, prerequisite and conflict validation, and real-time synchronisation across student, teacher and admin views
- **Cloud architecture**: contributed to the Azure Service Bus, Function Apps, Logic Apps and Data Factory setup that automates data ingestion and triggers enrolment event processing

## Outcome
The team presented the completed application to Capgemini executives and peers, demonstrating end-to-end functionality of the platform running entirely on Azure.

## What I learned
- Designing a relational schema that holds up under concurrent, real-time enrolment writes
- Wiring managed Azure services together into an event-driven pipeline rather than a single monolithic app
- Validating business rules — prerequisites, scheduling conflicts — at the API boundary instead of in the UI`,
    technologies: ['C#', '.NET Core 8.0', 'Azure SQL', 'Azure Service Bus', 'Azure Function Apps', 'Azure Logic Apps', 'Azure Data Factory', 'REST APIs'],
    duration: 'One semester',
    teamSize: '6 people',
    achievements: [
      'Led SQL development across a six-person Agile team',
      'Designed an Azure SQL schema supporting real-time enrolment and multi-role user management',
      'Presented the completed platform to Capgemini executives and peers',
    ],
  },

  cockbots: {
    title: 'CockBots — AI-Driven Social Media App',
    description:
      'A social platform with bot detection built in: a TensorFlow image classifier decides which accounts are real. Built at CockyHacks 2024.',
    longDescription: `CockBots is a full-stack social media application with AI bot-detection built into the posting flow. A TensorFlow image classifier distinguishes bot accounts from real ones, and the platform acts on that classification directly.

## My role
I owned data collection and the imaging pipeline — everything from gathering and labelling raw images through preparing them for model training.

## What I built
- **Image classifier**: a TensorFlow model trained to distinguish bot accounts from real ones
- **Training dataset**: manually collected and labelled, with bot examples and negative "not-bot" examples
- **Imaging pipeline**: the path from raw collected images to model-ready training input
- **Full-stack platform**: user registration, posting and the interactive social features around the classifier

## Outcome
Presented at the CockyHacks 2024 final showcase, where the project won **Best in AI** and **Best in Implementation**.

## What I learned
- How much model quality depends on dataset construction — the labelling work mattered more than the architecture
- Assembling a balanced dataset from scratch, including deciding what a useful negative example actually is
- Shipping a working ML feature inside a hackathon deadline`,
    technologies: ['Python', 'TensorFlow', 'PHP', 'SQL', 'Image Classification'],
    githubUrl: 'https://github.com/ethanhammer/Hackathon-Cock-Bots',
    duration: 'Hackathon',
    teamSize: 'Hackathon team',
    achievements: [
      'Won Best in AI at the CockyHacks 2024 final showcase',
      'Won Best in Implementation at the same showcase',
      'Built and labelled the training dataset from scratch',
    ],
  },

  codecollab: {
    title: 'CodeCollab — Real-Time Collaborative Coding Platform',
    description:
      'A collaborative coding platform where multiple developers edit the same files at once, built on the Monaco editor and a Spring Boot WebSocket backend.',
    longDescription: `CodeCollab is a real-time collaborative coding platform: multiple developers open the same file and see each other's edits as they happen. I built it to work through the hard parts of real-time collaboration — keeping several clients in sync, showing who is present, and handling edits that land at the same time.

## Project overview
The platform pairs the Monaco editor — the engine behind VS Code — with a WebSocket backend, so an edit from one user propagates to everyone else in the session. Around the editor sit authentication, workspace organisation and persistence, so sessions and projects survive across visits.

## Key features
- **Real-time collaboration**: WebSocket-based synchronisation across multiple users in a session
- **Monaco editor integration**: VS Code's editor engine, wired up to the collaboration layer
- **Presence tracking**: see who is in a session and where they are working
- **Authentication**: JWT-based auth backed by Spring Security
- **Workspace management**: projects organised with team-based permissions
- **Multi-language editing**: syntax highlighting across the languages Monaco supports

## Technical stack
- **Backend**: Spring Boot with Java, Spring Security, WebSocket over STOMP
- **Database**: PostgreSQL with JPA/Hibernate; Redis for session state
- **Frontend**: React with TypeScript and the Monaco editor
- **Build**: Maven, Docker, Docker Compose

## What I learned
- Designing a WebSocket/STOMP messaging layer for low-latency collaborative editing
- The genuine difficulty of concurrent edits — why naive last-write-wins breaks down quickly
- Modelling team permissions and wiring up JWT authentication with Spring Security
- Using Redis to hold session state instead of hitting the database on every event`,
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'React', 'TypeScript', 'WebSocket', 'Monaco Editor'],
    githubUrl: 'https://github.com/jwhite135/CodeCollab',
    teamSize: 'Solo',
  },

  keyquest: {
    title: 'KeyQuest — Music Learning Application',
    description:
      'A JavaFX application for reading, practising and creating sheet music, built by a five-person Agile team.',
    longDescription: `KeyQuest is a music learning application built around interactive sheet music: users can read notation, practise against it, and write their own.

## My role
I led a five-person Agile team through sprint planning, GitHub workflow and MVP delivery within six weeks.

## The hard part
The core technical challenge was timing. Note positioning, sheet music rendering and audio playback all had to stay precisely in step — in JavaFX, a dated UI framework with little help to offer for this kind of work. Getting it right came down to working through the underlying layout and timing maths as a team.

## What we built
- **Sheet music rendering**: musical notation drawn and laid out in JavaFX
- **Practice mode**: interactive practice sessions synchronised to playback
- **Composition tools**: creating and editing notation directly in the app
- **Backend logic**: the note and timing model underneath the interface

## How we worked
- **Methodology**: Agile with sprint planning and a six-week MVP deadline
- **Version control**: GitHub with a feature-branch workflow
- **Testing**: unit testing with JUnit
- **Design**: UML diagrams for the system architecture

## What I learned
- Running a team to a fixed deadline, and scoping an MVP that could actually land in six weeks
- Synchronising rendering and audio playback where being slightly off is immediately audible
- Working productively inside an older framework rather than reaching for a newer one`,
    technologies: ['Java', 'JavaFX', 'JUnit', 'GitHub', 'UML'],
    githubUrl: 'https://github.com/jwhite135/KeyQuest',
    duration: '6 weeks',
    teamSize: '5 people',
    achievements: [
      'Led a five-person Agile team to MVP delivery in six weeks',
      'Solved notation, rendering and audio-playback synchronisation in JavaFX',
    ],
  },

  portfoliowebsite: {
    title: 'Portfolio Website',
    description: "The site you're reading — a VS Code–themed portfolio in React and TypeScript.",
    longDescription: `This portfolio is built to read like the editor I actually work in: a tab strip, a file explorer, terminal-styled panels and a status bar that tracks the open file.

## Design decisions
- **Hash routing without a router**: every panel has its own URL, so links are shareable and the back button works — implemented in a small hook, because GitHub Pages could not rewrite paths for a real SPA router
- **One source of truth**: tabs, explorer entries, status bar and routes all derive from a single list, so adding a page means adding one entry
- **Motion with a vocabulary**: shared animation presets keep every section resolving at the same speed, and the whole system respects \`prefers-reduced-motion\`

## Accessibility
- WAI-ARIA tab pattern with arrow-key navigation
- Skip link, real landmarks, and visible keyboard focus throughout
- Every text pairing checked against WCAG AA contrast
- Verified with axe across every panel at desktop and mobile widths

## Stack
React, TypeScript, Tailwind CSS and Framer Motion, deployed on Vercel with a strict Content-Security-Policy.`,
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    githubUrl: 'https://github.com/jwhite135/PortfolioWebsite',
    teamSize: 'Solo',
  },

  minesweeper: {
    title: 'Minesweeper',
    description: 'The classic game rebuilt from scratch in C++ with a Qt GUI.',
    longDescription: `A from-scratch recreation of Minesweeper in C++, with a Qt desktop interface.

## What I built
- **Game logic**: board generation, mine placement, and the recursive reveal for empty regions
- **Qt interface**: a responsive grid that stays in step with the game state
- **Object-oriented design**: game rules kept cleanly separated from presentation, so neither side needs to know how the other works
- **Build system**: CMake

## What I learned
- Keeping a clean boundary between model and view in a desktop application
- Recursive flood-fill for revealing connected empty cells
- Building and structuring a C++ project with CMake`,
    technologies: ['C++', 'Qt', 'CMake', 'Object-Oriented Design'],
    githubUrl: 'https://github.com/jwhite135/Minesweeper',
    teamSize: 'Solo',
  },

  sudokusolver: {
    title: 'Sudoku Solver',
    description:
      'A browser application that generates Sudoku boards and solves them with backtracking search.',
    longDescription: `A web application that generates Sudoku puzzles and solves them using a backtracking search.

## The algorithm
- **Cell selection**: prioritises the cell with the fewest remaining candidates, which prunes the search tree far faster than scanning in order
- **Constraint propagation**: eliminates impossible values before recursing
- **Backtracking**: systematic search that unwinds cleanly when a branch fails
- **Validation**: checks that a generated board has a solution

## What I learned
- Why the order you pick cells in dominates backtracking performance
- Implementing constraint propagation to cut the search space before recursing
- Keeping a solver responsive in the browser without blocking the UI`,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Backtracking'],
    githubUrl: 'https://github.com/jwhite135/SudokuSolver',
    teamSize: 'Solo',
  },
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectName, onBack }) => {
  const project = projects[projectName];

  const backLink = (
    <button
      type="button"
      onClick={onBack}
      className="group inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg
                 transition-colors duration-150"
    >
      <ArrowLeft
        className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
      All projects
    </button>
  );

  if (!project) {
    return (
      <div className="p-6 sm:p-8 vscode-content">
        <div className="mb-6">{backLink}</div>
        <div className="vscode-terminal p-5">
          <h1 className="text-lg font-semibold text-white mb-1">Project not found</h1>
          <p className="text-sm text-fg-muted">
            That file isn't in this workspace. Head back to the projects list to pick another.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.article
      variants={stagger(0.06)}
      initial="hidden"
      animate="show"
      className="p-6 sm:p-8 vscode-content max-w-4xl"
    >
      <motion.div variants={fadeUp} className="mb-6">
        {backLink}
      </motion.div>

      <motion.header variants={fadeUp} className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">{project.title}</h1>
        <p className="text-fg-muted leading-relaxed">{project.description}</p>
      </motion.header>

      {/* Project meta */}
      <motion.dl variants={fadeUp} className="flex flex-wrap gap-2.5 mb-8">
        {project.duration && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded border border-line text-sm">
            <Clock className="w-4 h-4 text-accent-text shrink-0" aria-hidden="true" />
            <dt className="text-fg-muted">Duration</dt>
            <dd>{project.duration}</dd>
          </div>
        )}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded border border-line text-sm">
          <Users className="w-4 h-4 text-accent-text shrink-0" aria-hidden="true" />
          <dt className="text-fg-muted">Team</dt>
          <dd>{project.teamSize}</dd>
        </div>
      </motion.dl>

      {/* Technologies */}
      <motion.section variants={fadeUp} className="mb-8" aria-labelledby="pd-tech">
        <h2 id="pd-tech" className="text-sm font-semibold uppercase tracking-[0.12em] text-fg-muted mb-3">
          Built with
        </h2>
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="px-3 py-1 bg-surface rounded text-sm border border-line">
              <span className="vscode-string">"{tech}"</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Detailed description */}
      <motion.section variants={fadeUp} className="mb-8" aria-labelledby="pd-details">
        <h2 id="pd-details" className="text-sm font-semibold uppercase tracking-[0.12em] text-fg-muted mb-3">
          Project details
        </h2>
        <div className="vscode-terminal p-5 text-sm">{renderRichText(project.longDescription)}</div>
      </motion.section>

      {/* Achievements */}
      {project.achievements && (
        <motion.section variants={fadeUp} className="mb-8" aria-labelledby="pd-wins">
          <h2 id="pd-wins" className="text-sm font-semibold uppercase tracking-[0.12em] text-fg-muted mb-3">
            Key achievements
          </h2>
          <ul className="space-y-2">
            {project.achievements.map((achievement) => (
              <li key={achievement} className="vscode-terminal p-3.5 text-sm flex gap-2.5">
                <span className="text-accent-text mt-0.5 leading-none" aria-hidden="true">▸</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Links */}
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-line text-fg rounded text-sm
                       hover:bg-line-hi transition-colors duration-150"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            View on GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded text-sm
                       hover:bg-accent-hi transition-colors duration-150"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            Live demo
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </motion.div>
    </motion.article>
  );
};

export default ProjectDetails;
