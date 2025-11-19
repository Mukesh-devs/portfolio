import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Linkedin, Github, Download, Mail,MapPin, ArrowDown } from 'lucide-react';


const LeetCodeIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
    <path d="M13.48 0L10.52 0 10.52 10.48 0 10.48 0 13.48 10.52 13.48 10.52 24 13.48 24 13.48 13.48 24 13.48 24 10.48 13.48 10.48z" />
  </svg>
);

interface HeroProps {
  isScrolled: boolean;
}

const Hero: React.FC<HeroProps> = ({ isScrolled }) => {
  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/mukeshmurugan/' },
    { icon: Github, label: 'GitHub', url: '#' },
    { icon: LeetCodeIcon, label: 'LeetCode', url: 'https://leetcode.com/u/Mukesh-mx/' },
    { icon: Mail, label: 'Email', url: 'mailto:mukesh.be25@gmail.com' },
  ];

  const transition = { type: "spring", stiffness: 200, damping: 30 };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-light-bg-start to-light-bg-end dark:from-slate-900 dark:to-gray-800"
    >
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-6xl mx-auto p-8">
        {/* Left Column: Profile Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <AnimatePresence>
            {!isScrolled && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div layoutId="profile-picture" transition={transition} className="w-32 h-32 md:w-60 md:h-60 mx-auto md:mx-0 mb-6 relative">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                      <img 
                        src="/profile-picture.png" 
                        alt="Mukesh MK" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {!isScrolled && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div layoutId="profile-name" transition={transition}>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    Mukesh MK
                  </h1>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2"
          >
            Software Engineer
          </motion.h2>

          <div className="flex justify-center md:justify-start gap-4 mt-6">
            {socialLinks.map((link) => (
              <motion.a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -3 }} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <link.icon/>
              </motion.a>
            ))}
          </div>
           <div className="mt-8 flex justify-center md:justify-start">
             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow">
                Get In Touch
             </motion.button>
          </div>
        </div>

        {/* Right Column: Bio and Actions */}
        <div className="text-center md:text-left">
           <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Innovative Computer Science graduate with expertise in building scalable applications and optimizing system performance.
          </p>
          <div className="flex flex-col items-center md:items-start gap-2 text-md text-gray-600 dark:text-gray-400 mb-8">
             <a href="mailto:mukesh.be25@gmail.com" className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Mail size={20} />
                mukesh.be25@gmail.com
              </a>
              <div className="inline-flex items-center gap-2">
                <MapPin size={20} />
                Chennai, India
              </div>
           </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.a href="/resume.pdf" download="Mukesh_MK_Resume.pdf" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors flex items-center justify-center gap-2">
              <Download size={20} />
              Download Resume
            </motion.a>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full border-2 border-gray-500 dark:border-gray-400 flex items-center justify-center"
          >
            <ArrowDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </motion.div>
        </a>
      </motion.div>

    </section>
  );
};

export default Hero;