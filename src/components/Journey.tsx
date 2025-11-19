import React from 'react';
import { motion } from 'framer-motion';
import EducationTimeline from './EducationTimeline'; 
import CertificationGrid from './Certificates';
import ExperienceTimeline from './Experience';

// Main Component
const Journey: React.FC = () => {
  return (
    <section id="timeline" className="bg-gray-50 dark:bg-slate-800">
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore my professional experience, certifications, and educational background.
            </p>
          </motion.div>
        </div>
      </div>
      
      <ExperienceTimeline />
      <CertificationGrid />
      <EducationTimeline />
    </section>
  );
};

export default Journey;