import React from 'react';
import { motion } from 'framer-motion';

interface GlowingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 rounded-full border touch-manipulation";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 text-white shadow-lg hover:shadow-brand-primary-500/25 border-transparent hover:shadow-2xl active:scale-95",
    secondary: "bg-gradient-to-r from-brand-accent-500 via-brand-secondary-500 to-brand-primary-500 text-white shadow-lg hover:shadow-brand-accent-500/25 border-transparent hover:shadow-2xl active:scale-95",
    outline: "border-2 border-brand-primary-500/50 text-brand-primary-500 hover:bg-brand-primary-500/10 hover:shadow-brand-primary-500/25 hover:border-brand-primary-500 hover:text-brand-primary-600 dark:hover:text-white backdrop-blur-sm bg-light-surface/20 dark:bg-dark-surface/20 active:scale-95"
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm min-h-[36px]",
    md: "px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base min-h-[40px] sm:min-h-[44px]",
    lg: "px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[44px] sm:min-h-[52px]"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled}
    >
      {/* Enhanced shimmer effect */}
      <motion.div
        className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut"
        }}
      />
      
      {/* Prismatic glow effect */}
      <div className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" 
           style={{ background: 'inherit' }} />
      
      {/* Inner highlight */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      <span className="relative z-10 drop-shadow-sm flex items-center justify-center">{children}</span>
    </motion.button>
  );
};

export default GlowingButton;