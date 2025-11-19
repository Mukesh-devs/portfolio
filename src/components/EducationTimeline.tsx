import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const educationData = [
  {
    id: 'edu1',
    title: 'Bachelor of Engineering in Computer Science',
    organization: 'Anna University',
    location: 'Chennai',
    period: 'Nov 2020 - Jun 2024',
    score: 'CGPA: 8.62/10',
    description: 'Strong foundation in computer science fundamentals, algorithms, and software engineering.',
  },
  {
    id: 'edu2',
    title: 'Higher Secondary Certificate (HSC)',
    organization: 'Our Angel Matriculation Higher Secondary School',
    location: 'Chennai',
    period: 'Jun 2019 - May 2020',
    score: 'Percentage: 67%',
    description: 'Completed higher secondary education with focus on science and mathematics.',
  },
   {
    id: 'edu3',
    title: 'Secondary School Leaving Certificate (SSLC)',
    organization: 'Our Angel Matriculation Higher Secondary School',
    location: 'Chennai',
    period: 'Jun 2017 - May 2018',
    score: 'Percentage: 85%',
    description: 'Strong academic foundation with excellent performance in core subjects.',
  },
];

const EducationTimeline = () => {
  return (
    <div className="bg-white dark:bg-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Education
        </h3>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
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
                {/* Icon on the line */}
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white z-10">
                  <GraduationCap size={18} />
                </div>
                {/* Content Card */}
                <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl shadow-md flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{edu.title}</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.organization}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.period} • {edu.location}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-semibold px-3 py-1 rounded-full ml-4">
                      {edu.score}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-4">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationTimeline;