import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const InteractiveDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate video progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  return (
    <div className="relative group">
      <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20 relative">
        {/* Demo Image */}
        <img 
          src="/0723.mp4"
          alt="ToonLetterz Mascot"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Play controls */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            onClick={togglePlay}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-2xl group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Video controls */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4"
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
                {/* Progress bar */}
                <div className="w-full bg-white/20 rounded-full h-1 mb-3">
                  <motion.div
                    className="bg-brand-primary-500 h-1 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                
                {/* Controls */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <span className="text-xs font-mono">
                      {Math.floor(progress / 4)}:{(Math.floor(progress % 4) * 15).toString().padStart(2, '0')} / 2:34
                    </span>
                  </div>
                  
                  <button className="p-1 hover:bg-white/20 rounded transition-colors duration-200">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Episode info */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-2 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium tracking-wide">Episode #001</p>
                <p className="text-sm font-bold tracking-wide">"ToonLetterz Mascot"</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/80">0:09</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs">LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;