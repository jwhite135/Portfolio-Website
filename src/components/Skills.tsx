import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, Wrench, Lightbulb } from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: 'Java', level: 90 },
        { name: 'C++', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'JavaScript', level: 70 },
        { name: 'SQL', level: 70 },
      ]
    },
    {
      title: 'Frameworks & Libraries',
      icon: <Layers className="w-6 h-6" />,
      skills: [
        { name: 'Spring Boot', level: 85 },
        { name: 'React', level: 75 },
        { name: 'JavaFX', level: 70 },
        { name: 'TensorFlow', level: 70 },
        { name: 'Qt', level: 65 },
      ]
    },
    {
      title: 'Development Tools',
      icon: <Wrench className="w-6 h-6" />,
      skills: [
        { name: 'Git', level: 90 },
        { name: 'JUnit', level: 80 },
        { name: 'CMake', level: 80 },
        { name: 'Maven', level: 75 },
        { name: 'GitHub Projects', level: 75 },
      ]
    },
    {
      title: 'Concepts & Methodologies',
      icon: <Lightbulb className="w-6 h-6" />,
      skills: [
        { name: 'Object-Oriented Design', level: 85 },
        { name: 'Agile/Scrum', level: 80 },
        { name: 'Unit Testing', level: 75 },
        { name: 'Systems Programming', level: 70 },
        { name: 'AI/ML Basics', level: 65 },
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
          <span className="vscode-keyword">public class</span> <span className="vscode-class">Skills</span> &#123;
        </h2>
        <p className="text-[#cccccc] text-lg max-w-2xl">
          <span className="vscode-comment">{'// A comprehensive overview of my technical expertise and capabilities'}</span>
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
            className="vscode-terminal p-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="vscode-icon">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold vscode-class">{category.title}</h3>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#cccccc] font-medium vscode-string">"{skill.name}"</span>
                    <span className="vscode-number text-sm">{skill.level}%</span>
                  </div>
                  <div className="vscode-progress">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="vscode-progress-bar"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-8"
      >
        <h3 className="text-2xl font-semibold mb-6 vscode-syntax-highlight">
          <span className="vscode-keyword">private</span> <span className="vscode-keyword">static</span> <span className="vscode-keyword">final</span> <span className="vscode-keyword">String</span>[] <span className="vscode-function">otherTechnologies</span> = &#123;
        </h3>
        <div className="flex flex-wrap gap-3">
          {[
            'HTML/CSS', 'UML', 'Backtracking Algorithms', 'REST APIs',
            'MIPS Assembly', 'Godot Engine', 'TypeScript', 'Tailwind CSS'
          ].map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="px-4 py-2 bg-[#2a2d2e] text-[#cccccc] rounded text-sm border border-[#3c3c3c] hover:bg-[#37373d] transition-colors duration-300"
            >
              <span className="vscode-string">"{tech}"</span>
            </motion.span>
          ))}
        </div>
        <div className="mt-4 text-[#cccccc]">&#125;;</div>
      </motion.div>
    </div>
  );
};

export default Skills; 