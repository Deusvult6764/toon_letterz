import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "DeFi Researcher",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "Finally, crypto news that doesn't make my brain hurt. The animations actually help me understand complex protocols.",
      rating: 5
    },
    {
      name: "Sarah Kim",
      role: "Crypto Trader",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "I share these with my non-crypto friends and they actually get it. Game changer for onboarding.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Blockchain Developer",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "The NFT collectibles are genius. I own every episode and they're conversation starters at conferences.",
      rating: 5
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative p-6 rounded-2xl bg-gradient-to-br from-light-surface/60 to-light-surface/30 backdrop-blur-2xl border border-light-border/50 hover:border-brand-primary-500/30 transition-all duration-500 group hover:shadow-2xl hover:shadow-brand-primary-500/10"
        >
          {/* Quote icon */}
          <Quote className="absolute top-4 right-4 w-6 h-6 text-brand-primary-500/30 group-hover:text-brand-primary-500/50 transition-colors duration-300" />
          
          {/* Rating */}
          <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-brand-warning-500 text-brand-warning-500" />
            ))}
          </div>
          
          {/* Content */}
          <p className="text-sm text-light-text-secondary mb-6 leading-relaxed tracking-wide">
            "{testimonial.content}"
          </p>
          
          {/* Author */}
          <div className="flex items-center gap-3">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-brand-primary-500/20"
            />
            <div>
              <div className="font-semibold text-light-text text-sm tracking-wide">
                {testimonial.name}
              </div>
              <div className="text-xs text-light-text-muted tracking-wide">
                {testimonial.role}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Testimonials;