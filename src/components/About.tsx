import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Code, Users } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Code, label: 'Programming Languages', value: 'Java, Python', color: 'from-blue-500 to-blue-600' },
    { icon: BookOpen, label: 'Education', value: 'B.E Computer Science', color: 'from-green-500 to-green-600' },
    { icon: Award, label: 'Certifications', value: '6+ Certifications', color: 'from-purple-500 to-purple-600' },
    { icon: Users, label: 'Team Experience', value: 'Collaborative Projects', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Passionate about creating scalable solutions and leveraging modern technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Innovative Full Stack Developer
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              As an innovative and results-driven Computer Science graduate, I bring a strong foundation 
              in software development, system design, and analytics. I'm adept at leveraging modern 
              technologies to build scalable applications and optimize system performance.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              With proven ability to contribute in team-oriented environments, I effectively communicate 
              technical concepts and drive impactful outcomes through continuous learning and hands-on development. 
              My experience spans from backend API development to full-stack applications with AI integration.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {stat.label}
                </h4>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;