import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        onComplete?.();
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="flex gap-2 sm:gap-4 justify-center">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-brand-primary-500/20 to-brand-secondary-500/20 backdrop-blur-xl rounded-xl border border-brand-primary-500/30 p-2 sm:p-3 min-w-[60px] sm:min-w-[80px]">
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-lg sm:text-2xl font-black text-brand-primary-500 font-mono"
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.div>
          </div>
          <div className="text-xs sm:text-sm text-light-text-muted mt-1 font-medium tracking-wide">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;