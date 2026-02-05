import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const experienceData = [
  { id: 'exp1', title: 'Incubation Trainee', organization: 'ZOHO', location: 'Chennai', period: 'Feb 2025 - Jun 2025', description: '6-month intensive training in full-stack development, software engineering practices, and real-world problem solving.', skills: ['Full-Stack Development', 'Software Engineering', 'Problem Solving'] },
  { id: 'exp2', title: 'Technical Careers Program', organization: 'TNS India Foundation (with Capgemini)', location: 'India', period: 'Dec 2023 - May 2024', description: 'Comprehensive training in SQL, Core Java 8, JPA with Hibernate, Git, Spring Boot, and modern frontend technologies.', skills: ['Java', 'Spring Boot', 'SQL', 'JavaScript', 'HTML5', 'CSS3'] },
];

const educationData = [
  { id: 'edu1', title: 'Bachelor of Engineering in Computer Science', organization: 'Anna University', location: 'Chennai', period: 'Nov 2020 - Jun 2024', score: 'CGPA: 8.62/10' },
  { id: 'edu2', title: 'Higher Secondary Certificate (HSC)', organization: 'Our Angel Matriculation Higher Secondary School', location: 'Chennai', period: 'Jun 2018 - May 2020', score: 'Percentage: 67%' },
  { id: 'edu2', title: 'Secondary School Leaving Certificate (SSLC)', organization: 'Our Angel Matriculation Higher Secondary School', location: 'Chennai', period: 'Jun 2017 - May 2018', score: 'Percentage: 85%' },
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-20 bg-slate-900 text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop')` }}
      ></div>
      <div className="absolute inset-0 bg-slate-900/80"></div>
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-purple-400/15 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '10%', left: '20%' }}
        />
        <motion.div
          className="absolute w-[550px] h-[550px] rounded-full bg-blue-400/15 blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '15%', right: '10%' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
          Training & Experience
        </h2>
        
        {/* Experience Timeline */}
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-purple-500/30"></div>
          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative flex items-start gap-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white z-10 shadow-lg">
                  <Briefcase size={18} />
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{exp.title}</h4>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">{exp.organization}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.period} • {exp.location}</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills?.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-full text-xs font-medium">{skill}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mt-24 mb-16 text-center">
          Education
        </h2>
        
        {/* Education Timeline */}
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-500/30"></div>
          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                className="relative flex items-start gap-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white z-10 shadow-lg">
                  <GraduationCap size={18} />
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{edu.title}</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.organization}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.period}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-semibold px-3 py-1 rounded-full ml-4 whitespace-nowrap">
                      {edu.score}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;