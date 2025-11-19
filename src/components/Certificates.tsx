import React from 'react';
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
    { id: 'cert3', title: 'JavaScript Certification', organization: 'GUVI', period: 'Aug 2023',  },
    { id: 'cert4', title: 'DevOps', organization: 'GUVI', period: 'Mar 2023' },
    { id: 'cert5', title: 'Data Analytics with Python', organization: 'IBM', period: 'Jan 2023' },
    { id: 'cert6', title: 'Cloud Essentials', organization: 'Veranda', period: 'Nov 2022' },
];

const CertificationCard = ({ item }: { item: Certification }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 h-full flex flex-col"
    >
        <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Award size={20} className="text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h4>
        </div>
        <div className="flex-grow">
            <p className="text-green-600 dark:text-green-400 font-medium">{item.organization}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.period}</p>
        </div>
        {item.link && (
            <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start mt-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
            >
                View Credential <ExternalLink size={16} />
            </a>
        )}
    </motion.div>
);

const Certificates = () => {
  return (
    <section id="certificates" className="py-20 bg-gray-100 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                Certificates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificationData.map((item) => (
                    <CertificationCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    </section>
  );
};

export default Certificates;