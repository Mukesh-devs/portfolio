import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building2, RotateCcw, ChevronRight, Info } from 'lucide-react';
import certificationsData from '../data/certifications.json';

interface Certification {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  credentialLink: string;
  issuer: string;
  issueDate: string;
  skills: string[];
  'highlight skill': string[];
}

const certifications: Certification[] = certificationsData as Certification[];

const CertificationCard = ({ cert, isCentered }: { cert: Certification; isCentered: boolean }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex-shrink-0 perspective-1000 cursor-pointer snap-center mx-auto"
      style={{
        width: '90vw',
        maxWidth: '380px',
        minHeight: '440px',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => !isFlipped && setIsFlipped(true)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d", minHeight: '440px' }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700 flex flex-col"
          style={{ backfaceVisibility: "hidden", minHeight: '440px' }}
          whileHover={{ y: -5, boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)" }}
        >
          {/* Brand Image - 30% */}
          <div className="relative h-[30%] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center overflow-hidden">
            <motion.img
              src={cert.imagePath}
              alt={cert.name}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered && !isFlipped ? 1.08 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content - 70% */}
          <div className="flex-1 p-5 flex flex-col relative overflow-hidden">
            {/* Colorful gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 opacity-60" />
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-3">
                {cert.name}
              </h3>

              {/* Brand name and Date on same line */}
              <div className="flex items-center justify-between gap-2 text-sm mb-4 pb-3 border-b border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">{cert.issuer}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-xs">{cert.issueDate}</span>
                </div>
              </div>

              {/* Highlight Skills */}
              <div className="mb-4">
                {/* <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Highlight Skills</p> */}
                <div className="flex flex-wrap gap-2">
                  {cert['highlight skill'].map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border border-blue-200 dark:border-blue-700 rounded-lg px-3 py-2 text-center"
                    >
                      <span className="text-xs font-bold text-blue-800 dark:text-blue-200">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Credential Link */}
              <motion.a
                href={cert.credentialLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300"
              >
                View Credential
                <ExternalLink className="w-4 h-4" />
              </motion.a>

              {/* Click to view more - bottom center with info icon */}
              <div className="mt-auto pt-3 flex justify-center">
                <motion.div
                  className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-300 dark:border-slate-600"
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span className="font-medium">Click to view more</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-slate-700"
          style={{ 
            backfaceVisibility: "hidden",
            rotateY: 180
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(false);
          }}
        >
          <div className="h-full p-6 flex flex-col text-white overflow-y-auto">
            {/* Back Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium opacity-90">Certificate ID</p>
                  <p className="font-mono text-xs font-bold">{cert.id}</p>
                </div>
              </div>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h4 className="text-sm font-bold mb-2 opacity-90">Description</h4>
              <p className="text-xs leading-relaxed opacity-95 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                {cert.description}
              </p>
            </div>

            {/* Skills Obtained */}
            <div className="flex-1">
              <h4 className="text-sm font-bold mb-3 opacity-90">Skills Obtained</h4>
              <div className="grid grid-cols-2 gap-2">
                {cert.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-2 py-1.5 rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                    <span className="text-xs font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Issuer Badge */}
            <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span className="font-semibold">{cert.issuer}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">{cert.issueDate}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Certificates = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = React.useState(true);
  const autoScrollTimeout = React.useRef<NodeJS.Timeout>();
  const isScrollingRef = React.useRef(false);

  const totalCerts = certifications.length;

  const scrollToIndex = (index: number, smooth = true) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isScrollingRef.current) return;

    isScrollingRef.current = true;
    const cardWidth = scrollContainer.offsetWidth > 768 ? 380 : scrollContainer.offsetWidth * 0.9;
    const gap = 24;
    const containerWidth = scrollContainer.offsetWidth;
    const centerOffset = (containerWidth - cardWidth) / 2;
    const scrollPosition = index * (cardWidth + gap) - centerOffset + (cardWidth / 2);
    
    scrollContainer.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: smooth ? 'smooth' : 'auto'
    });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  };

  // Auto-scroll effect
  React.useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % totalCerts;
        scrollToIndex(next);
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoScrolling, totalCerts]);

  // Handle wheel scroll - one card at a time
  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let lastScrollTime = 0;
    const scrollDelay = 600; // Minimum time between scrolls in ms

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollTime < scrollDelay) {
        return; // Ignore scroll if within delay period
      }

      lastScrollTime = now;
      setIsAutoScrolling(false);

      if (autoScrollTimeout.current) {
        clearTimeout(autoScrollTimeout.current);
      }

      // Determine scroll direction
      if (e.deltaY > 0 || e.deltaX > 0) {
        // Scroll right/down - next card
        setCurrentIndex((prev) => {
          const next = Math.min(prev + 1, totalCerts - 1);
          scrollToIndex(next);
          return next;
        });
      } else if (e.deltaY < 0 || e.deltaX < 0) {
        // Scroll left/up - previous card
        setCurrentIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          scrollToIndex(next);
          return next;
        });
      }

      // Resume auto-scroll after 5 seconds
      autoScrollTimeout.current = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 5000);
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
      if (autoScrollTimeout.current) {
        clearTimeout(autoScrollTimeout.current);
      }
    };
  }, [totalCerts]);

  // Handle touch/mouse drag scroll
  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsAutoScrolling(false);
      
      if (autoScrollTimeout.current) {
        clearTimeout(autoScrollTimeout.current);
      }

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const cardWidth = scrollContainer.offsetWidth > 768 ? 380 : scrollContainer.offsetWidth * 0.9;
        const gap = 24;
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = scrollContainer.offsetWidth;
        const centerOffset = (containerWidth - cardWidth) / 2;
        
        const centerPosition = scrollLeft + centerOffset;
        const nearestIndex = Math.round(centerPosition / (cardWidth + gap));
        const clampedIndex = Math.max(0, Math.min(nearestIndex, totalCerts - 1));
        
        setCurrentIndex(clampedIndex);
        scrollToIndex(clampedIndex);

        autoScrollTimeout.current = setTimeout(() => {
          setIsAutoScrolling(true);
        }, 5000);
      }, 150);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [totalCerts]);

  return (
    <section id="certificates" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-purple-200/20 dark:bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -120, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '5%', left: '20%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-pink-200/20 dark:bg-pink-500/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 90, 0],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '10%', right: '15%' }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Professional certifications validating my expertise
          </p>
        </motion.div>

        {/* Scrollable carousel container */}
        <div className="relative overflow-hidden py-16">
          <div 
            ref={scrollRef}
            className="scroll-container flex gap-6 overflow-x-auto pb-8 scroll-smooth px-4"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
              paddingLeft: 'calc(50vw - 190px)',
              paddingRight: 'calc(50vw - 190px)',
            }}
          >
            {certifications.map((cert, index) => (
              <CertificationCard 
                key={cert.id}
                cert={cert} 
                isCentered={index === currentIndex}
              />
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {certifications.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoScrolling(false);
                scrollToIndex(index);
                
                // Resume auto-scroll after 5 seconds
                if (autoScrollTimeout.current) {
                  clearTimeout(autoScrollTimeout.current);
                }
                autoScrollTimeout.current = setTimeout(() => {
                  setIsAutoScrolling(true);
                }, 5000);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 dark:bg-blue-400 w-8' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Hide scrollbar for webkit browsers */}
        <style>{`
          #certificates div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Certificates;