import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const colors = {
    success: 'from-brand-success-500/20 to-brand-success-600/20 border-brand-success-500/30 text-brand-success-600',
    error: 'from-brand-error-500/20 to-brand-error-600/20 border-brand-error-500/30 text-brand-error-600',
    info: 'from-brand-primary-500/20 to-brand-primary-600/20 border-brand-primary-500/30 text-brand-primary-600'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-20 right-4 z-[10000] max-w-sm"
        >
          <div className={`bg-gradient-to-r ${colors[type]} backdrop-blur-2xl rounded-2xl border p-4 shadow-2xl`}>
            <div className="flex items-center gap-3">
              <div className={`flex-shrink-0 ${type === 'success' ? 'text-brand-success-500' : type === 'error' ? 'text-brand-error-500' : 'text-brand-primary-500'}`}>
                {icons[type]}
              </div>
              <p className="text-sm font-medium tracking-wide flex-1">{message}</p>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;