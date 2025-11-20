import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, User, Linkedin, Github, Share2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const LeetCodeIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
    <path d="M13.48 0L10.52 0 10.52 10.48 0 10.48 0 13.48 10.52 13.48 10.52 24 13.48 24 13.48 13.48 24 13.48 24 10.48 13.48 10.48z" />
  </svg>
);

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, isScrolled }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isShareOpen, setIsShareOpen] = React.useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Training & Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact Me' },
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
    { icon: Github, label: 'GitHub', url: '#' },
    { icon: LeetCodeIcon, label: 'LeetCode', url: '#' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };
  
  const transition = { type: "spring", stiffness: 200, damping: 30 };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {isScrolled && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.div layoutId="profile-picture" transition={transition} className="w-10 h-10">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                        <img src="/profile-picture.png" alt="Mukesh MK" className="w-full h-full object-cover rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isScrolled && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div layoutId="profile-name" transition={transition}>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">Mukesh MK</span>
                    </motion.div>
                 </motion.div>
              )}
            </AnimatePresence>
             {/* {!isScrolled && <div className="text-lg font-bold text-gray-900 dark:text-white">Portfolio</div>} */}
          </div>

          {/* Desktop Navigation & Links */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <motion.button key={item.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scrollToSection(item.id)} className={`text-sm font-medium transition-colors ${activeSection === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <div className="flex items-center gap-2 border-l border-gray-200 dark:border-slate-700 pl-6">
               <motion.div onHoverStart={() => setIsShareOpen(true)} onHoverEnd={() => setIsShareOpen(false)} className="relative">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-lg bg-gray-100/50 dark:bg-slate-800/50 text-gray-700 dark:text-gray-300">
                  <Share2 size={20} />
                </motion.button>
                <AnimatePresence>
                  {isShareOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-2 flex flex-col gap-1">
                      {socialLinks.map(link => (
                        <a href={link.url} key={link.label} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md">
                          <link.icon />
                          {link.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100/50 dark:bg-slate-800/50 text-gray-700 dark:text-gray-300">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            </div>
          </div>
          
          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100/50 dark:bg-slate-800/50 text-gray-700 dark:text-gray-300">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg bg-gray-100/50 dark:bg-slate-800/50 text-gray-700 dark:text-gray-300">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden py-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            {navItems.map((item) => (
              <motion.button key={item.id} whileHover={{ x: 5 }} onClick={() => scrollToSection(item.id)} className={`block w-full text-left py-2 px-4 rounded-lg text-sm font-medium transition-colors ${activeSection === item.id ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
                {item.label}
              </motion.button>
            ))}
             <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-700 flex justify-center gap-4">
                {socialLinks.map(link => (
                  <a href={link.url} key={link.label} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
                    <link.icon />
                  </a>
                ))}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;