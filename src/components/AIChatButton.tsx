import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles } from 'lucide-react';

interface AIChatButtonProps {
  onClick: () => void;
}

const AIChatButton: React.FC<AIChatButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Ask AI"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#457b9d] to-[#98c1d9] animate-ping opacity-20" />

      {/* Glow effect */}
      <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#457b9d] to-[#98c1d9] opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-300" />

      {/* Button body */}
      <span className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#457b9d] to-[#98c1d9] text-white shadow-lg shadow-[#457b9d]/25 dark:shadow-[#457b9d]/40">
        <Sparkles className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">Ask AI</span>
        <MessageSquare className="w-5 h-5 sm:hidden" />
      </span>
    </motion.button>
  );
};

export default AIChatButton;
