import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Primary gradient background with theme support */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-bg via-light-surface to-light-bg dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg transition-colors duration-300" />
      
      {/* Enhanced animated mesh gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-30 dark:opacity-40"
        animate={{
          background: [
            'linear-gradient(135deg, #3b82f6 0%, #a855f7 25%, #22d3ee 50%, #fbbf24 75%, #10b981 100%)',
            'linear-gradient(225deg, #10b981 0%, #fbbf24 25%, #22d3ee 50%, #a855f7 75%, #3b82f6 100%)',
            'linear-gradient(315deg, #a855f7 0%, #3b82f6 25%, #10b981 50%, #22d3ee 75%, #fbbf24 100%)',
            'linear-gradient(45deg, #fbbf24 0%, #22d3ee 25%, #10b981 50%, #3b82f6 75%, #a855f7 100%)',
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Enhanced floating orbs with brand colors */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-brand-primary-500/20 via-brand-secondary-500/15 to-brand-accent-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -120, 80, 0],
          scale: [1, 1.3, 0.8, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-brand-accent-500/20 via-brand-warning-500/15 to-brand-primary-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 80, 0],
          y: [0, 100, -60, 0],
          scale: [1, 0.7, 1.4, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-brand-secondary-500/20 via-brand-primary-500/10 to-brand-accent-500/20 rounded-full blur-2xl"
        animate={{
          x: [0, 140, -100, 0],
          y: [0, -80, 120, 0],
          scale: [1, 1.5, 0.9, 1],
          rotate: [0, 270, 540],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Additional smaller orbs for depth */}
      <motion.div
        className="absolute top-1/6 right-1/6 w-48 h-48 bg-gradient-to-r from-brand-warning-500/15 to-brand-success-500/15 rounded-full blur-2xl"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced grid pattern overlay with theme support */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Brand-themed floating elements */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Enhanced noise texture with brand colors */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] mix-blend-overlay">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.231 0 0 0 0 0.510 0 0 0 0 0.965 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Prismatic light rays with brand colors */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(59,130,246,0.1) 60deg, transparent 120deg, rgba(168,85,247,0.1) 180deg, transparent 240deg, rgba(34,211,238,0.1) 300deg, transparent 360deg)'
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;