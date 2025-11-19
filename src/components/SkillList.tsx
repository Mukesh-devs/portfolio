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

interface SkillListProps {
  data: SkillCategory[];
}

const SkillList: React.FC<SkillListProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      {data.map((categoryData, index) => (
        <motion.div
          key={categoryData.category}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{categoryData.category}</h4>
          <div className="space-y-4">
            {categoryData.skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <motion.div
                    className="h-2.5 rounded-full"
                    style={{ backgroundColor: categoryData.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillList;