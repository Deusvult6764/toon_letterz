import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/next"
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Rocket, 
  Star, 
  Users, 
  Trophy, 
  Sparkles, 
  ChevronDown,
  Lightbulb,
  MessageCircle,
  TrendingUp,
  Smile,
  Brain,
  Palette,
  AlertCircle,
  Zap,
  Shield,
  Target,
  Gift,
  Clock,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Menu,
  X,
  Eye,
  Calendar,
  Flame,
  Volume2,
  VolumeX,
  Maximize2,
  Pause,
  Coins
} from 'lucide-react';

// Import components
import AnimatedBackground from './components/AnimatedBackground';
import ParticleField from './components/ParticleField';
import HolographicCard from './components/HolographicCard';
import GlowingButton from './components/GlowingButton';
import AnimatedText from './components/AnimatedText';
import ScrollReveal from './components/ScrollReveal';
import ToastNotification from './components/ToastNotification';
import LoadingSpinner from './components/LoadingSpinner';
import InteractiveDemo from './components/InteractiveDemo';
import TrustSignals from './components/TrustSignals';

// Google Sheets integration constants - REPLACE WITH YOUR ACTUAL FORM VALUES
const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd-6ZxAbg0inm1tUDkd_6CmzRa7CQJuQSmF400GUgOWWyujtw/formResponse";
const EMAIL_FIELD_ID = "entry.1705553243"; // Replace with actual field ID from your Google Form
const NAME_FIELD_ID = "entry.881540528"; // <-- Replace with your actual name field ID
const TIMESTAMP_FIELD_ID = "entry.987654321"; // Replace with actual timestamp field ID

