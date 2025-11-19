import React from 'react';
import { motion } from 'framer-motion';
// Importing real tech logos from react-icons
import { 
  FaJava, 
  FaPython, 
  FaReact, 
  FaDocker, 
  FaGitAlt,
  FaHtml5,
  FaCss3Alt
} from 'react-icons/fa';
import { 
  SiSpringboot, 
  SiMysql, 
  SiTailwindcss,
  SiJavascript
} from 'react-icons/si';

const backendSkills = [
  { name: 'Java', icon: FaJava, color: '#E52F24' },
  { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
];

const frontendSkills = [
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
];

const databaseToolsSkills = [
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED' },
  { name: 'Git', icon: FaGitAlt, color: '#F05032' },
];

const SkillItem = ({ name, icon: Icon, color }: { name: string; icon: React.ElementType; color: string }) => (
    <motion.div
        whileHover={{ scale: 1.1, y: -5 }}
        className="flex flex-col items-center gap-2 text-center"
    >
        <Icon className="w-12 h-12" style={{ color }} />
        <p className="font-semibold text-sm text-gray-800 dark:text-white">{name}</p>
    </motion.div>
);

const SkillCategory = ({ title, skills }: { title: string; skills: any[] }) => (
    <div>
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">{title}</h4>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12">
            {skills.map((skill, index) => (
                <SkillItem key={index} {...skill} />
            ))}
        </div>
    </div>
);

const CategorizedSkillCloud = () => {
  return (
    <div className="space-y-12">
      <SkillCategory title="Backend" skills={backendSkills} />
      <SkillCategory title="Frontend" skills={frontendSkills} />
      <SkillCategory title="Databases & Tools" skills={databaseToolsSkills} />
    </div>
  );
};

export default CategorizedSkillCloud;