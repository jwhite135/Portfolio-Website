import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

const ExperienceCard: React.FC<{ exp: ExperienceEntry; index: number }> = ({ exp, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="vscode-terminal p-4"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-xl font-semibold text-[#cccccc] mb-1">{exp.title}</h3>
        <div className="flex items-center gap-4 text-[#6a6a6a] text-sm">
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{exp.company}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{exp.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{exp.period}</span>
          </div>
        </div>
      </div>
    </div>

    <p className="text-[#cccccc] text-sm leading-relaxed mb-4">
      {exp.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-4">
      {exp.technologies.map((tech) => (
        <span
          key={tech}
          className="px-2 py-1 bg-[#2a2d2e] text-[#cccccc] text-xs rounded border border-[#3c3c3c]"
        >
          <span className="vscode-string">"{tech}"</span>
        </span>
      ))}
    </div>

    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-[#cccccc]">Key Achievements:</h4>
      <ul className="space-y-1">
        {exp.achievements.map((achievement, idx) => (
          <li key={idx} className="text-[#cccccc] text-sm flex items-start gap-2">
            <span className="vscode-icon mt-1">•</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Experience: React.FC = () => {
  const experiences: ExperienceEntry[] = [
    {
      title: 'Data & Business Applications Intern',
      company: 'CEEUS Inc.',
      location: 'Columbia, SC',
      period: 'May 2026 - Present',
      description: 'Developing data and business application solutions as part of a summer internship. Working with real-world data systems and contributing to business process improvements through software development.',
      technologies: ['Python', 'SQL', 'Data Analysis', 'Business Applications'],
      achievements: [
        'Contributing to data pipeline development and business application features',
        'Collaborating with cross-functional teams to deliver software solutions',
        'Applying data analysis and engineering skills to real-world business problems'
      ]
    },
    {
      title: 'AI Provost Fellow',
      company: 'USC Honors College',
      location: 'Columbia, SC',
      period: 'Mar 2026 - Present',
      description: 'Awarded a competitive $5,000 fellowship through the Honors College Provost AI Fellowship program to research cultural bias in AI and large language models, studying how LLM outputs reflect and reinforce cultural assumptions through literature review, experimental design, and technical analysis.',
      technologies: ['Python', 'LLMs', 'NLP', 'AI Ethics', 'Research'],
      achievements: [
        'Awarded a competitive $5,000 fellowship to conduct AI research on cultural bias in AI and large language models',
        'Studying cultural bias in LLM outputs through literature review, experimental design, and technical analysis',
        'Working toward a research paper and presentation on findings'
      ]
    },
    {
      title: 'Machine Learning & AI Developer',
      company: 'Center for Industry Solutions',
      location: 'Columbia, SC',
      period: 'Nov 2025 - Present',
      description: 'Contributing to Cerberus, an anomaly-based intrusion detection system identifying cyberattacks, including day-zero threats, through deep learning on network traffic data.',
      technologies: ['Python', 'Hugging Face', 'Deep Learning', 'Cybersecurity'],
      achievements: [
        'Contribute to Cerberus, an anomaly-based intrusion detection system identifying cyberattacks, including day-zero threats',
        'Preprocess and analyze 900K+ network flow packets across 8 traffic classes to support model training and evaluation',
        'Fine-tune a pretrained deep learning model (NetFound) on cybersecurity traffic data using Hugging Face and Python-based tooling'
      ]
    },
    {
      title: 'Undergraduate Teaching Assistant',
      company: 'University of South Carolina',
      location: 'Columbia, SC',
      period: 'Aug 2025 - Present',
      description: 'Supporting computer science education by leading laboratory sessions and mentoring students in fundamental programming concepts. Collaborating with faculty to develop and enhance course materials while providing personalized guidance to help students master Java programming, object-oriented design, and problem-solving methodologies.',
      technologies: ['Java', 'Leadership', 'Teaching'],
      achievements: [
        'Supervise labs and mentor 50+ students in Java fundamentals, problem-solving, and algorithmic thinking',
        'Guide students through debugging and core OOP concepts; enhance exercises through faculty collaboration',
        'Grade assignments and provide feedback to improve programming and design skills'
      ]
    },
    {
      title: 'Undergraduate Research Assistant - Honors College Research Grant',
      company: 'University of South Carolina',
      location: 'Columbia, SC',
      period: 'Aug 2025 - May 2026',
      description: 'Received competitive research grant to develop a MIPS assembly interpreter within the Godot engine using C++. Designed a virtual machine to parse and execute MIPS instructions, modeling registers, memory, and instruction flow within a game engine environment.',
      technologies: ['C++', 'MIPS Assembly', 'Godot Engine', 'Virtual Machine', 'Systems Programming'],
      achievements: [
        'Received competitive research grant to develop a MIPS assembly interpreter within the Godot engine using C++',
        'Designed a virtual machine to parse and execute MIPS instructions, modeling registers, memory, and instruction flow within a game engine environment',
        'Explored integration of low-level systems concepts with game development, laying groundwork for a MIPS-based game engine'
      ]
    }
  ];

  const leadership: ExperienceEntry[] = [
    {
      title: 'Product Manager - Heritage Library AI Initiative',
      company: 'Kappa Theta Pi',
      location: 'Hilton Head, SC (Remote)',
      period: 'Jun 2026 - Present',
      description: 'Leading a nonprofit technology partnership with the Heritage Library in Hilton Head to add AI-driven components to their website, as part of Kappa Theta Pi\'s ongoing nonprofit project initiatives.',
      technologies: ['AI', 'Project Management', 'Web Development'],
      achievements: [
        'Leading product coordination for an AI integration project with the Heritage Library',
        'Scoping requirements and project plan in partnership with library stakeholders'
      ]
    },
    {
      title: 'Product Manager - ktpusc.com',
      company: 'Kappa Theta Pi',
      location: 'Columbia, SC',
      period: 'Aug 2025 - Dec 2025',
      description: 'Led product coordination for the fraternity website, managing a 5-person development team through Jira ticketing, sprint planning, and task assignment.',
      technologies: ['Jira', 'GitHub', 'Product Management', 'Web Development'],
      achievements: [
        'Led product coordination for the fraternity website, managing a 5-person development team through Jira ticketing, sprint planning, and task assignment',
        'Managed the GitHub repository, reviewed pull requests, resolved merge conflicts, and contributed bug fixes to support site reliability'
      ]
    },
    {
      title: 'Co-Founder & Executive Secretary',
      company: 'Kappa Theta Pi - South Carolina',
      location: 'Columbia, SC',
      period: 'Mar 2025 - Apr 2026',
      description: 'Co-founded USC\'s first professional technology fraternity, growing the organization from 9 to 48+ members and building partnerships with 7 nonprofits to apply technical skills to real community challenges.',
      technologies: ['Leadership', 'Nonprofit Partnerships', 'Mentorship', 'Event Planning'],
      achievements: [
        'Co-founded USC\'s first professional technology fraternity, growing the organization from 9 to 48+ members, launching 9 projects, and building partnerships with 7 nonprofits',
        'Designed and led nonprofit-focused technology projects each semester, creating opportunities for members to apply technical skills to real community challenges',
        'Built onboarding, mentorship, and technical programming initiatives, including workshops, leadership pathways, and project-based involvement for new and existing members',
        'Managed organizational record keeping and coordinated logistics for 35+ events per semester, helping guide chapter growth and long-term direction as a founding member'
      ]
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
          <span className="vscode-keyword">public class</span> <span className="vscode-class">Experience</span> &#123;
        </h2>
        <p className="text-[#cccccc] text-lg max-w-2xl">
          <span className="vscode-comment">{'// My professional journey and career milestones'}</span>
        </p>
      </motion.div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.title} exp={exp} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-10 mb-6"
      >
        <h2 className="text-3xl font-bold mb-4 vscode-syntax-highlight">
          <span className="vscode-keyword">public class</span> <span className="vscode-class">LeadershipAndExtracurriculars</span> &#123;
        </h2>
        <p className="text-[#cccccc] text-lg max-w-2xl">
          <span className="vscode-comment">{'// Student organization leadership and community involvement'}</span>
        </p>
      </motion.div>

      <div className="space-y-6">
        {leadership.map((exp, index) => (
          <ExperienceCard key={exp.title} exp={exp} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-8"
      >
        <h3 className="text-2xl font-bold mb-6 vscode-syntax-highlight">
          <span className="vscode-keyword">public class</span> <span className="vscode-class">Education</span> &#123;
        </h3>

        <div className="vscode-terminal p-4">
          <div className="font-mono text-sm space-y-2">
            <div>
              <span className="vscode-keyword">private</span> <span className="vscode-keyword">static</span> <span className="vscode-keyword">final</span> <span className="vscode-keyword">String</span> <span className="vscode-function">degree</span> = <span className="vscode-string">"Bachelor of Science in Computer Science"</span>;
            </div>
            <div>
              <span className="vscode-keyword">private</span> <span className="vscode-keyword">static</span> <span className="vscode-keyword">final</span> <span className="vscode-keyword">String</span> <span className="vscode-function">institution</span> = <span className="vscode-string">"University of South Carolina"</span>;
            </div>
            <div>
              <span className="vscode-keyword">private</span> <span className="vscode-keyword">static</span> <span className="vscode-keyword">final</span> <span className="vscode-keyword">int</span> <span className="vscode-function">graduating</span> = <span className="vscode-number">2027</span>;
            </div>
            <div>
              <span className="vscode-keyword">private</span> <span className="vscode-keyword">static</span> <span className="vscode-keyword">final</span> <span className="vscode-keyword">double</span> <span className="vscode-function">gpa</span> = <span className="vscode-number">4.0</span>;
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;
