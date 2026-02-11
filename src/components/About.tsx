import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const About: React.FC = () => {
  const workPreferences = [
    { icon: Briefcase, label: 'Open to', value: 'Remote, Hybrid, or On-site' },
    { icon: Clock, label: 'Flexible Timings', value: 'Any shift/work schedule' },
    { icon: MapPin, label: 'Ready to Relocate', value: 'Yes (if required)' },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-[#98c1d9]/20 dark:bg-[#457b9d]/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-[#a8dadc]/20 dark:bg-[#98c1d9]/10 blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '40%', right: '10%' }}
        />
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full bg-[#a8dadc]/25 dark:bg-[#a8dadc]/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 150, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '10%', left: '30%' }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#457b9d] via-[#98c1d9] to-[#a8dadc] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#457b9d] to-[#98c1d9] mb-6">
                Who I Am
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  I am a passionate <span className="font-semibold text-gray-900 dark:text-white">Computer Science graduate</span> and a <span className="font-semibold text-blue-600 dark:text-blue-400">Zoho Incubation Trainee</span>, where I completed <span className="font-semibold">6 months of hands-on training</span> focused on data structures, backend development, and real-world software engineering practices.
                </p>
                <p>
                  As a fresher, I emphasize writing <span className="font-semibold text-gray-900 dark:text-white">clean, efficient code</span> and building <span className="font-semibold text-gray-900 dark:text-white">scalable backend systems</span> using <span className="text-blue-600 dark:text-blue-400 font-medium">Java, Spring Boot, REST APIs, and MySQL</span>, along with a strong foundation in cloud fundamentals.
                </p>
                <p>
                  I enjoy learning new technologies, solving real-world problems, and contributing to meaningful projects. My experience includes developing <span className="font-semibold text-gray-900 dark:text-white">end-to-end applications</span>, collaborating in team environments, and constantly strengthening my technical and analytical skills.
                </p>
                <p>
                  I am also currently learning <span className="font-semibold text-purple-600 dark:text-purple-400">AI integration</span> to enhance modern applications with intelligent features.
                </p>
              </div>
            </div>

            {/* Work Preferences */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 shadow-lg border border-blue-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Work Preferences
              </h3>
              <div className="space-y-4">
                {workPreferences.map((pref, index) => (
                  <motion.div
                    key={pref.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-white dark:bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <pref.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{pref.label}</p>
                      <p className="text-base font-bold text-gray-900 dark:text-white">{pref.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-[#457b9d]/60 via-[#98c1d9]/60 to-[#a8dadc]/60 rounded-3xl blur-2xl opacity-20"></div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
className="relative rounded-3xl p-0 shadow-2xl border border-gray-200 dark:border-slate-700 fade-edges"
              >
                <img 
                  src="/about.png" 
                  alt="About Me" 
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;