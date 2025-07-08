import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tiltEnabled?: boolean;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  tiltEnabled = true 
}) => {
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`
        relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6
        shadow-2xl hover:shadow-primary-500/10 transition-all duration-500
        before:absolute before:inset-0 before:rounded-3xl before:p-[1px]
        before:bg-gradient-to-br before:from-white/20 before:to-transparent
        before:mask-composite before:-z-10
        ${className}
      `}
      whileHover={{ y: -5 }}
    >
      {/* Inner glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );

  if (tiltEnabled) {
    return (
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.02}
        transitionSpeed={1000}
        gyroscope={true}
      >
        {cardContent}
      </Tilt>
    );
  }

  return cardContent;
};

export default FloatingCard;