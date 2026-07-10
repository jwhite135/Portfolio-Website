import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  FileText,
  User,
  Code,
  Briefcase,
  Mail,
  Folder,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Linkedin,
  Github,
  FileText as FileTextIcon
} from 'lucide-react';

import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ProjectDetails from './components/ProjectDetails';

interface WelcomeScreenProps {
  setActiveTab: (tab: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setActiveTab }) => (
  <div className="p-8 vscode-content">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Josiah White</h1>
        <p className="text-xl text-[#cccccc]">Software Engineer</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Start Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Start</h2>

          <div className="space-y-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left flex items-center gap-3 p-3 bg-[#2a2d2e] rounded cursor-pointer hover:bg-[#37373d] transition-colors duration-200"
              onClick={() => setActiveTab('skills')}
            >
              <FileText className="w-5 h-5 text-[#007acc]" />
              <span className="text-[#cccccc]">Skills...</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left flex items-center gap-3 p-3 bg-[#2a2d2e] rounded cursor-pointer hover:bg-[#37373d] transition-colors duration-200"
              onClick={() => setActiveTab('projects')}
            >
              <Folder className="w-5 h-5 text-[#007acc]" />
              <span className="text-[#cccccc]">Projects...</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left flex items-center gap-3 p-3 bg-[#2a2d2e] rounded cursor-pointer hover:bg-[#37373d] transition-colors duration-200"
              onClick={() => setActiveTab('about')}
            >
              <User className="w-5 h-5 text-[#007acc]" />
              <span className="text-[#cccccc]">About...</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left flex items-center gap-3 p-3 bg-[#2a2d2e] rounded cursor-pointer hover:bg-[#37373d] transition-colors duration-200"
              onClick={() => setActiveTab('contact')}
            >
              <Mail className="w-5 h-5 text-[#007acc]" />
              <span className="text-[#cccccc]">Get in Touch...</span>
            </motion.button>
          </div>

          {/* Recent Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Recent</h3>
            <div className="space-y-2">
              {[
                { label: 'Projects', tab: 'projects', path: '~/josiah/portfolio/projects' },
                { label: 'Experience', tab: 'experience', path: '~/josiah/portfolio/experience' },
                { label: 'Skills', tab: 'skills', path: '~/josiah/portfolio/skills' },
                { label: 'Contact', tab: 'contact', path: '~/josiah/portfolio/contact' },
              ].map(({ label, tab, path }) => (
                <button
                  key={tab}
                  type="button"
                  className="w-full text-left flex items-center gap-2 text-sm cursor-pointer hover:bg-[#2a2d2e] px-2 py-1 rounded transition-colors duration-150"
                  onClick={() => setActiveTab(tab)}
                >
                  <span className="text-[#007acc]">{label}</span>
                  <span className="text-[#6a6a6a]">{path}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - About Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">About</h2>

          <div className="space-y-3">
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-3 bg-[#2a2d2e] rounded cursor-pointer hover:bg-[#37373d] transition-colors duration-200 border-b-2 border-[#007acc]"
            >
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <FileTextIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#cccccc]">My Resume</span>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/josiahawhite"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-3 bg-[#2a2d2e] rounded cursor-pointer hover:bg-[#37373d] transition-colors duration-200 border-b-2 border-[#007acc]"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-[#007acc]" />
              </div>
              <span className="text-[#cccccc]">LinkedIn Profile</span>
            </motion.a>

            <motion.a
              href="https://github.com/jwhite135"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-3 bg-[#2a2d2e] rounded cursor-pointer hover:bg-[#37373d] transition-colors duration-200 border-b-2 border-[#007acc]"
            >
              <div className="w-8 h-8 bg-[#333] rounded-full flex items-center justify-center">
                <Github className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#cccccc]">Github Page</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  // Start with the explorer collapsed on small screens so it doesn't crowd out content.
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window === 'undefined' || window.innerWidth >= 768
  );
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({
    'About': true,
    'Projects': true,
    'Contact': true
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Code className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const fileStructure = [
    {
      name: 'About',
      icon: <Folder className="w-4 h-4" />,
      isFolder: true,
      files: [
        { name: 'About.java', type: 'file' },
        { name: 'Experience.java', type: 'file' },
        { name: 'Skills.java', type: 'file' },
        { name: 'Projects.java', type: 'file' }
      ]
    },
    {
      name: 'Projects',
      icon: <Folder className="w-4 h-4" />,
      isFolder: true,
      files: [
        { name: 'CodeCollab.java', type: 'file' },
        { name: 'KeyQuest.java', type: 'file' },
        { name: 'ClassFinder.tsx', type: 'file' },
        { name: 'CockBots.py', type: 'file' },
        { name: 'PortfolioWebsite.tsx', type: 'file' },
        { name: 'Minesweeper.cpp', type: 'file' },
        { name: 'SudokuSolver.html', type: 'file' }
      ]
    },
    {
      name: 'Contact',
      icon: <Folder className="w-4 h-4" />,
      isFolder: true,
      files: [
        { name: 'Contact.java', type: 'file' }
      ]
    },
  ];

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const projectTabLabels: Record<string, string> = {
    codecollab: 'CodeCollab.java',
    keyquest: 'KeyQuest.java',
    classfinder: 'ClassFinder.tsx',
    cockbots: 'CockBots.py',
    portfoliowebsite: 'PortfolioWebsite.tsx',
    minesweeper: 'Minesweeper.cpp',
    sudokusolver: 'SudokuSolver.html',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[#007acc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-[#cccccc]">Loading Java Portfolio...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e]">
      {/* Title Bar */}
      <div className="vscode-title-bar flex items-center justify-between w-full flex-shrink-0">
        <div className="flex overflow-x-auto vscode-scrollbar">
          <button
            type="button"
            className={`vscode-tab ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Welcome
          </button>
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`vscode-tab ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
          {/* Project Tabs */}
          {activeTab in projectTabLabels && (
            <button type="button" className="vscode-tab active">
              {projectTabLabels[activeTab]}
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0">
        {/* Activity Bar */}
        <div className="vscode-activity-bar flex flex-col flex-shrink-0">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`vscode-activity-item ${sidebarOpen ? 'active' : ''}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Hide Explorer" : "Show Explorer"}
            aria-label={sidebarOpen ? "Hide Explorer" : "Show Explorer"}
            aria-pressed={sidebarOpen}
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </motion.button>
        </div>

        {/* Content Area with Sidebar */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 300 }}
              className="vscode-sidebar flex flex-col flex-shrink-0"
            >
              <div className="vscode-explorer flex-1 overflow-y-auto vscode-scrollbar p-2">
                {fileStructure.map((section) => {
                  const isExpanded = !!expandedFolders[section.name];
                  return (
                  <div key={section.name} className="mb-2">
                    <button
                      type="button"
                      className="vscode-folder w-full text-left flex items-center py-1 cursor-pointer hover:bg-[#2a2d2e] transition-colors duration-200"
                      onClick={() => toggleFolder(section.name)}
                      aria-expanded={isExpanded}
                    >
                      <span className="vscode-icon mr-1">
                        {isExpanded ? (
                          <ChevronDown className="w-3 h-3" />
                        ) : (
                          <ChevronRight className="w-3 h-3" />
                        )}
                      </span>
                      <span className="vscode-icon mr-2">{section.icon}</span>
                      <span>{section.name}</span>
                    </button>
                    {isExpanded && (
                      <div className="ml-4">
                        {section.files.map((file) => {
                          const fileTab = file.name.toLowerCase().replace(/\.(java|py|tsx|cpp|html)$/, '');
                          const isActive = activeTab === fileTab;
                          return (
                          <button
                            key={file.name}
                            type="button"
                            className={`vscode-file w-full text-left flex items-center py-1 cursor-pointer hover:bg-[#2a2d2e] transition-colors duration-200 ${
                              isActive ? 'active' : ''
                            }`}
                            onClick={() => setActiveTab(fileTab)}
                            aria-label={`Open ${file.name}`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            <span className="vscode-icon mr-2 font-bold flex items-center justify-center w-4 h-4">
                              {file.name.endsWith('.java') && <span className="text-red-500">J</span>}
                              {file.name.endsWith('.py') && <span className="text-blue-400 text-sm">🐍</span>}
                              {file.name.endsWith('.tsx') && <span className="text-blue-600 text-sm">⚛</span>}
                              {file.name.endsWith('.cpp') && <span className="text-blue-400">C</span>}
                              {file.name.endsWith('.html') && <span className="text-orange-500 text-sm">🌐</span>}
                            </span>
                            <span>{file.name}</span>
                          </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 vscode-content overflow-y-auto vscode-scrollbar pb-8">
              {activeTab === 'home' && <WelcomeScreen setActiveTab={setActiveTab} />}
              {activeTab === 'about' && <About />}
              {activeTab === 'experience' && <Experience />}
              {activeTab === 'skills' && <Skills />}
              {activeTab === 'projects' && <Projects onProjectClick={(projectName) => setActiveTab(projectName)} />}
              {activeTab === 'contact' && <Contact />}
              {/* Project Detail Pages */}
              {activeTab === 'codecollab' && <ProjectDetails projectName="codecollab" />}
              {activeTab === 'keyquest' && <ProjectDetails projectName="keyquest" />}
              {activeTab === 'classfinder' && <ProjectDetails projectName="classfinder" />}
              {activeTab === 'cockbots' && <ProjectDetails projectName="cockbots" />}
              {activeTab === 'portfoliowebsite' && <ProjectDetails projectName="portfoliowebsite" />}
              {activeTab === 'minesweeper' && <ProjectDetails projectName="minesweeper" />}
              {activeTab === 'sudokusolver' && <ProjectDetails projectName="sudokusolver" />}
            </div>
          </div>
        </div>

        {/* Status Bar - Fixed at bottom of viewport */}
        <div className="vscode-status-bar flex items-center justify-between px-4 fixed bottom-0 left-0 right-0 z-50">
          <div className="flex items-center space-x-4">
            <span>Ready</span>
            <span>UTF-8</span>
            <span>Java</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Ln 1, Col 1</span>
            <span>Spaces: 4</span>
            <span>Port: 3000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
