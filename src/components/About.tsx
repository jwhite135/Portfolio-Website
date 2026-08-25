import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, GraduationCap } from 'lucide-react';
import PageHeader from './PageHeader';
import { fadeUp, fadeIn, stagger } from '../lib/motion';

// Every figure here is one a reader could check against the resume; the
// previous set ("15+ projects", "12+ technologies") was unverifiable filler.
const stats = [
  { label: 'Cumulative GPA', value: '3.92' },
  { label: 'Expected graduation', value: '2027' },
  { label: 'AI research fellowship', value: '$5,000' },
  { label: 'Network packets analyzed', value: '900K+' },
];

const facts = [
  { icon: MapPin, text: 'Based in Columbia, SC' },
  { icon: Calendar, text: 'Available for new opportunities' },
  { icon: GraduationCap, text: 'B.S. Computer Science, Honors College — May 2027' },
];

/** The three window-control dots plus a filename, shared by every panel. */
const PanelChrome: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center mb-4">
    <div className="flex space-x-2" aria-hidden="true">
      <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
      <span className="w-3 h-3 rounded-full bg-[#28c840]" />
    </div>
    <span className="ml-4 text-sm text-fg-muted">{name}</span>
  </div>
);

const About: React.FC = () => (
  <motion.div
    variants={stagger(0.08)}
    initial="hidden"
    animate="show"
    className="p-6 sm:p-8 vscode-content"
  >
    <PageHeader
      className_="About"
      title="About"
      comment="Get to know me better and understand what drives my passion for technology"
    />

    <div className="grid lg:grid-cols-2 gap-8">
      <motion.div variants={fadeIn(-24)} className="space-y-6">
        <div className="vscode-terminal p-4">
          <PanelChrome name="Terminal" />

          <div className="space-y-2 text-sm">
            <div>
              <span className="vscode-string">$</span>{' '}
              <span className="vscode-function">whoami</span>
            </div>
            <div className="ml-4">
              <span className="vscode-class">Josiah White</span> —{' '}
              <span className="vscode-string">"Software Engineer"</span>
            </div>
            <div className="pt-2">
              <span className="vscode-string">$</span>{' '}
              <span className="vscode-function">cat</span>{' '}
              <span className="vscode-string">about.txt</span>
            </div>
            <div className="ml-4 space-y-0.5">
              <p className="vscode-comment">{'// Senior at the University of South Carolina, Honors College'}</p>
              <p className="vscode-comment">{'// Engineer across the stack and the data layer — Python, Java, SQL, C++'}</p>
              <p className="vscode-comment">{'// Fine-tuning deep learning models for network intrusion detection,'}</p>
              <p className="vscode-comment">{'// and researching political bias in large language models'}</p>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="vscode-notification">
              <dd className="vscode-number text-2xl font-bold mb-1 tabular-nums">{stat.value}</dd>
              <dt className="text-fg-muted text-sm">{stat.label}</dt>
            </motion.div>
          ))}
        </dl>
      </motion.div>

      <motion.div variants={fadeIn(24)} className="space-y-6">
        <div className="vscode-terminal p-4">
          <PanelChrome name="About.java" />

          <pre
            className="text-sm leading-6 overflow-x-auto vscode-scrollbar"
            tabIndex={0}
            role="region"
            aria-label="Developer class source"
          >
            <code>
              <span className="vscode-keyword">public class</span>{' '}
              <span className="vscode-class">Developer</span> &#123;{'\n'}
              {'  '}<span className="vscode-keyword">private String</span>{' '}
              <span className="vscode-function">name</span> ={' '}
              <span className="vscode-string">"Josiah White"</span>;{'\n'}
              {'  '}<span className="vscode-keyword">private String</span>{' '}
              <span className="vscode-function">title</span> ={' '}
              <span className="vscode-string">"Software Engineer"</span>;{'\n'}
              {'  '}<span className="vscode-keyword">private String</span>{' '}
              <span className="vscode-function">location</span> ={' '}
              <span className="vscode-string">"Columbia, SC"</span>;{'\n'}
              {'  '}<span className="vscode-keyword">private String</span>[]{' '}
              <span className="vscode-function">skills</span> = &#123;{'\n'}
              {'    '}<span className="vscode-string">"Python"</span>,{' '}
              <span className="vscode-string">"Java"</span>,{' '}
              <span className="vscode-string">"C++"</span>,{' '}
              <span className="vscode-string">"SQL"</span>,{'\n'}
              {'    '}<span className="vscode-string">"PyTorch"</span>,{' '}
              <span className="vscode-string">"Hugging Face"</span>,{' '}
              <span className="vscode-string">"Power BI"</span>{'\n'}
              {'  '}&#125;;{'\n'}
              {'  '}<span className="vscode-keyword">private String</span>{' '}
              <span className="vscode-function">education</span> ={' '}
              <span className="vscode-string">"B.S. Computer Science"</span>;{'\n'}
              &#125;
            </code>
          </pre>
        </div>

        <ul className="space-y-3">
          {facts.map(({ icon: Icon, text }) => (
            <motion.li key={text} variants={fadeUp} className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-accent-text shrink-0" aria-hidden="true" />
              <span>{text}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  </motion.div>
);

export default About;
