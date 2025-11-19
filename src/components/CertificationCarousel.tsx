import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  organization: string;
  period: string;
  link?: string;
}

const certificationData: Certification[] = [
  { id: 'cert1', title: 'SQL Certification', organization: 'HackerRank', period: 'Jan 2025', link: 'https://hackerrank.com' },
  { id: 'cert2', title: 'Docker Foundations', organization: 'LinkedIn', period: 'Jun 2024', link: 'https://linkedin.com' },
  { id: 'cert3', title: 'JavaScript Certification', organization: 'GUVI', period: 'Aug 2023' },
  { id: 'cert4', title: 'Java Full-Stack', organization: 'Naresh I Technologies', period: 'Mar 2023' },
  { id: 'cert5', title: 'Python for Data Science', organization: 'Coursera', period: 'Jan 2023' },
  { id: 'cert6', title: 'AWS Cloud Practitioner', organization: 'Amazon Web Services', period: 'Nov 2022' },
];

const CertificationCard = ({ item }: { item: Certification }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 h-full flex flex-col">
    <div className="flex items-center mb-2">
      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
        <Award size={16} className="text-white" />
      </div>
      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h4>
    </div>
    <div className="flex-grow">
      <p className="text-green-600 dark:text-green-400 font-medium">{item.organization}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{item.period}</p>
    </div>
    {item.link && (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="self-start mt-2 text-blue-600 dark:text-blue-400 hover:underline">
        <ExternalLink size={18} />
      </a>
    )}
  </div>
);

const CertificationCarousel = () => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', containScroll: 'trimSnaps' },
    [Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  return (
    <div className="bg-gray-50 dark:bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12">
          Certifications
        </h3>
      </div>
      <div className="overflow-hidden cursor-grab" ref={emblaRef}>
        <div className="flex">
          {certificationData.map((item) => (
            <div className="flex-[0_0_90%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0 pl-4" key={item.id}>
              <CertificationCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationCarousel;