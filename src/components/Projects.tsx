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
    image: 'memorybook.png'
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
    image: 'movietime.png'
  },
  {
    id: '3',
    title: 'MedBot',
    description: 'An AI-powered health information system that integrates a medical Knowledge Graph with Google\'s Gemini LLM.',
    longDescription: 'This project is an AI-powered health information system that integrates a medical Knowledge Graph with Google\'s Gemini Large Language Model (LLM) to provide accurate, grounded answers. It uses semantic search to map natural language queries to over 162,000 medical entities, reducing hallucinations by validating AI responses against structured data. The application features a responsive chat interface that not only answers questions but also generates interactive visual graphs to show relationships between diseases, symptoms, and treatments.',
    technologies: ['Python', 'Flask', 'SQLAlchemy', 'SQLite', 'Google Gemini API', 'Sentence Transformers', 'PyTorch', 'NumPy', 'Scikit-learn', 'HTML5', 'CSS3', 'JavaScript', 'D3.js', 'Flask-JWT-Extended', 'Bcrypt'],
    features: [
      'Knowledge Graph Integration: Leverages a massive dataset of over 1 million medical relationships (UMLS based) to ground AI responses in factual data',
      'Hybrid Search Engine: Combines semantic vector search (using Sentence Transformers) with fuzzy string matching to accurately identify medical terms even with spelling variations',
      'Live PubMed Evidence: Provides instant credibility by linking validated medical facts directly to their source citations on PubMed, allowing users to verify information with real-world scientific literature.',
      'Fact Validation: Automatically extracts "Subject-Relation-Object" triples from the AI\'s response and validates them against the knowledge graph to ensure accuracy',
    ],
    image: '/medbot.png',
    githubUrl: 'https://github.com/Mukesh-devs/health'
  },
  {
    id: '4',
    title: 'Job Crawler',
    description: 'An advanced automation tool that streamlines the job application process by autonomously crawling major job boards.',
    longDescription: 'This advanced automation tool streamlines the job application process by autonomously crawling major job boards like LinkedIn and Naukri.com. It goes beyond simple scraping by integrating Google\'s Gemini AI to act as a personal career coach—analyzing job descriptions against the user\'s profile, calculating match scores (1-10), and providing actionable advice. The system features a robust "Stealth Mode" to bypass anti-bot protections and includes an automated document generator that creates custom, ATS-optimized resumes for high-potential roles.',
    technologies: ['Python 3.9+', 'Selenium', 'Undetected-Chromedriver', 'Google Generative AI (Gemini 2.0/2.5)', 'SQLite', 'Pandas', 'BeautifulSoup4', 'ReportLab', 'Python-Docx', 'Telegram Bot API', 'Asyncio'],
    features: [
      'Multi-Platform Scraping: Capable of harvesting job data from multiple sources (LinkedIn, Naukri) using undetected-chromedriver to handle dynamic content and session management',
      'AI-Powered Job Analysis: Utilizes Google Gemini (Pro/Flash) models to semantically analyze job descriptions, identifying skill gaps and calculating a compatibility score based on the candidate\'s profile',
      'Smart Model Rotation: Implements a sophisticated quota management system that automatically rotates between different Gemini models (Flash, Pro, Flash-Lite) to ensure continuous operation without hitting API rate limits',
      'Automated Resume Generation: Dynamically generates tailored PDF and DOCX resumes for high-match jobs, optimizing keywords for Applicant Tracking Systems (ATS) using ReportLab and python-docx',
      'Stealth & Anti-Bot Architecture: Features advanced evasion techniques including random delays, mouse movement simulation, user-agent rotation, and browser fingerprinting to mimic human behavior and avoid IP bans',
      'Real-Time Notifications: Integrates with the Telegram Bot API to send instant alerts for high-match jobs, complete with AI analysis summaries and downloadable resume files directly to the user\'s phone',
    ],
    image: '/jobcrawler.png',
    githubUrl: 'https://github.com/Mukesh-devs/job_crawler'
  },
  // Add more projects here
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-indigo-200/20 dark:bg-indigo-500/10 blur-3xl"
          animate={{
            x: [0, -90, 0],
            y: [0, 110, 0],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '15%', right: '10%' }}
        />
        <motion.div
          className="absolute w-[550px] h-[550px] rounded-full bg-cyan-200/20 dark:bg-cyan-500/10 blur-3xl"
          animate={{
            x: [0, 110, 0],
            y: [0, -90, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '20%', left: '15%' }}
        />
      </div>
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
                  {selectedProject.githubUrl ? (
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    >
                      <Github size={18} /> GitHub
                    </a>
                  ) : (
                    <button 
                      disabled 
                      className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg font-medium cursor-not-allowed"
                    >
                      <Github size={18} /> Coming Soon
                    </button>
                  )}
                  
                  {selectedProject.demoUrl ? (
                    <a 
                      href={selectedProject.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  ) : (
                    <button 
                      disabled 
                      className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg font-medium cursor-not-allowed"
                    >
                      <ExternalLink size={18} /> Coming Soon
                    </button>
                  )}
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