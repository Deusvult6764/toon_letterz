import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star, TrendingUp, Zap } from 'lucide-react';

const SocialProof: React.FC = () => {
  const stats = [
    { icon: Users, value: '2,847', label: 'Early Adopters', color: 'text-brand-primary-500' },
    { icon: Star, value: '4.9', label: 'Community Rating', color: 'text-brand-warning-500' },
    { icon: TrendingUp, value: '156%', label: 'Growth This Week', color: 'text-brand-success-500' },
    { icon: Zap, value: '< 2min', label: 'Avg. Watch Time', color: 'text-brand-accent-500' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center p-4 rounded-2xl bg-gradient-to-br from-light-surface/40 to-light-surface/20 backdrop-blur-xl border border-light-border/30 hover:border-brand-primary-500/30 transition-all duration-300 group"
        >
          <div className={`w-8 h-8 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
            <stat.icon className="w-full h-full" />
          </div>
          <div className="text-lg sm:text-xl font-black text-light-text mb-1 font-mono">
            {stat.value}
          </div>
          <div className="text-xs text-light-text-muted font-medium tracking-wide">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SocialProof;