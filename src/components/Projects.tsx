import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, CheckCircle, ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'MemoryBook - Social Memory Sharing',
    description: 'A dynamic web application for sharing personal memories.',
    longDescription: 'Developed using Spring Boot with MVC architecture, implemented RESTful APIs, and integrated MySQL via JPA/Hibernate for persistent data storage. Features JWT-based authentication and role-based authorization.',
    technologies: ['Spring Boot', 'MySQL', 'JPA/Hibernate', 'RESTful APIs', 'JWT', 'MVC Architecture'],
    features: [
      'User authentication and authorization',
      'Memory sharing with privacy controls',
      'Social features and community interaction',
    ],
    image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'MovieTime AI - Smart Ticket Booking',
    description: 'A conversational agent for intelligent movie ticket booking.',
    longDescription: 'Built a scalable backend using Java (Spring Boot) and MySQL with secure authentication and modular REST APIs. Integrated Python AI agent using Google Gemini for natural language queries and real-time chat-based booking.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'Python', 'Google Gemini AI', 'React'],
    features: [
      'AI-powered conversational interface',
      'Natural language query processing',
      'Real-time chat-based booking',
    ],
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  // Add more projects here
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the projects that showcase my passion for design and innovation
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg cursor-pointer overflow-hidden flex flex-col"
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              layoutId={`project-card-${project.id}`}
            >
              <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">{project.description}</p>
                <div className="mt-4 text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-2">
                  View Details <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 relative">
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                  <X size={24} />
                </button>
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover rounded-xl mb-6" />
                
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{selectedProject.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedProject.longDescription}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <CheckCircle size={18} className="text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href={selectedProject.githubUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">
                    <Github size={18} /> GitHub
                  </a>
                  <a href={selectedProject.demoUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <ExternalLink size={18} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;