import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaJava, 
  FaPython, 
  FaDocker, 
  FaGitAlt,
  FaLinux,
  FaNetworkWired,
  FaAws,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs
} from 'react-icons/fa';
import { 
  SiSpringboot, 
  SiMysql, 
  SiPostman,
  SiHibernate,
  SiGooglecloud,
  SiTailwindcss
} from 'react-icons/si';
import { 
  BiNetworkChart,
  BiCloudUpload 
} from 'react-icons/bi';
import { 
  MdSecurity
} from 'react-icons/md';

const skillCategories = [
  // {
  //   id: 'frontend',
  //   title: ' Frontend',
  //   skills: [
  //     // { 
  //     //   name: 'React', 
  //     //   icon: FaReact, 
  //     //   color: '#61DAFB',
  //     //   description: 'Building dynamic user interfaces with hooks and component architecture'
  //     // },
      
  //     { 
  //       name: 'HTML5', 
  //       icon: FaHtml5, 
  //       color: '#E34F26',
  //       description: 'Semantic markup and accessibility best practices'
  //     },
  //     { 
  //       name: 'CSS3', 
  //       icon: FaCss3Alt, 
  //       color: '#1572B6',
  //       description: 'Responsive layouts, animations, and modern styling'
  //     },
  //     { 
  //       name: 'JavaScript', 
  //       icon: FaJs, 
  //       color: '#F7DF1E',
  //       description: 'Modern ES6+ features'
  //     }
  //     // { 
  //     //   name: 'Tailwind CSS', 
  //     //   icon: SiTailwindcss, 
  //     //   color: '#06B6D4',
  //     //   description: 'Utility-first CSS framework for rapid UI development'
  //     // },
  //   ]
  // },
  {
    id: 'backend',
    title: ' Backend',
    skills: [
      { 
        name: 'Java', 
        icon: FaJava, 
        color: '#E52F24',
        description: 'Core language for enterprise backend development(OOP, Data Structures, Algorithms)'
      },
      { 
        name: 'Python', 
        icon: FaPython, 
        color: '#3776AB',
        description: 'Scripting, automation, backend services, and Generative AI (LLMs, embeddings)'
      },
      { 
        name: 'Spring Boot', 
        icon: SiSpringboot, 
        color: '#6DB33F',
        description: 'Building production-ready microservices and REST APIs'
      },
      { 
        name: 'JPA / Hibernate', 
        icon: SiHibernate, 
        color: '#59666C',
        description: 'ORM for database operations and entity management'
      },
      { 
        name: 'RESTful APIs', 
        icon: BiNetworkChart, 
        color: '#4CAF50',
        description: 'Designing and implementing scalable web services'
      },
      { 
        name: 'MySQL', 
        icon: SiMysql, 
        color: '#4479A1',
        description: 'Relational database design, queries, and optimization'
      },
    ]
  },
  {
    id: 'cloud',
    title: ' Cloud & infrastructure',
    skills: [
      { 
        name: 'AWS', 
        icon: FaAws, 
        color: '#FF9900',
        description: 'EC2, S3, Lambda, and core AWS services'
      },
      { 
        name: 'Google Cloud', 
        icon: SiGooglecloud, 
        color: '#4285F4',
        description: 'GCP fundamentals and cloud deployment'
      },
      { 
        name: 'Cloud Networking', 
        icon: BiCloudUpload, 
        color: '#0088CC',
        description: 'VPC, subnets, load balancers, and security groups'
      },
      { 
        name: 'IAM', 
        icon: MdSecurity, 
        color: '#FF6B6B',
        description: 'Identity and access management for cloud resources'
      },
      { 
        name: 'Linux', 
        icon: FaLinux, 
        color: '#FCC624',
        description: 'System administration and server configuration'
      },
      { 
        name: 'Networking', 
        icon: FaNetworkWired, 
        color: '#0088CC',
        description: 'OSI model, TCP/IP, subnetting, and troubleshooting'
      }
    ]
  },
  {
    id: 'devops',
    title: ' DevOps',
    skills: [
      { 
        name: 'Docker', 
        icon: FaDocker, 
        color: '#2496ED',
        description: 'Containerization and deployment workflows'
      },
      { 
        name: 'Git', 
        icon: FaGitAlt, 
        color: '#F05032',
        description: 'Version control and collaborative development'
      },
      { 
        name: 'Postman', 
        icon: SiPostman, 
        color: '#FF6C37',
        description: 'API testing, documentation, and automation'
      }
    ]
  },
];

const SkillCard = ({ name, icon: Icon, color, description }: { 
  name: string; 
  icon: React.ElementType; 
  color: string; 
  description: string;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: `0 20px 40px ${color}30`,
        borderColor: color
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white dark:bg-slate-800 rounded-xl p-5 border-2 border-gray-200 dark:border-slate-700 transition-all duration-300 cursor-pointer relative overflow-hidden"
      style={{
        background: isHovered 
          ? `linear-gradient(135deg, ${color}08, transparent)` 
          : undefined
      }}
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ 
          opacity: isHovered ? 0.1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`
        }}
      />
      
      <div className="flex items-start gap-3 relative z-10">
        <motion.div 
          className="p-2.5 rounded-lg flex-shrink-0"
          animate={{
            backgroundColor: isHovered ? color : `${color}20`,
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <motion.div
            animate={{
              color: isHovered ? '#ffffff' : color,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-7 h-7" />
          </motion.div>
        </motion.div>
        <div className="flex-1">
          <motion.h5 
            className="font-bold text-base mb-1.5"
            style={{
              color: isHovered ? color : undefined
            }}
            animate={{
              scale: isHovered ? 1.02 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-gray-900 dark:text-white" style={{ color: isHovered ? color : undefined }}>
              {name}
            </span>
          </motion.h5>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ 
          x: isHovered ? '100%' : '-100%',
          opacity: isHovered ? 0.3 : 0
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
        }}
      />
    </motion.div>
  );
};

const SkillCategory = ({ category }: { category: typeof skillCategories[0] }) => (
  <div className="mb-8">
    <motion.h3
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-2xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2"
    >
      <span>{category.title}</span>
    </motion.h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {category.skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          <SkillCard {...skill} />
        </motion.div>
      ))}
    </div>
  </div>
);

const CategorizedSkillCloud = () => {
  return (
    <div className="w-full space-y-6">
      {skillCategories.map((category) => (
        <SkillCategory key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategorizedSkillCloud;