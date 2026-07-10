import React from 'react';
import { motion } from 'framer-motion';
import { Github, BookOpen } from 'lucide-react';

interface ProjectsProps {
  onProjectClick?: (projectName: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectClick }) => {
  const projects = [
    {
      title: 'CodeCollab - Real-Time Collaborative Coding Platform',
      description: 'A comprehensive real-time collaborative coding platform built with Spring Boot and React, featuring WebSocket-based collaboration, Monaco Editor integration, and enterprise-grade security. Enables multiple developers to simultaneously edit code with live synchronization.',
      image: '💻',
      technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'React', 'TypeScript', 'WebSocket', 'Monaco Editor'],
      githubUrl: 'https://github.com/jwhite135/CodeCollab',
      featured: true,
      projectName: 'codecollab'
    },
    {
      title: 'KeyQuest - Music Learning Application',
      description: 'A JavaFX-based music learning application for sheet music playing and creating. Developed with a 5-member Agile team using Scrum methodology and comprehensive unit testing.',
      image: '🎵',
      technologies: ['Java', 'JavaFX', 'JUnit', 'GitHub Projects', 'UML'],
      githubUrl: 'https://github.com/jwhite135/KeyQuest',
      featured: true,
      projectName: 'keyquest'
    },
    {
      title: 'CockBots - Social Media Application',
      description: 'A social media application that uses AI to detect and categorize images, allowing posts with bots while removing those without. Features user registration, posting, and interactive social media functions.',
      image: '🤖',
      technologies: ['PHP', 'SQL', 'Python', 'TensorFlow', 'AI'],
      githubUrl: 'https://github.com/ethanhammer/Hackathon-Cock-Bots',
      featured: true,
      projectName: 'cockbots'
    },
    {
      title: 'ClassFinder - Cloud-Native Class Scheduling Platform',
      description: 'A full-stack class scheduling and enrollment platform hosted entirely on Microsoft Azure, built with a 6-person agile team for Capgemini. Handles real-time enrollment, multi-role user management, and automated data processing.',
      image: '📅',
      technologies: ['Azure SQL', 'C#', '.NET Core 8.0', 'Azure Service Bus', 'Azure Function Apps', 'Azure Logic Apps', 'Azure Data Factory'],
      githubUrl: '#',
      featured: true,
      projectName: 'classfinder'
    },
    {
      title: 'Portfolio Website',
      description: 'You\'re looking at it (⚆ᗝ⚆)',
      image: '💼',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recursion?'],
      githubUrl: 'https://github.com/jwhite135/PortfolioWebsite',
      featured: false,
      projectName: 'portfoliowebsite'
    },
    {
      title: 'Minesweeper',
      description: 'Recreated the classic Minesweeper game from scratch with a GUI for users to enjoy. Managed game logic using object-oriented principles to ensure efficient interaction between front-end and back-end elements.',
      image: '💣',
      technologies: ['C++', 'Qt', 'CMake', 'Object-Oriented Design'],
      githubUrl: 'https://github.com/jwhite135/Minesweeper',
      featured: false,
      projectName: 'minesweeper'
    },
    {
      title: 'Sudoku Solver',
      description: 'A web application that generates sudoku boards using randomly generated numbers and implements a backtracking algorithm to solve them efficiently.',
      image: '🧩',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Backtracking Algorithm'],
      githubUrl: 'https://github.com/jwhite135/SudokuSolver',
      featured: false,
      projectName: 'sudokusolver'
    }
  ];

  return (
    <div className="p-6 vscode-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-4 vscode-syntax-highlight">
          <span className="vscode-keyword">public class</span> <span className="vscode-class">Projects</span> &#123;
        </h2>
        <p className="text-[#cccccc] text-lg max-w-2xl">
          <span className="vscode-comment">{'// A showcase of my recent work and technical achievements'}</span>
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`vscode-terminal overflow-hidden flex flex-col ${
              project.featured ? 'ring-2 ring-[#007acc]' : ''
            }`}
          >
            <div className="vscode-title-bar flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{project.title}</span>
              </div>
              {project.featured && (
                <span className="vscode-badge">Featured</span>
              )}
            </div>

            <div className="p-4 flex flex-col flex-1">
              <div className="h-32 bg-[#2a2d2e] flex items-center justify-center mb-4 rounded">
                <span className="text-4xl">{project.image}</span>
              </div>

              <p className="text-[#cccccc] text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-[#2a2d2e] text-[#cccccc] text-xs rounded border border-[#3c3c3c]"
                  >
                    <span className="vscode-string">"{tech}"</span>
                  </span>
                ))}
              </div>

              <div className="flex-grow"></div>

              <div className="flex gap-2">
                {onProjectClick && (
                  <motion.button
                    onClick={() => onProjectClick(project.projectName)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-2 bg-[#007acc] text-white rounded text-sm hover:bg-[#1177bb] transition-colors duration-300"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read More
                  </motion.button>
                )}
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 bg-[#3c3c3c] text-[#cccccc] rounded text-sm hover:bg-[#4c4c4c] transition-colors duration-300"
                >
                  <Github className="w-4 h-4" />
                  Github Repo
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 