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
  const baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 rounded-2xl border touch-manipulation tracking-wide shadow-lg";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 text-white shadow-2xl hover:shadow-brand-primary-500/30 border-transparent hover:shadow-3xl active:scale-95 hover:scale-105",
    secondary: "bg-gradient-to-r from-brand-accent-500 via-brand-secondary-500 to-brand-primary-500 text-white shadow-2xl hover:shadow-brand-accent-500/30 border-transparent hover:shadow-3xl active:scale-95 hover:scale-105",
    outline: "border-2 border-brand-primary-500/50 text-brand-primary-500 hover:bg-brand-primary-500/10 hover:shadow-2xl hover:shadow-brand-primary-500/20 hover:border-brand-primary-500 hover:text-brand-primary-600 backdrop-blur-xl bg-light-surface/20 active:scale-95 hover:scale-105"
  };

  const sizeClasses = {
    sm: "px-4 py-3 text-sm min-h-[40px]",
    md: "px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base min-h-[44px] sm:min-h-[48px]",
    lg: "px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg min-h-[48px] sm:min-h-[56px]"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      disabled={disabled}
    >
      {/* Enhanced multi-layer shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary shimmer for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        initial={{ x: '100%' }}
        animate={{ x: '-200%' }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut"
        }}
      />
      
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" 
           style={{ background: 'inherit' }} />
      
      {/* Multi-layer inner highlight */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/10 to-white/30 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content with enhanced styling */}
      <span className="relative z-10 drop-shadow-lg flex items-center justify-center font-bold">{children}</span>
      
      {/* Pulse effect for primary buttons */}
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-primary-500/50 via-brand-secondary-500/50 to-brand-accent-500/50"
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  );
};

export default GlowingButton;