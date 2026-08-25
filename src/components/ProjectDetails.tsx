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

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectName, onBack }) => {
  const projects = {
    'codecollab': {
      title: 'CodeCollab - Real-Time Collaborative Coding Platform',
      description: 'A comprehensive real-time collaborative coding platform built with Spring Boot and React, featuring WebSocket-based collaboration and Monaco Editor integration.',
      longDescription: `CodeCollab is a real-time collaborative coding platform that lets multiple developers edit the same files simultaneously with live synchronization — the "Google Docs for code" idea, applied to a real editor. I built it to dig into the hard parts of real-time collaboration: presence, shared cursors, and conflict handling on top of a familiar editing experience.

## Project Overview
The platform pairs the Monaco editor (the engine behind VS Code) with a WebSocket backend so an edit from one user shows up instantly for everyone in the same session. Around the editor it adds authentication, workspace organization, and persistence so sessions and projects survive across visits.

## Key Features
- **Real-Time Collaboration**: WebSocket-based live synchronization across multiple users
- **Monaco Editor Integration**: VS Code's editor engine with custom collaboration hooks
- **Presence & Cursor Tracking**: See who's in a session and where their cursors are
- **Conflict Handling**: Operational-transformation-based merging for concurrent edits
- **Secure Authentication**: JWT-based auth backed by Spring Security
- **Workspace Management**: Organized projects with team-based permissions
- **Multi-language Editing**: Syntax highlighting for the wide range of languages Monaco supports

## Technical Architecture
- **Backend**: Spring Boot with Java 17, Spring Security, WebSocket over STOMP
- **Database**: PostgreSQL with JPA/Hibernate; Redis for caching and session state
- **Frontend**: React with TypeScript, Monaco Editor, Redux Toolkit
- **Security**: JWT tokens with role-based access control
- **Build & Deployment**: Maven, Docker, Docker Compose

## What I Learned
- Designing a WebSocket/STOMP messaging layer for low-latency collaborative editing
- Applying operational transformation to keep concurrent edits consistent
- Building JWT + Spring Security authentication and modeling team permissions
- Using Redis to cache session state and take load off the database`,
      technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'React', 'TypeScript', 'WebSocket', 'Monaco Editor', 'Spring Security', 'JWT'],
      githubUrl: 'https://github.com/jwhite135/CodeCollab',
      liveUrl: '#',
      duration: '6 months',
      teamSize: 'Solo',
      achievements: ['Developed real-time collaborative coding platform with WebSocket technology', 'Implemented enterprise-grade security with JWT and Spring Security', 'Integrated Monaco Editor with custom collaboration features', 'Designed scalable architecture with PostgreSQL and Redis']
    },
    'keyquest': {
      title: 'KeyQuest - Music Learning Application',
      description: 'A JavaFX-based music learning application for sheet music playing and creating.',
      longDescription: `KeyQuest is an innovative music learning platform that helps users develop their musical skills through interactive sheet music visualization and practice tools. Developed as part of a collaborative academic project using Agile methodologies.

## Project Overview
This application transforms the traditional music learning experience by providing an interactive interface for practicing and creating sheet music. Users can upload, view, and practice with digital sheet music while receiving real-time feedback.

## Key Features
- **Sheet Music Display**: High-quality rendering of musical notation
- **Practice Mode**: Interactive practice sessions with tempo control
- **Music Creation**: Tools for composing and editing sheet music
- **Progress Tracking**: Monitor learning progress and achievements
- **Multi-instrument Support**: Piano, guitar, and other instrument layouts

## Development Process
- **Methodology**: Agile/Scrum with 2-week sprints
- **Team Size**: 5-member development team
- **Version Control**: GitHub with feature branch workflow
- **Documentation**: Comprehensive UML diagrams and technical documentation
- **Testing**: Extensive unit testing with JUnit framework

## Technical Implementation
- **Frontend**: JavaFX for rich user interface
- **Backend**: Java with custom music processing algorithms
- **Testing**: JUnit for comprehensive unit testing
- **Project Management**: GitHub Projects for task tracking
- **Design**: UML diagrams for system architecture`,
      technologies: ['Java', 'JavaFX', 'JUnit', 'GitHub Projects', 'UML'],
      githubUrl: 'https://github.com/jwhite135/KeyQuest',
      liveUrl: '#',
      duration: '4 months',
      teamSize: '5 members',
      achievements: ['Developed with 5-member Agile team using Scrum methodology', 'Implemented comprehensive unit testing with JUnit', 'Created intuitive JavaFX user interface for music learning']
    },
    'cockbots': {
      title: 'CockBots - Social Media Application',
      description: 'A social media application that uses AI to detect and categorize images.',
      longDescription: `CockBots is an innovative social media platform that leverages artificial intelligence to create a unique posting experience. The application automatically detects and categorizes images, allowing posts with bots while filtering out those without, creating a distinctive social media environment.

## Project Overview
Developed during CockyHacks 2024 hackathon, this application demonstrates the integration of AI technology with social media functionality. The AI system achieves over 90% accuracy in bot detection, making it a standout project in the hackathon.

## Key Features
- **AI Image Detection**: Advanced machine learning algorithms for bot identification
- **User Registration**: Secure account creation and management
- **Social Media Functions**: Posting, commenting, and user interaction
- **Real-time Processing**: Instant image analysis and categorization
- **User Dashboard**: Personalized feed and interaction history

## Technical Architecture
- **Frontend**: PHP for web interface and user experience
- **Backend**: Python with TensorFlow for AI processing
- **Database**: SQL for user data and post management
- **AI Model**: Custom-trained neural network for image classification
- **Deployment**: Local server setup with optimized performance

## Development Highlights
- **Hackathon Achievement**: Won "Best in AI" and "Best in Implementation" awards
- **Time Constraint**: Completed in 32 hours with full team collaboration
- **AI Accuracy**: Achieved over 90% accuracy in bot detection
- **Scalable Design**: Architecture supports future feature expansion`,
      technologies: ['PHP', 'SQL', 'Python', 'TensorFlow', 'AI'],
      githubUrl: 'https://github.com/ethanhammer/Hackathon-Cock-Bots',
      liveUrl: '#',
      duration: '32 hours',
      teamSize: 'Hackathon Team',
      achievements: ['Won "Best in AI" Award', 'Won "Best in Implementation" Award', '90%+ AI accuracy achieved']
    },
    'classfinder': {
      title: 'ClassFinder - Cloud-Native Class Scheduling Platform',
      description: 'A full-stack class scheduling and enrollment platform hosted entirely on Microsoft Azure, built with a 6-person agile team.',
      longDescription: `ClassFinder is a fully cloud-native class scheduling and enrollment platform built by a 6-person agile team in partnership with Capgemini. It supports real-time class enrollment, multi-role user management (students, teachers, admins), and automated data processing across the entire Azure stack.

## Project Overview
Developed as a collaborative team project, ClassFinder demonstrates end-to-end full-stack development on Microsoft Azure, from database design to REST API development to cloud-native event automation. The platform was presented to Capgemini executives and peers as a complete, working application.

## Key Features
- **Real-Time Enrollment**: Live class enrollment with prerequisite and conflict validation
- **Multi-Role Access**: Distinct views and permissions for students, teachers, and admins
- **Catalog Management**: Centralized course catalog backed by Azure SQL
- **Automated Data Pipelines**: Event-driven data ingestion and enrollment processing across the Azure stack

## Technical Architecture
- **Database**: Azure SQL Database with a schema supporting real-time enrollment, multi-role users, and catalog data
- **Backend APIs**: REST APIs built in C# (.NET Core 8.0) for enrollment CRUD operations, prerequisite/conflict validation, and real-time sync
- **Cloud Automation**: Azure Service Bus, Function Apps, Logic Apps, and Azure Data Factory for automated data ingestion and event-driven enrollment processing
- **Deployment**: Fully cloud-native, hosted entirely on Microsoft Azure

## Development Highlights
- Led SQL development on a 6-person agile team, designing and maintaining the Azure SQL Database schema
- Built and integrated REST APIs in C# (.NET Core 8.0) for enrollment, validation, and real-time data synchronization
- Contributed to cloud architecture using Azure Service Bus, Function Apps, Logic Apps, and Azure Data Factory
- Presented the completed application to Capgemini executives and peers, demonstrating end-to-end functionality`,
      technologies: ['Azure SQL', 'C#', '.NET Core 8.0', 'Azure Service Bus', 'Azure Function Apps', 'Azure Logic Apps', 'Azure Data Factory'],
      githubUrl: '#',
      liveUrl: '#',
      duration: 'Semester',
      teamSize: '6 members',
      achievements: [
        'Led SQL development on a 6-person agile team, designing and maintaining an Azure SQL Database schema supporting real-time class enrollment, multi-role user management, and catalog data',
        'Built and integrated REST APIs in C# (.NET Core 8.0) to handle enrollment CRUD operations, prerequisite/conflict validation, and real-time data synchronization across student, teacher, and admin views',
        'Contributed to cloud architecture utilizing Azure Service Bus, Function Apps, Logic Apps, and Azure Data Factory to automate data ingestion and trigger enrollment event processing',
        'Presented completed application to Capgemini executives and peers, demonstrating end-to-end functionality of a full-stack class scheduling and enrollment platform hosted entirely on Microsoft Azure'
      ]
    },
    'portfoliowebsite': {
      title: 'Portfolio Website',
      description: 'You\'re looking at it (⚆ᗝ⚆)',
      longDescription: `A modern, interactive portfolio website designed to showcase my skills and projects in a unique and engaging way. This project demonstrates my ability to create innovative user experiences while maintaining professional standards.

## Design Philosophy
The portfolio is inspired by VS Code's interface, creating a familiar and intuitive experience for developers and recruiters. The design emphasizes both functionality and visual appeal, with smooth animations and responsive layout.

## Key Features
- **VS Code Theme**: Authentic VS Code-inspired interface design
- **Interactive File Explorer**: Collapsible sidebar with project navigation
- **Responsive Design**: Optimized for all device sizes
- **Smooth Animations**: Framer Motion for engaging transitions
- **Professional Layout**: Clean, modern design suitable for recruitment

## Technical Implementation
- **Frontend Framework**: React with TypeScript for type safety
- **Styling**: Tailwind CSS for rapid, responsive design
- **Animations**: Framer Motion for smooth user interactions
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Ready for GitHub Pages or similar hosting

## Development Process
- **Design**: Custom VS Code theme implementation
- **Component Architecture**: Modular React components
- **State Management**: React hooks for UI state
- **Performance**: Optimized rendering and animations
- **Accessibility**: Keyboard navigation and screen reader support`,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'VS Code Theme'],
      githubUrl: '#',
      liveUrl: '#',
      duration: '2 weeks',
      teamSize: 'Solo',
      achievements: ['Custom VS Code theme implementation', 'Responsive design across devices', 'Smooth animations and transitions']
    },
    'minesweeper': {
      title: 'Minesweeper',
      description: 'Recreated the classic Minesweeper game from scratch with a GUI.',
      longDescription: `A complete recreation of the classic Minesweeper game, built from the ground up using modern C++ development practices. This project demonstrates strong object-oriented programming principles and game development skills.

## Game Features
- **Classic Gameplay**: Authentic Minesweeper mechanics and rules
- **Multiple Difficulties**: Beginner, intermediate, and expert levels
- **GUI Interface**: Intuitive graphical user interface
- **Score Tracking**: High score system and game statistics
- **Customizable Settings**: Adjustable board sizes and mine counts

## Technical Implementation
- **Language**: C++ for high-performance game logic
- **GUI Framework**: Qt for cross-platform user interface
- **Build System**: CMake for efficient compilation and deployment
- **Architecture**: Object-oriented design with clear separation of concerns
- **Testing**: Comprehensive unit tests for game logic

## Development Highlights
- **Object-Oriented Design**: Clean separation between game logic and UI
- **Performance Optimization**: Efficient algorithms for game state management
- **Cross-Platform**: Qt framework ensures compatibility across operating systems
- **Memory Management**: Proper C++ memory handling and resource management
- **User Experience**: Intuitive controls and responsive interface

## Game Architecture
- **Game Engine**: Custom game loop and state management
- **Board Management**: Dynamic board generation and mine placement
- **User Interface**: Event-driven GUI with real-time updates
- **Input Handling**: Mouse and keyboard interaction processing`,
      technologies: ['C++', 'Qt', 'CMake', 'Object-Oriented Design'],
      githubUrl: 'https://github.com/jwhite135/Minesweeper',
      liveUrl: '#',
      duration: '3 weeks',
      teamSize: 'Solo',
      achievements: ['Complete game implementation', 'Efficient object-oriented architecture', 'Cross-platform compatibility']
    },
    'sudokusolver': {
      title: 'Sudoku Solver',
      description: 'A web application that generates sudoku boards and solves them efficiently.',
      longDescription: `An intelligent Sudoku solver that demonstrates advanced algorithm implementation and web development skills. The application generates random Sudoku puzzles and employs sophisticated solving techniques to find solutions efficiently.

## Algorithm Overview
The solver uses a backtracking algorithm with intelligent cell selection, starting with cells that have the fewest potential values. This optimization significantly reduces solving time and demonstrates understanding of algorithmic efficiency.

## Key Features
- **Puzzle Generation**: Random Sudoku board creation with varying difficulties
- **Smart Solving**: Backtracking algorithm with optimized cell selection
- **Visual Feedback**: Real-time solving animation and progress indication
- **Multiple Difficulties**: Easy, medium, and hard puzzle levels
- **Solution Validation**: Automatic verification of solved puzzles

## Technical Implementation
- **Frontend**: HTML5 and CSS3 for responsive design
- **Backend Logic**: JavaScript for puzzle generation and solving
- **Algorithm**: Custom backtracking implementation with optimizations
- **User Interface**: Clean, intuitive web interface
- **Performance**: Optimized for fast solving and smooth user experience

## Development Process
- **Algorithm Design**: Custom backtracking with intelligent pruning
- **User Experience**: Focus on intuitive interface and smooth interactions
- **Performance Optimization**: Efficient data structures and algorithms
- **Testing**: Comprehensive testing of puzzle generation and solving
- **Documentation**: Clear code documentation and algorithm explanation

## Solving Strategy
- **Cell Selection**: Prioritizes cells with fewest possible values
- **Constraint Propagation**: Eliminates impossible values efficiently
- **Backtracking**: Systematic search with intelligent backtracking
- **Validation**: Ensures solution correctness and uniqueness`,
      technologies: ['HTML', 'CSS', 'JavaScript', 'Backtracking Algorithm'],
      githubUrl: 'https://github.com/jwhite135/SudokuSolver',
      liveUrl: '#',
      duration: '2 weeks',
      teamSize: 'Solo',
      achievements: ['Efficient backtracking algorithm', 'Optimized solving performance', 'Clean, responsive interface']
    }
  };

  const project = projects[projectName as keyof typeof projects];

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
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded border border-line text-sm">
          <Clock className="w-4 h-4 text-accent-text shrink-0" aria-hidden="true" />
          <dt className="text-fg-muted">Duration</dt>
          <dd>{project.duration}</dd>
        </div>
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

      {/* Links */}
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        {project.githubUrl !== '#' && (
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
        {project.liveUrl !== '#' && (
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
