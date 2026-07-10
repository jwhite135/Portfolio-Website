import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Years Coding', value: '3+' },
    { label: 'Projects Completed', value: '15+' },
    { label: 'Technologies', value: '12+' },
    { label: 'GPA', value: '4.0' },
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
          <span className="vscode-keyword">public class</span> <span className="vscode-class">About</span> &#123;
        </h2>
        <p className="text-[#cccccc] text-lg max-w-2xl">
          <span className="vscode-comment">{'// Get to know me better and understand what drives my passion for technology'}</span>
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="vscode-terminal p-4">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-sm text-[#6a6a6a]">Terminal</span>
            </div>
            
            <div className="space-y-2 font-mono text-sm">
              <div>
                <span className="vscode-string">$</span> <span className="vscode-function">whoami</span>
              </div>
              <div className="text-[#cccccc] ml-4">
                <span className="vscode-class">Josiah White</span> - <span className="vscode-string">"Software Engineer"</span>
              </div>
              <div>
                <span className="vscode-string">$</span> <span className="vscode-function">cat</span> <span className="vscode-string">about.txt</span>
              </div>
              <div className="text-[#cccccc] ml-4">
                <span className="vscode-comment">{'// Passionate developer and rising senior at the University of South Carolina'}</span><br/>
                <span className="vscode-comment">{'// Full-stack engineer (Java, Spring Boot, React) with a focus on AI/ML research'}</span><br/>
                <span className="vscode-comment">{'// Currently researching LLMs and deep learning for network intrusion detection'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="vscode-notification"
              >
                <div className="vscode-number text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-[#6a6a6a] text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="vscode-terminal p-4">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-sm text-[#6a6a6a]">About.java</span>
            </div>
            
            <div className="font-mono text-sm space-y-2">
              <div>
                <span className="vscode-keyword">public class</span> <span className="vscode-class">Developer</span> &#123;
              </div>
              <div className="ml-4">
                <span className="vscode-keyword">private</span> <span className="vscode-keyword">String</span> <span className="vscode-function">name</span> = <span className="vscode-string">"Josiah White"</span>;
              </div>
              <div className="ml-4">
                <span className="vscode-keyword">private</span> <span className="vscode-keyword">String</span> <span className="vscode-function">title</span> = <span className="vscode-string">"Software Engineer"</span>;
              </div>
              <div className="ml-4">
                <span className="vscode-keyword">private</span> <span className="vscode-keyword">String</span> <span className="vscode-function">location</span> = <span className="vscode-string">"Columbia, SC"</span>;
              </div>

              <div className="ml-4">
                <span className="vscode-keyword">private</span> <span className="vscode-keyword">String</span>[] <span className="vscode-function">skills</span> = &#123;
              </div>
              <div className="ml-8">
                <span className="vscode-string">"Java"</span>, <span className="vscode-string">"Spring Boot"</span>, <span className="vscode-string">"React"</span>,
              </div>
              <div className="ml-8">
                <span className="vscode-string">"Python"</span>, <span className="vscode-string">"TensorFlow"</span>, <span className="vscode-string">"C++"</span>
              </div>
              <div className="ml-4">&#125;;
              </div>
              <div className="ml-4">
                <span className="vscode-keyword">private</span> <span className="vscode-keyword">String</span> <span className="vscode-function">education</span> = <span className="vscode-string">"Computer Science Degree"</span>;
              </div>
              <div>&#125;</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[#cccccc]">
              <MapPin className="w-5 h-5 vscode-icon" />
              <span>Based in Columbia, SC</span>
            </div>
            <div className="flex items-center gap-3 text-[#cccccc]">
              <Calendar className="w-5 h-5 vscode-icon" />
              <span>Available for new opportunities</span>
            </div>
            <div className="flex items-center gap-3 text-[#cccccc]">
              <GraduationCap className="w-5 h-5 vscode-icon" />
              <span>Computer Science Degree</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 