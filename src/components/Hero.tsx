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
  const [displayText, setDisplayText] = React.useState('');
  const fullText = 'Software Engineer';
  
  React.useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeText = () => {
      if (!isDeleting && currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(typeText, 100);
      } else if (!isDeleting && currentIndex > fullText.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          typeText();
        }, 2000); // 2 second pause when complete
      } else if (isDeleting && currentIndex > 0) {
        currentIndex--;
        setDisplayText(fullText.slice(0, currentIndex));
        timeoutId = setTimeout(typeText, 50);
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        timeoutId = setTimeout(typeText, 500);
      }
    };

    typeText();

    return () => clearTimeout(timeoutId);
  }, []);

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-slate-900"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-[#e29578]/20 dark:bg-[#e29578]/10 blur-3xl"
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
          className="absolute w-[600px] h-[600px] rounded-full bg-[#e29578]/20 dark:bg-[#e29578]/10 blur-3xl"
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
          className="absolute w-[450px] h-[450px] rounded-full bg-pink-200/20 dark:bg-pink-500/10 blur-3xl"
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
        <motion.div
          className="absolute w-[550px] h-[550px] rounded-full bg-indigo-200/20 dark:bg-indigo-500/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -150, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '60%', right: '20%' }}
        />
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-40 max-w-6xl mx-auto p-8">
        {/* Left Column: Profile Info */}
        <div className="flex flex-col items-center text-center">
          <AnimatePresence>
            {!isScrolled && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div layoutId="profile-picture" transition={transition} className="w-64 h-80 md:w-96 md:h-[28rem] mx-auto mb-6 relative">
                  {/* Curved bottom shape */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[40%] bg-gradient-to-br from-[#457b9d] to-[#98c1d9] rounded-t-full shadow-xl"></div>
                  
                  {/* Profile photo overlapping the curve */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[85%]">
                    <img 
                      src="/mukesh-final.png" 
                      alt="Mukesh MK" 
                      className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {!isScrolled && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div layoutId="profile-name" transition={transition}>
                  <h1 className="text-4xl md:text-5xl font-bold text-[#4a4e69] dark:text-white">
                    Mukesh MK
                  </h1>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.h2
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#e07a5f] to-[#023047] bg-clip-text text-transparent mt-2 min-h-[2.5rem] md:min-h-[3rem] text-center"
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block ml-1"
            >
              |
            </motion.span>
          </motion.h2>

          <div className="flex justify-center gap-4 mt-6">
            {socialLinks.map((link, index) => (
              <motion.a 
                key={link.label} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -5, rotate: 5 }} 
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 dark:text-gray-400 hover:text-[#457b9d] dark:hover:text-[#98c1d9]"
              >
                <link.icon/>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Column: Bio and Actions */}
        <div className="text-center md:text-left">
          {/* Zoho Training Logo at Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src="/zohoLogo.svg" 
              alt="Zoho Training" 
              className="h-16 md:h-20 object-contain opacity-90 hover:opacity-100 transition-opacity drop-shadow-lg"
            />
          </motion.div>

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
            <motion.a href="/resume.pdf" download="Mukesh_MK_Resume.pdf" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 border-2 border-[#457b9d] text-[#457b9d] dark:text-[#98c1d9] rounded-lg font-semibold hover:bg-[#457b9d] hover:text-white dark:hover:bg-[#457b9d] dark:hover:text-white transition-colors flex items-center justify-center gap-2">
              <Download size={20} />
              Download Resume
            </motion.a>
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
              className="px-8 py-3 bg-gradient-to-r from-[#457b9d] to-[#98c1d9] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Get In Touch
            </motion.button>
          </div>

          {/* Oracle Certification Badges at Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-wrap gap-6 justify-center items-center"
          >
            <motion.div 
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.08, y: -3, rotate: 2 }} 
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <img 
                src="/genAIBadge.jpg" 
                alt="Oracle GenAI Certification" 
                className="h-20 md:h-24 w-auto object-contain drop-shadow-lg transition-all duration-300"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.7, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.08, y: -3, rotate: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <img 
                src="/AwsBadge.jpg" 
                alt="AWS Certification" 
                className="h-20 md:h-24 w-auto object-contain drop-shadow-lg transition-all duration-300"
              />
            </motion.div>
          </motion.div>
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