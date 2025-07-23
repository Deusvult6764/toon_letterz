import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tiltEnabled?: boolean;
  id?: string;
}

const HolographicCard: React.FC<HolographicCardProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  tiltEnabled = true,
  id
}) => {
  // Check if device is mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const cardContent = (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`
        relative backdrop-blur-3xl bg-gradient-to-br from-light-surface/60 via-light-surface/40 to-light-surface/60 
        border border-gradient-to-br from-brand-primary-500/30 via-brand-secondary-500/30 to-brand-accent-500/30 rounded-3xl p-6 sm:p-8
        shadow-2xl hover:shadow-brand-primary-500/20 transition-all duration-500
        before:absolute before:inset-0 before:rounded-3xl before:p-[2px]
        before:bg-gradient-to-br before:from-brand-primary-500/40 before:via-brand-secondary-500/40 before:to-brand-accent-500/40
        before:mask-composite before:-z-10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
        overflow-hidden group
        ${className}
      `}
      whileHover={isMobile ? {} : { y: -10, rotateX: 2, rotateY: 2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Enhanced holographic shimmer effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
      />
      
      {/* Multi-layer inner glow with brand colors */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tl from-brand-accent-500/5 via-brand-warning-500/5 to-brand-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Prismatic edge effect - enhanced for desktop */}
      {!isMobile && (
        <>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-primary-500/10 via-brand-secondary-500/10 to-brand-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          <motion.div 
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            style={{
              background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(59,130,246,0.1) 60deg, transparent 120deg, rgba(168,85,247,0.1) 180deg, transparent 240deg, rgba(34,211,238,0.1) 300deg, transparent 360deg)'
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}
      
      {/* Enhanced border glow */}
      <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );

  // Enhanced tilt settings for desktop
  if (tiltEnabled && !isMobile) {
    return (
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={1200}
        scale={1.03}
        transitionSpeed={2000}
        gyroscope={true}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="24px"
      >
        {cardContent}
      </Tilt>
    );
  }

  return cardContent;
};

export default HolographicCard;