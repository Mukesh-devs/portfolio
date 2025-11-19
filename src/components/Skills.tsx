import React from 'react';
import { motion } from 'framer-motion';
import CategorizedSkillCloud from './CategorizedSkillCloud';

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Tech Stack
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">A collection of the technologies and tools I use.</p>
        </motion.div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8">
            <CategorizedSkillCloud />
        </div>
      </div>
    </section>
  );
};

export default Skills;