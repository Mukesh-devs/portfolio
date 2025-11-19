import React from 'react';
import ReactFlow, { Background, Controls, Edge, Node, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Coffee, Zap, Database, Server, Globe, GitBranch, Terminal, Layers, User } from 'lucide-react';

const iconMap = {
  User,
  Coffee,
  Zap,
  Database,
  Server,
  Globe,
  GitBranch,
  Terminal,
  Layers,
};

const CustomNode = ({ data }: { data: any }) => {
  const Icon = iconMap[data.icon as keyof typeof iconMap] || User;
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="flex items-center gap-3 p-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-full shadow-lg border border-white/20"
      style={{
        borderColor: data.isCentral ? data.color : 'inherit',
        color: data.isCentral ? data.color : 'inherit',
      }}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: data.color }}>
        <Icon size={16} className="text-white" />
      </div>
      <span className="font-semibold text-gray-900 dark:text-white pr-2">{data.label}</span>
    </motion.div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  // Central Node
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Mukesh MK', icon: 'User', color: '#6366F1', isCentral: true }, type: 'custom' },

  // Categories
  { id: '2', position: { x: -250, y: -150 }, data: { label: 'Languages', icon: 'Zap', color: '#3B82F6' }, type: 'custom' },
  { id: '3', position: { x: 250, y: -150 }, data: { label: 'Backend', icon: 'Server', color: '#10B981' }, type: 'custom' },
  { id: '4', position: { x: -250, y: 150 }, data: { label: 'Databases', icon: 'Database', color: '#8B5CF6' }, type: 'custom' },
  { id: '5', position: { x: 250, y: 150 }, data: { label: 'DevOps & Tools', icon: 'Terminal', color: '#F97316' }, type: 'custom' },
  
  // Skills
  { id: '101', position: { x: -450, y: -250 }, data: { label: 'Java', icon: 'Coffee', color: '#EF4444' }, type: 'custom' },
  { id: '102', position: { x: -350, y: -300 }, data: { label: 'Python', icon: 'Zap', color: '#2563EB' }, type: 'custom' },

  { id: '201', position: { x: 450, y: -250 }, data: { label: 'Spring Boot', icon: 'Layers', color: '#22C55E' }, type: 'custom' },
  { id: '202', position: { x: 350, y: -300 }, data: { label: 'REST APIs', icon: 'Globe', color: '#06B6D4' }, type: 'custom' },
  
  { id: '301', position: { x: -450, y: 250 }, data: { label: 'MySQL', icon: 'Database', color: '#4F46E5' }, type: 'custom' },
  { id: '302', position: { x: -350, y: 300 }, data: { label: 'JPA/Hibernate', icon: 'Layers', color: '#D946EF' }, type: 'custom' },

  { id: '401', position: { x: 450, y: 250 }, data: { label: 'Docker', icon: 'Server', color: '#3B82F6' }, type: 'custom' },
  { id: '402', position: { x: 350, y: 300 }, data: { label: 'Git', icon: 'GitBranch', color: '#EAB308' }, type: 'custom' },
];

const initialEdges: Edge[] = [
  // To Categories
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e1-4', source: '1', target: '4', animated: true },
  { id: 'e1-5', source: '1', target: '5', animated: true },
  // To Skills
  { id: 'e2-101', source: '2', target: '101' },
  { id: 'e2-102', source: '2', target: '102' },
  { id: 'e3-201', source: '3', target: '201' },
  { id: 'e3-202', source: '3', target: '202' },
  { id: 'e4-301', source: '4', target: '301' },
  { id: 'e4-302', source: '4', target: '302' },
  { id: 'e5-401', source: '5', target: '401' },
  { id: 'e5-402', source: '5', target: '402' },
];


const SkillGraph: React.FC = () => {
  return (
    <div className="w-full h-[600px] bg-gray-50 dark:bg-slate-800 rounded-2xl p-4">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
      >
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default SkillGraph;