import React from 'react';
import { motion } from 'framer-motion';

export interface Skill {
  name: string;
  proficiency: number; // 0-100
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
  color: string;
}

interface SkillSpectrumProps {
  data: SkillCategory[];
}

const SkillSpectrum: React.FC<SkillSpectrumProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {data.map((categoryData, index) => (
        <motion.div 
          key={categoryData.category}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{categoryData.category}</h4>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-8 flex overflow-hidden">
            {categoryData.skills.map((skill) => (
              <div
                key={skill.name}
                className="h-full group relative flex items-center justify-center"
                style={{ 
                  width: `${100 / categoryData.skills.length}%`,
                  backgroundColor: categoryData.color,
                  opacity: 0.2 + (skill.proficiency / 100) * 0.8,
                }}
              >
                <span className="text-white font-bold text-sm mix-blend-difference">{skill.name}</span>
                <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {skill.name}: {skill.proficiency}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillSpectrum;