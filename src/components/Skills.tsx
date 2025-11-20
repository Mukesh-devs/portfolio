import React from 'react';
import { motion } from 'framer-motion';
import CategorizedSkillCloud from './CategorizedSkillCloud';

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-green-200/20 dark:bg-green-500/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 23,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '20%', right: '15%' }}
        />
        <motion.div
          className="absolute w-[550px] h-[550px] rounded-full bg-blue-200/20 dark:bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '15%', left: '10%' }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My Tech Stack
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Technologies and tools I work with</p>
        </motion.div>
        
        <CategorizedSkillCloud />
      </div>
    </section>
  );
};

export default Skills;