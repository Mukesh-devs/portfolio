import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import EducationTimeline from './EducationTimeline'; 
import CertificationGrid from './CertificationGrid'; // Import the new grid component

// --- Data ---
interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  type: 'experience';
  skills?: string[];
  link?: string;
}

const experienceData: TimelineItem[] = [
    { id: 'exp1', title: 'Graduate Studies - Incubation Trainee', organization: 'ZOHO', location: 'Chennai', period: 'Feb 2025 - Jun 2025', description: '6-month intensive training in full-stack development, software engineering practices, and real-world problem solving.', type: 'experience', skills: ['Full-Stack Development', 'Software Engineering', 'Problem Solving'] },
    { id: 'exp2', title: 'Technical Careers Program', organization: 'TNS India Foundation (with Capgemini)', location: 'India', period: 'Dec 2023 - May 2024', description: 'Comprehensive training in SQL, Core Java 8, JPA with Hibernate, Git, Spring Boot, HTML5, CSS3, JavaScript and soft skills.', type: 'experience', skills: ['Java', 'Spring Boot', 'SQL', 'JavaScript', 'HTML5', 'CSS3'] },
];

// --- Reusable Components ---

const TimelineCard: React.FC<{ item: TimelineItem; isMobile?: boolean }> = ({ item, isMobile = false }) => {
  const Icon = MapPin;
  const cardClasses = isMobile ? 'w-full' : 'flex-shrink-0 w-80';

  return (
    <div className={`${cardClasses} bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-xl shadow-lg p-6 relative`}>
      <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
        <Icon size={16} className="text-white" />
      </div>
      <div className="mt-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white flex-1">{item.title}</h4>
          {item.link && (
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href={item.link} target="_blank" rel="noopener noreferrer" className="ml-2 p-1 text-[#457b9d] dark:text-[#98c1d9] hover:bg-[#e8f2f7] dark:hover:bg-[#457b9d]/20 rounded">
              <ExternalLink size={16} />
            </motion.a>
          )}
        </div>
        <p className="text-purple-600 dark:text-purple-400 font-medium mb-1">{item.organization}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{item.period} • {item.location}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.description}</p>
        {item.skills && (
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span key={skill} className="px-2 py-1 text-xs bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200 rounded-full">{skill}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const HorizontalScrollSection: React.FC<{ title: string; data: TimelineItem[], bgColor?: string, bgImage?: string }> = ({ title, data, bgColor, bgImage }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const horizontalContentRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  
  useLayoutEffect(() => {
    const checkScreenSize = () => {
      const isDesktopView = window.innerWidth > 768;
      const contentWidth = horizontalContentRef.current?.scrollWidth || 0;
      setIsDesktop(isDesktopView && contentWidth > window.innerWidth);
    };
    const timer = setTimeout(checkScreenSize, 100);
    window.addEventListener('resize', checkScreenSize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end']
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -(horizontalContentRef.current?.scrollWidth || 0 - window.innerWidth)]);
  const sectionHeight = isDesktop ? `${horizontalContentRef.current?.scrollWidth}px` : 'auto';

  return (
    <div ref={scrollContainerRef} className={`relative ${bgColor || ''}`} style={{ height: sectionHeight, backgroundImage: bgImage ? `url('${bgImage}')` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {bgImage && <div className="absolute inset-0 bg-black/60 z-0"></div>}
      
      {isDesktop ? (
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h3 className={`text-2xl md:text-3xl font-bold ${bgImage ? 'text-white' : 'text-gray-900 dark:text-white'} mb-12 text-center`}>{title}</h3>
          </div>
          <motion.div ref={horizontalContentRef} style={{ x }} className="flex gap-8 items-center pl-8">
            {data.map((item) => <TimelineCard key={item.id} item={item} />)}
          </motion.div>
        </div>
      ) : (
        <div className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className={`text-2xl md:text-3xl font-bold ${bgImage ? 'text-white' : 'text-gray-900 dark:text-white'} text-center`}>{title}</h3>
            <div ref={horizontalContentRef} className="flex gap-6 px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 mt-12">
              {data.map((item) => <TimelineCard key={item.id} item={item} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// Main Component
const HorizontalTimeline: React.FC = () => {
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
      
      <HorizontalScrollSection 
        title="Training & Experience" 
        data={experienceData} 
        bgImage="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto-format&fit=crop"
      />
      
      <CertificationGrid />
      
      <EducationTimeline />
    </section>
  );
};

export default HorizontalTimeline;