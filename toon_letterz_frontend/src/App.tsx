import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Zap, ArrowRight, ChevronDown, Star, Eye, Calendar, Users, Sparkles, Trophy, Rocket, Coins, TrendingUp, Flame, Menu, X } from 'lucide-react';

// Components
import AnimatedBackground from './components/AnimatedBackground';
import GlowingButton from './components/GlowingButton';
import FloatingCard from './components/FloatingCard';
import AnimatedText from './components/AnimatedText';
import ParticleField from './components/ParticleField';
import ScrollReveal from './components/ScrollReveal';
import HolographicCard from './components/HolographicCard';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [waitlist, setWaitlist] = useState<string[]>([]);
  const [waitlistMsg, setWaitlistMsg] = useState('');
  const [episodes, setEpisodes] = useState<Array<{
    id: number;
    title: string;
    views: string;
    rating: number;
    thumbnail: string;
    date: string;
    duration: string;
    trending?: boolean;
    hot?: boolean;
  }>>([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isClient || isMobile) return;
    
    let animationFrame: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Cancel previous animation frame to prevent stacking
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      // Use requestAnimationFrame for smooth updates
      animationFrame = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isClient, isMobile]);

  useEffect(() => {
    setTimeout(() => {
      setEpisodes([
        { 
          id: 1, 
          title: 'Hack\'d for Pennies', 
          views: '14.2K', 
          rating: 4.8,
          thumbnail: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400',
          date: '2024-01-15',
          duration: '12:34',
          trending: true,
          hot: true
        },
        { 
          id: 2, 
          title: 'Layer 2 Lunacy', 
          views: '11.5K', 
          rating: 4.7,
          thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
          date: '2024-01-08',
          duration: '15:22',
          trending: true
        },
        { 
          id: 3, 
          title: 'Regulation Roast', 
          views: '9.3K', 
          rating: 4.5,
          thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
          date: '2024-01-01',
          duration: '18:45'
        }
      ]);
      setLoadingEpisodes(false);
    }, 1800);
  }, []);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const handleWaitlistSubmit = () => {
    if (!email.includes('@')) {
      setWaitlistMsg('😅 Enter a valid email degen.');
      return;
    }
    setWaitlist(prev => [...prev, email]);
    setEmail('');
    setWaitlistMsg(`🎉 You're on the list! Stay tuned.`);
    setTimeout(() => setWaitlistMsg(''), 4000);
  };

  const stats = [
    { icon: Users, label: 'Community Members', value: '12.5K+', color: 'from-brand-primary-400 to-brand-primary-600' },
    { icon: Eye, label: 'Total Views', value: '2.1M+', color: 'from-brand-secondary-400 to-brand-secondary-600' },
    { icon: Trophy, label: 'Episodes Minted', value: '847', color: 'from-brand-warning-400 to-brand-warning-600' },
    { icon: Sparkles, label: 'Unique Collectors', value: '3.2K+', color: 'from-brand-success-400 to-brand-success-600' }
  ];

  // Show loading or fallback during SSR
  if (!isClient) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-2xl font-bold text-brand-primary-500">Loading ToonLetterz...</div>
      </div>
    );
  }

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen font-sans overflow-x-hidden relative transition-colors duration-300">
      <AnimatedBackground />
      <ParticleField />
      
      {/* Desktop-only cursor follower */}
      {!isMobile && (
        <motion.div
          className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference hidden md:block"
          style={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1
          }}
        >
          <div className="w-full h-full bg-white rounded-full opacity-80" />
        </motion.div>
      )}

      {/* Enhanced mobile-friendly navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-40 backdrop-blur-2xl bg-light-surface/80 dark:bg-dark-surface/80 border-b border-light-border dark:border-dark-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center relative z-10">
          <motion.div 
            className="text-xl sm:text-2xl font-black bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display"
            whileHover={{ scale: 1.05 }}
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: '200% 200%' }}
          >
            ToonLetterz
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <motion.a 
              href="#episodes" 
              className="text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-primary-500 transition-all duration-300 relative group font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Episodes
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary-500 to-brand-secondary-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
            <motion.a 
              href="#community" 
              className="text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-secondary-500 transition-all duration-300 relative group font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Community
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-secondary-500 to-brand-accent-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
            
            <ThemeToggle />
            
            {isConnected ? (
              <motion.div className="flex items-center gap-3">
                <div className="text-sm text-brand-primary-500 font-mono bg-light-surface dark:bg-dark-surface px-3 py-1 rounded-full border border-brand-primary-500/20">
                  {address?.slice(0,6)}...{address?.slice(-4)}
                </div>
                <GlowingButton onClick={() => disconnect()} variant="outline" size="sm">
                  Disconnect
                </GlowingButton>
              </motion.div>
            ) : (
              <div className="flex gap-2">
                {connectors.map((connector) => (
                  <GlowingButton 
                    key={connector.id} 
                    onClick={() => connect({ connector })}
                    variant="primary" 
                    size="sm"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {connector.name}
                  </GlowingButton>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-light-surface/50 dark:bg-dark-surface/50 border border-light-border dark:border-dark-border"
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-light-text dark:text-dark-text" />
              ) : (
                <Menu className="w-6 h-6 text-light-text dark:text-dark-text" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-light-border dark:border-dark-border bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-4">
                <a 
                  href="#episodes" 
                  className="block py-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-primary-500 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Episodes
                </a>
                <a 
                  href="#community" 
                  className="block py-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-secondary-500 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Community
                </a>
                
                <div className="pt-4 border-t border-light-border dark:border-dark-border">
                  {isConnected ? (
                    <div className="space-y-3">
                      <div className="text-sm text-brand-primary-500 font-mono bg-light-surface dark:bg-dark-surface px-3 py-2 rounded-lg border border-brand-primary-500/20">
                        {address?.slice(0,6)}...{address?.slice(-4)}
                      </div>
                      <GlowingButton onClick={() => { disconnect(); setMobileMenuOpen(false); }} variant="outline" size="sm" className="w-full">
                        Disconnect
                      </GlowingButton>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {connectors.map((connector) => (
                        <GlowingButton 
                          key={connector.id} 
                          onClick={() => { connect({ connector }); setMobileMenuOpen(false); }}
                          variant="primary" 
                          size="sm"
                          className="w-full"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          {connector.name}
                        </GlowingButton>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section with mobile optimizations */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 text-center overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8 relative"
          >
            <AnimatedText 
              text="ToonLetterz"
              className="text-4xl sm:text-7xl md:text-9xl font-black bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 via-brand-accent-500 to-brand-warning-500 bg-clip-text text-transparent drop-shadow-2xl font-display leading-tight"
              stagger={0.1}
            />
            {/* Glowing text shadow effect */}
            <div className="absolute inset-0 text-4xl sm:text-7xl md:text-9xl font-black text-brand-primary-500/20 blur-2xl -z-10">
              ToonLetterz
            </div>
          </motion.div>

          <ScrollReveal delay={0.3}>
            <p className="text-lg sm:text-2xl md:text-3xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto font-medium px-4">
              🎥 Weekly animated crypto news you can laugh at, share, and own as premium NFTs
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="flex flex-col gap-4 justify-center items-center max-w-2xl mx-auto mb-12 sm:mb-16 px-4">
              <div className="relative flex-1 w-full group">
                <input
                  type="email"
                  placeholder="Drop your degen email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-xl border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder-light-text-muted dark:placeholder-dark-text-muted focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500 outline-none transition-all duration-300 group-hover:border-brand-secondary-500/30 font-medium text-base"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-primary-500/10 via-brand-secondary-500/10 to-brand-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20 blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
              <GlowingButton onClick={handleWaitlistSubmit} size="lg" variant="primary" className="w-full sm:w-auto">
                <ArrowRight className="w-5 h-5 mr-2" />
                Toon In
              </GlowingButton>
            </div>
          </ScrollReveal>

          <AnimatePresence>
            {waitlistMsg && (
              <motion.p
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="text-brand-primary-500 text-base sm:text-lg font-semibold bg-light-surface/30 dark:bg-dark-surface/30 backdrop-blur-xl px-4 sm:px-6 py-3 rounded-full border border-brand-primary-500/20 inline-block mx-4"
              >
                {waitlistMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Enhanced Stats with mobile layout */}
          <ScrollReveal delay={0.7}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-16 sm:mt-20">
              {stats.map((stat, index) => (
                <HolographicCard key={index} delay={index * 0.1} className="text-center group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    className="relative"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-r ${stat.color} p-2 sm:p-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <stat.icon className="w-full h-full text-white" />
                    </div>
                    <div className="text-xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-1 sm:mb-2 bg-gradient-to-r from-light-text to-light-text-secondary dark:from-dark-text dark:to-dark-text-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted group-hover:text-light-text-secondary dark:group-hover:text-dark-text-secondary transition-colors duration-300 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                </HolographicCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Episode with mobile optimizations */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display">
              🎬 This Week's Drop
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <ScrollReveal direction="left">
              <HolographicCard className="relative overflow-hidden group">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20 relative">
                  <img 
                    src="https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Featured Episode"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Trending badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2">
                    <div className="bg-gradient-to-r from-brand-error-500 to-brand-warning-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
                      <Flame className="w-3 h-3" />
                      HOT
                    </div>
                    <div className="bg-gradient-to-r from-brand-success-500 to-brand-accent-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      TRENDING
                    </div>
                  </div>
                  
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer border border-white/20 group-hover:border-brand-primary-500/50 transition-all duration-300">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1 drop-shadow-lg" />
                    </div>
                  </motion.div>
                  
                  {/* Episode info overlay with enhanced styling */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/90 bg-black/30 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-2">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-brand-primary-400" />
                        14.2K views
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-brand-warning-400 text-brand-warning-400" />
                        4.8
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-brand-secondary-400" />
                        Jan 15
                      </span>
                    </div>
                  </div>
                </div>
              </HolographicCard>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-6 font-display">
                    <span className="text-light-text dark:text-dark-text">Hack'd for</span>
                    <span className="block text-transparent bg-gradient-to-r from-brand-primary-500 to-brand-secondary-500 bg-clip-text mt-2">Pennies</span>
                  </h3>
                  <p className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4 sm:mb-6 font-medium">
                    Mint this episode as a collectible NFT on Starknet. Prove you were there before it was cool and join the exclusive collectors club.
                  </p>
                  
                  {/* Collectors Benefits */}
                  <div className="bg-light-surface/30 dark:bg-dark-surface/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-light-border dark:border-dark-border mb-4 sm:mb-6">
                    <h4 className="text-base sm:text-lg font-bold text-brand-primary-500 mb-2 sm:mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      Collectors Benefits
                    </h4>
                    <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary font-medium">
                      Enjoy the news, art & Stay Toon'd!
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  {isConnected ? (
                    <GlowingButton size="lg" variant="primary" className="w-full sm:w-auto">
                      <Rocket className="w-5 h-5 mr-2" />
                      Mint Now - 0.01 ETH
                    </GlowingButton>
                  ) : (
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                      {connectors.map((connector) => (
                        <GlowingButton 
                          key={connector.id} 
                          onClick={() => connect({ connector })}
                          variant="outline"
                          size="lg"
                          className="w-full sm:w-auto"
                        >
                          <Zap className="w-5 h-5 mr-2" />
                          {connector.name}
                        </GlowingButton>
                      ))}
                    </div>
                  )}
                  
                  <GlowingButton variant="outline" size="lg" className="w-full sm:w-auto">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Free
                  </GlowingButton>
                </div>

                {/* Enhanced minting progress */}
                <HolographicCard className="bg-light-surface/30 dark:bg-dark-surface/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-light-border dark:border-dark-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary flex items-center gap-2 font-medium">
                      <Coins className="w-4 h-4 text-brand-warning-500" />
                      Minting Progress
                    </span>
                    <span className="text-sm sm:text-base text-brand-primary-500 font-bold">847 / 1000</span>
                  </div>
                  <div className="w-full bg-light-surface dark:bg-dark-surface rounded-full h-2 sm:h-3 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 h-2 sm:h-3 rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{ width: '84.7%' }}
                      transition={{ duration: 2, delay: 1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                  <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mt-2 flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3 text-brand-warning-500" />
                    Only 153 NFTs remaining!
                  </p>
                </HolographicCard>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Past Episodes with mobile optimizations */}
      <section id="episodes" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display">
              🔥 Past Drops
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {loadingEpisodes ? (
              [...Array(3)].map((_, idx) => (
                <div key={idx} className="h-80 bg-gradient-to-br from-light-surface/50 to-light-surface dark:from-dark-surface/50 dark:to-dark-surface rounded-3xl animate-pulse border border-light-border dark:border-dark-border" />
              ))
            ) : (
              episodes.map((ep, index) => (
                <ScrollReveal key={ep.id} delay={index * 0.1}>
                  <HolographicCard className="group cursor-pointer">
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 relative">
                      <img 
                        src={ep.thumbnail}
                        alt={ep.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Episode badges */}
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-2">
                        {ep.hot && (
                          <div className="bg-gradient-to-r from-brand-error-500 to-brand-warning-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse">
                            <Flame className="w-2 h-2 sm:w-3 sm:h-3" />
                            HOT
                          </div>
                        )}
                        {ep.trending && (
                          <div className="bg-gradient-to-r from-brand-success-500 to-brand-accent-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <TrendingUp className="w-2 h-2 sm:w-3 sm:h-3" />
                            TRENDING
                          </div>
                        )}
                      </div>
                      
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/50 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs text-white border border-white/20">
                        {ep.duration}
                      </div>
                      
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" />
                        </div>
                      </motion.div>
                    </div>
                    
                    <h4 className="text-lg sm:text-xl font-bold mb-3 text-light-text dark:text-dark-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-primary-500 group-hover:to-brand-secondary-500 group-hover:bg-clip-text transition-all duration-300">
                      {ep.title}
                    </h4>
                    
                    <div className="flex items-center justify-between text-sm text-light-text-muted dark:text-dark-text-muted mb-4">
                      <span className="flex items-center gap-1 font-medium">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-brand-primary-500" />
                        {ep.views} views
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-brand-warning-500 text-brand-warning-500" />
                        {ep.rating}
                      </span>
                    </div>
                    
                    <div className="pt-4 border-t border-light-border dark:border-dark-border">
                      <GlowingButton variant="outline" size="sm" className="w-full">
                        <Sparkles className="w-4 h-4 mr-2" />
                        View Collection
                      </GlowingButton>
                    </div>
                  </HolographicCard>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Community Section with mobile optimizations */}
      <section id="community" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollReveal>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display">
              Toon in with the Community
            </h3>
            <p className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8 sm:mb-12 max-w-3xl mx-auto font-medium px-4">
              Connect with fellow crypto enthusiasts, share memes, vibe and say goodbye to boring news!
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: 'Discord', desc: 'Chat with 12K+ degens', icon: '💬', color: 'from-brand-primary-500 to-brand-secondary-600' },
              { title: 'Twitter', desc: 'Daily crypto memes', icon: '🐦', color: 'from-brand-primary-400 to-brand-accent-500' },
              { title: 'Telegram', desc: 'Alpha alerts & drops', icon: '⚡', color: 'from-brand-accent-400 to-brand-success-500' }
            ].map((social, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <HolographicCard className="text-center group cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-r ${social.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      {social.icon}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold mb-2 text-light-text dark:text-dark-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-primary-500 group-hover:to-brand-secondary-500 group-hover:bg-clip-text transition-all duration-300">
                      {social.title}
                    </h4>
                    <p className="text-sm sm:text-base text-light-text-muted dark:text-dark-text-muted group-hover:text-light-text-secondary dark:group-hover:text-dark-text-secondary transition-colors duration-300 font-medium">{social.desc}</p>
                  </motion.div>
                </HolographicCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with mobile optimizations */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display">
              🙋‍♂️ Frequently Asked Degens
            </h3>
          </ScrollReveal>

          <div className="space-y-3 sm:space-y-4">
            {[
              { q: "What is ToonLetterz?", a: "A weekly animated drop that covers top crypto stories — as funny NFTs you can collect and trade." },
              { q: "How do I mint episodes?", a: "Connect your Starknet wallet & click Mint. You'll own this week's episode forever as a premium NFT." },
              { q: "Why Starknet?", a: "Because low fees = more memes. Plus, Starknet's scaling technology means smooth minting for everyone." },
              { q: "Can I submit content ideas?", a: "Yes! Waitlist degens get first dibs on shaping the next drop. Join our Discord for submissions." },
              { q: "What's the utility of owning episodes?", a: "NFT holders get exclusive access to bonus content, community voting rights, and early access to new drops." }
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <HolographicCard className="overflow-hidden">
                  <button
                    className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left flex justify-between items-center text-light-text dark:text-dark-text hover:text-transparent hover:bg-gradient-to-r hover:from-brand-primary-500 hover:to-brand-secondary-500 hover:bg-clip-text transition-all duration-300"
                    onClick={() => toggleFaq(idx)}
                  >
                    <span className="text-base sm:text-lg font-bold pr-4">{item.q}</span>
                    <motion.div
                      animate={{ rotate: faqOpen === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-brand-primary-500 flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {faqOpen === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary leading-relaxed border-t border-light-border dark:border-dark-border pt-4 font-medium">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </HolographicCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer with mobile optimizations */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-light-border dark:border-dark-border relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div 
              className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent mb-3 sm:mb-4 font-display"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              ToonLetterz
            </motion.div>
            <p className="text-sm sm:text-base text-light-text-muted dark:text-dark-text-muted mb-4 sm:mb-6 font-medium px-4">
              Powered by <span className="text-brand-primary-500 font-bold">Starknet</span> • Degens welcome 🥳
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
              <a href="#" className="hover:text-brand-primary-500 transition-colors duration-300 font-medium">Privacy</a>
              <a href="#" className="hover:text-brand-secondary-500 transition-colors duration-300 font-medium">Terms</a>
              <a href="#" className="hover:text-brand-accent-500 transition-colors duration-300 font-medium">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}