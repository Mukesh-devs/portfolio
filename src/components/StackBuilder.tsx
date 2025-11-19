import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Code, Database, Server, Layers } from 'lucide-react';

interface Tech {
  id: string;
  name: string;
  type: 'Frontend' | 'Backend' | 'Database';
  icon: React.ElementType;
}

const allTechs: Tech[] = [
  { id: 'react', name: 'React', type: 'Frontend', icon: Code },
  { id: 'java', name: 'Java', type: 'Backend', icon: Server },
  { id: 'spring', name: 'Spring Boot', type: 'Backend', icon: Layers },
  { id: 'mysql', name: 'MySQL', type: 'Database', icon: Database },
];

const TechBlock = ({ tech, isOverlay = false }: { tech: Tech; isOverlay?: boolean }) => {
  const typeColors = {
    Frontend: 'bg-blue-500',
    Backend: 'bg-green-500',
    Database: 'bg-purple-500',
  };
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg text-white shadow-md ${typeColors[tech.type]} ${isOverlay ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <tech.icon size={20} />
      <span className="font-semibold">{tech.name}</span>
    </div>
  );
};

const SortableTechBlock = ({ tech }: { tech: Tech }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tech.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TechBlock tech={tech} />
    </div>
  );
};

const getStackType = (stack: Tech[]) => {
  const types = new Set(stack.map(t => t.type));
  if (types.has('Frontend') && types.has('Backend') && types.has('Database')) return 'Full-Stack Web App';
  if (types.has('Backend') && types.has('Database')) return 'RESTful API with Database';
  if (types.has('Backend')) return 'Standalone Backend Service';
  if (types.has('Frontend')) return 'Static Frontend Site';
  return 'Your Custom Stack';
};


const StackBuilder = () => {
  const [techPalette, setTechPalette] = useState<Tech[]>(allTechs);
  const [currentStack, setCurrentStack] = useState<Tech[]>([]);
  const [activeTech, setActiveTech] = useState<Tech | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const tech = allTechs.find(t => t.id === active.id);
    if (tech) setActiveTech(tech);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && over.id === 'stack-area' && !currentStack.find(t => t.id === active.id)) {
      const techToAdd = techPalette.find(t => t.id === active.id);
      if (techToAdd) {
        setCurrentStack(prev => [...prev, techToAdd]);
      }
    }
    setActiveTech(null);
  };
  
  const handleSortEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCurrentStack((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-gray-50 dark:bg-slate-800 rounded-2xl">
        {/* Tech Palette */}
        <div className="md:col-span-1">
          <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Tech Palette</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Drag blocks to build your stack.</p>
          <div className="space-y-3">
            {techPalette.map(tech => (
              <SortableTechBlock key={tech.id} tech={tech} />
            ))}
          </div>
        </div>

        {/* Stack Area & Preview */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Your Stack</h4>
              <div id="stack-area" className="p-4 bg-gray-200 dark:bg-slate-700 rounded-lg min-h-[200px]">
                <DndContext onDragEnd={handleSortEnd}>
                  <SortableContext items={currentStack.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3">
                      {currentStack.map(tech => (
                        <SortableTechBlock key={tech.id} tech={tech} />
                      ))}
                      {currentStack.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 pt-16">Drop here!</p>}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">App Preview</h4>
              <motion.div
                key={currentStack.length}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-white dark:bg-slate-900 rounded-lg min-h-[200px] flex flex-col justify-center items-center text-center shadow-lg"
              >
                <h5 className="font-bold text-xl text-blue-600 dark:text-blue-400">{getStackType(currentStack)}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {currentStack.length > 0
                    ? `A combination of ${currentStack.map(t => t.name).join(', ')}.`
                    : 'Select technologies to see what you can build.'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <DragOverlay>{activeTech ? <TechBlock tech={activeTech} isOverlay /> : null}</DragOverlay>
    </DndContext>
  );
};

export default StackBuilder;