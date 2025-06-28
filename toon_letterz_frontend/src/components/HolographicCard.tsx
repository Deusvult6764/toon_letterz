import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tiltEnabled?: boolean;
}

const HolographicCard: React.FC<HolographicCardProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  tiltEnabled = true 
}) => {
  // Check if device is mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`
        relative backdrop-blur-2xl bg-gradient-to-br from-light-surface/40 via-light-surface/30 to-light-surface/40 
        dark:from-dark-surface/40 dark:via-dark-surface/30 dark:to-dark-surface/40
        border border-gradient-to-br from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6
        shadow-2xl hover:shadow-brand-primary-500/20 transition-all duration-500
        before:absolute before:inset-0 before:rounded-2xl sm:before:rounded-3xl before:p-[1px]
        before:bg-gradient-to-br before:from-brand-primary-500/30 before:via-brand-secondary-500/30 before:to-brand-accent-500/30
        before:mask-composite before:-z-10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
        overflow-hidden
        ${className}
      `}
      whileHover={isMobile ? {} : { y: -8, rotateX: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Holographic shimmer effect - reduced on mobile */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 hover:opacity-100 transition-opacity duration-700 ${!isMobile ? 'animate-shimmer' : ''}`} />
      
      {/* Inner glow with brand colors */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {/* Prismatic edge effect - desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary-500/10 via-brand-secondary-500/10 to-brand-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );

  // Disable tilt on mobile for better performance and touch experience
  if (tiltEnabled && !isMobile) {
    return (
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        perspective={1000}
        scale={1.02}
        transitionSpeed={1500}
        gyroscope={true}
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor="#ffffff"
        glarePosition="all"
      >
        {cardContent}
      </Tilt>
    );
  }

  return cardContent;
};

export default HolographicCard;