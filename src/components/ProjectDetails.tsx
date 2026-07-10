import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Clock, Users } from 'lucide-react';

interface ProjectDetailsProps {
  projectName: string;
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

// Lightweight renderer for the Markdown-ish longDescription (## headings,
// - bullets, **bold**), so the copy displays cleanly instead of showing raw markers.
const renderRichText = (text: string): React.ReactNode =>
  text.split('\n').map((line, i) => {
    const trimmed = line.trim();
    if (trimmed === '') {
      return <div key={i} className="h-2" />;
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h3 key={i} className="vscode-class font-semibold text-base mt-4 mb-1">
          {trimmed.slice(3)}
        </h3>
      );
    }
    if (trimmed.startsWith('- ')) {
      return (
        <div key={i} className="flex gap-2 ml-1 mb-1">
          <span className="text-[#007acc] mt-0.5">•</span>
          <span>{renderInline(trimmed.slice(2))}</span>
        </div>
      );
    }
    return (
      <p key={i} className="mb-1">
        {renderInline(trimmed)}
      </p>
    );
  });

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectName }) => {
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

  if (!project) {
    return (
      <div className="p-6 vscode-content">
        <div className="vscode-terminal p-4">
          <span className="vscode-keyword">Error:</span> Project not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 vscode-content">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#cccccc] mb-2">{project.title}</h1>
        <p className="text-[#cccccc] opacity-80">{project.description}</p>
      </div>

      {/* Project Meta */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2d2e] rounded border border-[#3c3c3c] text-sm">
          <Clock className="w-4 h-4 text-[#007acc]" />
          <span className="text-[#6a6a6a]">Duration:</span>
          <span className="text-[#cccccc]">{project.duration}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2d2e] rounded border border-[#3c3c3c] text-sm">
          <Users className="w-4 h-4 text-[#007acc]" />
          <span className="text-[#6a6a6a]">Team:</span>
          <span className="text-[#cccccc]">{project.teamSize}</span>
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#cccccc] mb-3">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#2a2d2e] text-[#cccccc] rounded text-sm border border-[#3c3c3c]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Detailed Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#cccccc] mb-3">Project Details</h2>
        <div className="vscode-terminal p-4">
          <div className="text-[#cccccc] leading-relaxed">
            {renderRichText(project.longDescription)}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#cccccc] mb-3">Key Achievements</h2>
        <div className="space-y-2">
          {project.achievements.map((achievement, index) => (
            <div key={index} className="vscode-terminal p-3">
              <span className="text-[#cccccc]">• {achievement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-4">
        {project.githubUrl !== '#' && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-[#3c3c3c] text-[#cccccc] rounded hover:bg-[#4c4c4c] transition-colors duration-300"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </motion.a>
        )}
        {project.liveUrl !== '#' && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-[#007acc] text-white rounded hover:bg-[#1177bb] transition-colors duration-300"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </motion.a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails; 