// Enhanced Mobile Menu Component (without wallet features)
const MobileMenu: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
}> = ({ isOpen, onToggle }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9997] bg-black/60 backdrop-blur-md"
            onClick={onToggle}
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[9998] w-80 max-w-[90vw] bg-light-surface/95 backdrop-blur-3xl border-l border-light-border/50 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5" />
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center justify-between p-6 border-b border-light-border/50 bg-light-surface/30">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <img 
                      src="/logo.png" 
                      alt="ToonLetterz Logo"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <span className="text-xl font-black bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-wide">
                    ToonLetterz
                  </span>
                </div>
                <motion.button
                  onClick={onToggle}
                  className="p-3 rounded-2xl bg-light-surface/50 hover:bg-light-surface/80 transition-colors duration-200 border border-light-border/30"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <X className="w-6 h-6 text-light-text" />
                </motion.button>
              </div>
              <div className="flex-1 p-6 space-y-6">
                <div className="text-center text-sm text-light-text-muted">
                  Built on <span className="text-brand-primary-500 font-bold">Starknet</span>
                  <div className="mt-2 text-xs">
                    Secure • Fast • Scalable
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [name, setName] = useState(''); // <-- Add name state
  const [email, setEmail] = useState('');
  const [toonListMsg, setToonListMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Enhanced toast function
  const showToastMessage = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  // Enhanced Google Sheets submission
  const submitToGoogleSheets = async (name: string, email: string) => {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }
      if (!name.trim()) {
        throw new Error('Name is required');
      }

      // Create form data for Google Sheets
      const formData = new FormData();
      formData.append(NAME_FIELD_ID, name); // <-- Add name to form data
      formData.append(EMAIL_FIELD_ID, email);
      formData.append(TIMESTAMP_FIELD_ID, new Date().toISOString());

      // Submit to Google Sheets via Google Forms
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      throw error;
    }
  };

  const handleToonListSubmit = async () => {
    if (!name.trim()) {
      showToastMessage('Please enter your name', 'error');
      return;
    }
    if (!email) {
      showToastMessage('Please enter your email address', 'error');
      return;
    }
    if (!email.includes('@')) {
      showToastMessage('Please enter a valid email address', 'error');
      return;
    }

    setIsSubmittingEmail(true);
    try {
      await submitToGoogleSheets(name, email); // <-- Pass name and email
      setToonListMsg('🎉 Welcome Tooner, Stay Toon\'d!');
      showToastMessage('Successfully joined the ToonList! 🎉', 'success');
      setName('');
      setEmail('');
      setTimeout(() => setToonListMsg(''), 5000);
    } catch (error) {
      showToastMessage('Failed to join ToonList. Please try again.', 'error');
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const scrollToEmailSignup = () => {
    const emailSection = document.getElementById('email-signup');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        emailSection.classList.add('ring-4', 'ring-brand-primary-500/50', 'animate-pulse');
        setTimeout(() => {
          emailSection.classList.remove('ring-4', 'ring-brand-primary-500/50', 'animate-pulse');
        }, 3000);
      }, 800);
    }
  };

  const faqs = [
    { 
      q: "What exactly is ToonLetterz?", 
      a: "ToonLetterz is the first animated newsletter, we don't just report the news—we perform it. Visual storytelling meets crypto news with a dash of humor that actually makes you remember what happened." 
    },
    { 
      q: "How often do new Toonz drop?", 
      a: "Every week, like clockwork." 
    },
    { 
      q: "Can I really mint these as NFTs?", 
      a: "Currently, NFT minting is not available. Stay tuned for future updates on collectible features!" 
    },
    { 
      q: "What makes this different from other crypto news platforms?", 
      a: "ToonLetterz transforms complex crypto news into engaging animated stories. Think of it as your weekly crypto briefing, but actually entertaining and easy to understand."
    },
    { 
      q: "Is this suitable for crypto beginners?", 
      a: "Perfect for beginners! We break down complex topics into digestible, visual stories that anyone can follow, regardless of their crypto knowledge." 
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-light-bg text-light-text">
      <AnimatedBackground />
      <ParticleField />
      <ToastNotification
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl bg-light-surface/90 border-b border-light-border/50 transition-all duration-300 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="/logo.png" 
                alt="ToonLetterz Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-wide">
              ToonLetterz
            </span>
          </motion.div>
          <div className="md:hidden flex items-center gap-3">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-2xl bg-light-surface/50 backdrop-blur-xl hover:bg-light-surface/80 transition-colors duration-200 border border-light-border/30"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Menu className="w-6 h-6 text-light-text" />
            </motion.button>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={mobileMenuOpen}
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <section className="pt-28 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 sm:mb-10"
            />
          </ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-8 sm:mb-10"
          >
            <AnimatedText 
              text="Crypto News You Can Enjoy, Share, and Collect"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 via-brand-accent-500 to-brand-warning-500 bg-clip-text text-transparent drop-shadow-2xl font-display leading-tight tracking-tight"
              stagger={0.08}
            />
            <div className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brand-primary-500/20 blur-3xl -z-10 tracking-tight animate-pulse">
              Crypto News You Can Enjoy, Share, and Collect
            </div>
          </motion.div>
          <ScrollReveal delay={0.4}>
            <p className="text-lg sm:text-xl md:text-2xl text-light-text-secondary mb-10 sm:mb-14 max-w-4xl mx-auto font-medium leading-relaxed tracking-wide">
              ToonLetterz turns crypto news into weekly animated masterpieces, blending humor with wit. We don't just report the news—we perform it!
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.6}>
            <HolographicCard className="max-w-3xl mx-auto mb-20" id="email-signup">
              <div className="p-8 sm:p-10">
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-black text-light-text mb-3 tracking-wide">
                    Join the ToonList
                  </h3>
                  <p className="text-base text-light-text-muted tracking-wide">
                    Be first to experience crypto news come alive in <em>watch-time</em>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex-1 relative group">
                    <input
                      type="text"
                      placeholder="Your name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-light-surface/50 backdrop-blur-xl border border-light-border text-light-text placeholder-light-text-muted focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500 outline-none transition-all duration-300 tracking-wide text-lg group-hover:border-brand-primary-500/30 shadow-lg mb-4"
                      disabled={isSubmittingEmail}
                    />
                  </div>
                  <div className="flex-1 relative group">
                    <input
                      type="email"
                      placeholder="Your email for early access..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-light-surface/50 backdrop-blur-xl border border-light-border text-light-text placeholder-light-text-muted focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500 outline-none transition-all duration-300 tracking-wide text-lg group-hover:border-brand-primary-500/30 shadow-lg"
                      disabled={isSubmittingEmail}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-primary-500/10 via-brand-secondary-500/10 to-brand-accent-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl" />
                  </div>
                  <GlowingButton 
                    onClick={handleToonListSubmit} 
                    size="lg" 
                    variant="primary" 
                    className="sm:w-auto font-bold tracking-wide text-lg px-8 py-4"
                    disabled={isSubmittingEmail}
                  >
                    {isSubmittingEmail ? (
                      <>
                        <LoadingSpinner size="sm" className="text-white mr-2" />
                        Joining...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-6 h-6 mr-2" />
                        Toon In
                      </>
                    )}
                  </GlowingButton>
                </div>
                <AnimatePresence>
                  {toonListMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="text-brand-primary-500 font-bold tracking-wide text-center text-lg bg-brand-primary-500/10 px-6 py-3 rounded-2xl border border-brand-primary-500/20"
                    >
                      {toonListMsg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </HolographicCard>
          </ScrollReveal>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <motion.div
              className="p-3 rounded-full bg-gradient-to-r from-brand-primary-500/20 to-brand-secondary-500/20 backdrop-blur-xl border border-brand-primary-500/30"
              whileHover={{ scale: 1.1 }}
            >
              <ChevronDown className="w-6 h-6 text-brand-primary-500" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-16 sm:mb-20 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              Why Your Brain Will Thank You
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-16">
            {[
              { icon: <Sparkles className="w-7 h-7" />, title: 'Attention-Span Optimized', desc: 'Headlines you’ll absorb in under 11 seconds.' },
              { icon: <Lightbulb className="w-7 h-7" />, title: 'The "Aha!" Drop', desc: 'Crypto made visual. Bite-sized stories that stick — no whitepapers required.'},
              { icon: <Trophy className="w-7 h-7" />, title: 'Mintable Moments', desc: 'Saw it. Got it. Minted it. Collect historic crypto moments on Starknet.' },
              { icon: <AlertCircle className="w-7 h-7" />, title: 'Skip the Scroll', desc: 'Forget dry feeds and text walls. Watch your way through the week’s top stories.' },
              { icon: <Users className="w-7 h-7" />, title: 'Unhinged Humor', desc: 'Because the only thing rarer than a bull market is a good LOL!' },
              { icon: <MessageCircle className="w-7 h-7" />, title: 'Your Coffee Shop Flex', desc: 'Be the friend who actually gets crypto - and can explain it without sounding like a chart.' },
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <HolographicCard className="text-center group h-full">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative h-full flex flex-col p-2"
                  >
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20 flex items-center justify-center text-brand-primary-500 group-hover:text-brand-accent-500 transition-colors duration-300 shadow-lg"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-black mb-4 text-light-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-primary-500 group-hover:to-brand-secondary-500 group-hover:bg-clip-text transition-all duration-300 tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-base text-light-text-muted tracking-wide flex-1 leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                </HolographicCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section id="preview" className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-16 sm:mb-20 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              See It. Get It. Enjoy It.
            </h2>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <ScrollReveal direction="left">
              <InteractiveDemo />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="space-y-8 sm:space-y-10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-6 text-light-text tracking-wide">
                    Mint This Episode as NFT
                  </h3>
                  <p className="text-lg text-light-text-secondary mb-8 tracking-wide leading-relaxed">
                   Own a piece of crypto history. Every episode can be minted as a unique collectible on Starknet.
                  </p>
                </div>
                <HolographicCard>
                  <div className="p-6 space-y-6">
                    <GlowingButton
                      onClick={() => showToastMessage('Minting is not available yet. Join the ToonList for updates!', 'info')}
                      size="lg"
                      variant="primary"
                      className="w-full text-lg font-bold"
                    >
                      <Coins className="w-6 h-6 mr-2" />
                      Mint Episode
                    </GlowingButton>
                  </div>
                </HolographicCard>
                <div className="space-y-4">
                  {[
                    'Own the moment crypto history was made',
                    'Trade and collect rare episodes',
                    'Collect, share, and level up on the Toonerboard',
                    'Toon In for more!'
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-light-surface/30 backdrop-blur-xl border border-light-border/30 hover:border-brand-success-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <CheckCircle className="w-6 h-6 text-brand-success-500 flex-shrink-0" />
                      <span className="text-base text-light-text-secondary tracking-wide font-medium">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      {/* REMOVE FAQ SECTION BELOW */}
      {/* <section id="faq" className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-16 sm:mb-20 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              Questions? We've Got Answers.
            </h2>
          </ScrollReveal>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <HolographicCard>
                  <motion.button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-8 focus:outline-none"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg sm:text-xl font-black text-light-text pr-6 tracking-wide">
                        {faq.q}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-shrink-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-primary-500/20 to-brand-secondary-500/20 flex items-center justify-center">
                          <ChevronDown className="w-5 h-5 text-brand-primary-500" />
                        </div>
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-base sm:text-lg text-light-text-secondary mt-6 tracking-wide leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </HolographicCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section> */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-brand-primary-500/10 via-brand-secondary-500/10 to-brand-accent-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 sm:mb-10 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              The Toon Train's Leaving Soon
            </h2>
            <p className="text-lg sm:text-xl text-light-text-secondary mb-12 sm:mb-16 max-w-3xl mx-auto font-medium tracking-wide leading-relaxed">
              Join the ToonList and be first to experience crypto news come alive!
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GlowingButton 
                onClick={scrollToEmailSignup}
                size="lg" 
                variant="primary" 
                className="font-black tracking-wide text-xl px-12 py-6"
              >
                <Rocket className="w-6 h-6 mr-3" />
                Join the ToonList 
              </GlowingButton>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
      <footer className="py-12 sm:py-16 px-4 sm:px-6 border-t border-light-border/50 bg-gradient-to-br from-light-surface/50 to-light-surface/30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="ToonLetterz Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-black bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-wide">
                ToonLetterz
              </span>
            </motion.div>
            <div className="flex items-center gap-8 text-sm sm:text-base text-light-text-muted">
              <span className="tracking-wide font-medium">© 2025 ToonLetterz</span>
              <span className="tracking-wide font-medium">
                Powered by <span className="text-brand-primary-500 font-bold">Starknet</span>
              </span>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-light-border/30 text-center">
            <p className="text-sm text-light-text-muted font-medium">
              Making crypto news fun, one Toon at a time 🎬
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;