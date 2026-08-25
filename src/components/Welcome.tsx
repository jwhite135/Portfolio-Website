import React from 'react';
import { motion } from 'framer-motion';
import { FileText, User, Code, Folder, Mail, Briefcase, Linkedin, Github } from 'lucide-react';
import type { TabId } from '../lib/site';

interface WelcomeProps {
  onOpen: (tab: TabId) => void;
}

const starts: { tab: TabId; icon: React.ReactNode; label: string; hint: string }[] = [
  { tab: 'about', icon: <User className="w-4 h-4" />, label: 'About', hint: 'who I am' },
  { tab: 'experience', icon: <Briefcase className="w-4 h-4" />, label: 'Experience', hint: 'where I have worked' },
  { tab: 'skills', icon: <Code className="w-4 h-4" />, label: 'Skills', hint: 'what I build with' },
  { tab: 'projects', icon: <Folder className="w-4 h-4" />, label: 'Projects', hint: '7 repositories' },
  { tab: 'contact', icon: <Mail className="w-4 h-4" />, label: 'Contact', hint: 'send a message' },
];

const links = [
  { href: '/resume.pdf', icon: <FileText className="w-4 h-4" />, label: 'Résumé', hint: 'PDF' },
  { href: 'https://linkedin.com/in/josiahawhite', icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', hint: 'in/josiahawhite' },
  { href: 'https://github.com/jwhite135', icon: <Github className="w-4 h-4" />, label: 'GitHub', hint: '@jwhite135' },
];

// One shared stagger so the whole screen resolves as a single motion, rather
// than a handful of independent fades firing at different times.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.2, 0, 0, 1] as const } },
};

const Welcome: React.FC<WelcomeProps> = ({ onOpen }) => (
  <div className="px-6 py-10 sm:px-10 sm:py-16 vscode-content min-h-full flex items-center">
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto w-full"
    >
      <motion.div variants={item} className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Josiah White
          <span
            aria-hidden="true"
            className="inline-block w-[0.5em] h-[0.9em] ml-2 -mb-[0.06em] bg-accent-text animate-caret-blink"
          />
        </h1>
        <p className="mt-3 text-lg text-fg-muted">
          <span className="vscode-comment">
            {'// Software engineer · CS + AI research at the University of South Carolina'}
          </span>
        </p>
      </motion.div>

      <div className="grid gap-10 sm:grid-cols-2">
        <motion.section variants={item} aria-labelledby="welcome-start">
          <h2
            id="welcome-start"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted mb-3"
          >
            Start
          </h2>
          <ul className="space-y-1">
            {starts.map(({ tab, icon, label, hint }) => (
              <li key={tab}>
                <button
                  type="button"
                  onClick={() => onOpen(tab)}
                  className="group w-full flex items-center gap-3 px-3 py-2.5 -mx-3 rounded
                             text-left transition-colors duration-150 hover:bg-surface"
                >
                  <span className="text-accent-text shrink-0" aria-hidden="true">{icon}</span>
                  <span className="text-fg group-hover:text-white transition-colors">{label}</span>
                  <span className="ml-auto hidden sm:inline text-xs text-fg-muted tabular-nums">{hint}</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section variants={item} aria-labelledby="welcome-links">
          <h2
            id="welcome-links"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted mb-3"
          >
            Elsewhere
          </h2>
          <ul className="space-y-1">
            {links.map(({ href, icon, label, hint }) => {
              const external = href.startsWith('http');
              return (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full flex items-center gap-3 px-3 py-2.5 -mx-3 rounded
                               transition-colors duration-150 hover:bg-surface"
                  >
                    <span className="text-accent-text shrink-0" aria-hidden="true">{icon}</span>
                    <span className="text-fg group-hover:text-white transition-colors">
                      {label}
                      <span className="sr-only">{external ? ' (opens in a new tab)' : ' (opens the PDF in a new tab)'}</span>
                    </span>
                    <span className="ml-auto hidden sm:inline text-xs text-fg-muted">{hint}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-sm text-fg-muted leading-relaxed">
            <span className="vscode-comment">
              {'// Open a file from the Explorer, or use the tabs above.'}
            </span>
          </p>
        </motion.section>
      </div>
    </motion.div>
  </div>
);

export default Welcome;
