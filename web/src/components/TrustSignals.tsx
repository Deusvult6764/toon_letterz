import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Zap } from 'lucide-react';

const TrustSignals: React.FC = () => {
  const signals = [
    {
      icon: Shield,
      title: "Audited Smart Contracts",
      description: "Security verified by leading blockchain auditors"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Featured in CoinDesk, Decrypt, and The Block"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built with feedback from 2,800+ early users"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Powered by Starknet's L2 technology"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {signals.map((signal, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center p-4 rounded-xl bg-gradient-to-br from-light-surface/40 to-light-surface/20 backdrop-blur-xl border border-light-border/30 hover:border-brand-success-500/30 transition-all duration-300 group"
        >
          <div className="w-8 h-8 mx-auto mb-3 text-brand-success-500 group-hover:scale-110 transition-transform duration-300">
            <signal.icon className="w-full h-full" />
          </div>
          <h4 className="text-sm font-bold text-light-text mb-2 tracking-wide">
            {signal.title}
          </h4>
          <p className="text-xs text-light-text-muted tracking-wide leading-relaxed">
            {signal.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustSignals;