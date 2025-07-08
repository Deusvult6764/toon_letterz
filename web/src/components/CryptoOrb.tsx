import React from 'react';
import { motion } from 'framer-motion';

interface CryptoOrbProps {
  delay?: number;
}

const CryptoOrb: React.FC<CryptoOrbProps> = ({ delay = 0 }) => {
  const cryptoSymbols = ['₿', 'Ξ', '◊', '⟠', '◈'];
  const symbol = cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)];
  
  return (
    <motion.div
      className="fixed pointer-events-none z-30"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0,
        scale: 0
      }}
      animate={{
        x: [
          Math.random() * window.innerWidth,
          Math.random() * window.innerWidth,
          Math.random() * window.innerWidth,
          Math.random() * window.innerWidth
        ],
        y: [
          Math.random() * window.innerHeight,
          Math.random() * window.innerHeight,
          Math.random() * window.innerHeight,
          Math.random() * window.innerHeight
        ],
        opacity: [0, 0.6, 0.8, 0.4, 0],
        scale: [0, 1, 1.2, 1, 0],
        rotate: [0, 180, 360, 540, 720]
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-lg backdrop-blur-sm border border-white/20">
        {symbol}
      </div>
    </motion.div>
  );
};

export default CryptoOrb;