import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 
                 border border-brand-primary/30 backdrop-blur-xl hover:from-brand-primary/30 hover:to-brand-secondary/30
                 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-brand-accent group-hover:text-brand-primary transition-colors duration-300" />
        ) : (
          <Sun className="w-5 h-5 text-brand-warning group-hover:text-brand-secondary transition-colors duration-300" />
        )}
      </motion.div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 
                      blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </motion.button>
  );
};

export default ThemeToggle;