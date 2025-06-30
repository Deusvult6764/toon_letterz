import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useContract } from '@starknet-react/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Zap, ArrowRight, ChevronDown, Star, Eye, Calendar, Users, Sparkles, Trophy, Rocket, Coins, TrendingUp, Flame, Menu, X, Brain, Palette, Lightbulb, MessageCircle, Smile, AlertCircle, CheckCircle } from 'lucide-react';

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

// Contract ABI
import toonLetterzAbi from './toonLetterzAbi.json';

function AppContent() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const { contract } = useContract({
    abi: toonLetterzAbi,
    address: "0x0491806b4ef3c3845d379a418614a835981a1a98d12c22a8cb005c56248180ee"
  });

  const [isMinting, setIsMinting] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [toonList, setToonList] = useState<string[]>([]);
  const [toonListMsg, setToonListMsg] = useState('');
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
  const [nftBalance, setNftBalance] = useState<number>(0);
  const [ownedNfts, setOwnedNfts] = useState<Array<{ id: number; uri: string }>>([]);
  const [isLoadingNfts, setIsLoadingNfts] = useState(false);
  const [totalSupply, setTotalSupply] = useState<number>(0);

  const mintEpisode = async () => {
    if (!contract || !address) {
      setMintError("Please connect your wallet first!");
      return;
    }

    setIsMinting(true);
    setMintError(null);
    setMintSuccess(false);

    try {
      // Call the mint_item() function from your Cairo contract
      const tx = await contract.mint_item();
      console.log("Transaction sent:", tx);
      setMintSuccess(true);
      
      // Refresh NFT data after successful mint
      setTimeout(() => {
        fetchMyNFTs();
        fetchTotalSupply();
      }, 2000);
      
    } catch (error: any) {
      console.error("Minting failed:", error);
      
      // Enhanced error handling
      if (error.message?.includes("already minted")) {
        setMintError("You've already minted your ToonLetterz NFT! One per person keeps it exclusive.");
      } else if (error.message?.includes("insufficient")) {
        setMintError("Insufficient funds. Make sure you have enough ETH for gas fees.");
      } else if (error.message?.includes("rejected")) {
        setMintError("Transaction was rejected. Please try again.");
      } else {
        setMintError("Minting failed. Please check your wallet and try again.");
      }
    } finally {
      setIsMinting(false);
    }
  };

  const fetchMyNFTs = async () => {
    if (!contract || !address) return;

    setIsLoadingNfts(true);

    try {
      // Get balance (how many NFTs the user owns)
      const balance = await contract.balanceOf(address);
      const balanceNum = Number(balance);
      setNftBalance(balanceNum);

      // Get token IDs if user owns any NFTs
      const nfts = [];
      for (let i = 0; i < balanceNum; i++) {
        try {
          const tokenId = await contract.tokenOfOwnerByIndex(address, i);
          const tokenUri = await contract.get_token_uri(tokenId);
          nfts.push({ id: Number(tokenId), uri: tokenUri });
        } catch (error) {
          console.warn(`Failed to fetch NFT at index ${i}:`, error);
        }
      }
      setOwnedNfts(nfts);
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
    } finally {
      setIsLoadingNfts(false);
    }
  };

  const fetchTotalSupply = async () => {
    if (!contract) return;

    try {
      const supply = await contract.totalSupply();
      setTotalSupply(Number(supply));
    } catch (error) {
      console.error("Failed to fetch total supply:", error);
    }
  };

  useEffect(() => {
    if (isConnected && address && contract) {
      fetchMyNFTs();
      fetchTotalSupply();
    }
  }, [isConnected, address, contract]);

  // Clear success/error messages after some time
  useEffect(() => {
    if (mintSuccess) {
      const timer = setTimeout(() => setMintSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [mintSuccess]);

  useEffect(() => {
    if (mintError) {
      const timer = setTimeout(() => setMintError(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [mintError]);

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

  const handleToonListSubmit = () => {
    if (!email.includes('@')) {
      setToonListMsg('Please enter a valid email address.');
      return;
    }
    setToonList(prev => [...prev, email]);
    setEmail('');
    setToonListMsg(`🎉 You're on the ToonList! Stay Toon'd for early access.`);
    setTimeout(() => setToonListMsg(''), 4000);
  };

  const stats = [
    { icon: Users, label: 'News As Entertainment', value: 'Infotainment', color: 'from-brand-primary-400 to-brand-primary-600' },
    { icon: Sparkles, label: 'News As Collectibles', value: 'Ownership', color: 'from-brand-accent-400 to-brand-accent-600' },
    { icon: Trophy, label: 'One Mint Per Wallet', value: 'Exclusive', color: 'from-brand-secondary-400 to-brand-secondary-600' },
    { icon: Rocket, label: 'The New Interface', value: 'Humor', color: 'from-brand-warning-400 to-brand-secondary-600' },
    //{ icon: Rocket, label: 'Your NFTs', value: nftBalance.toString(), color: 'from-brand-warning-400 to-brand-warning-600' }
  ];

  // Show loading or fallback during SSR
  if (!isClient) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-lg font-bold text-brand-primary-500">Loading ToonLetterz...</div>
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
            className="text-sm sm:text-lg font-black bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight"
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
              href="#early-access" 
              className="text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-secondary-500 transition-all duration-300 relative group font-medium tracking-wide text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Early Access
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-secondary-500 to-brand-accent-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
            
            <ThemeToggle />
            
            {isConnected ? (
              <motion.div className="flex items-center gap-3">
                <div className="text-xs text-brand-primary-500 font-mono bg-light-surface dark:bg-dark-surface px-3 py-1 rounded-full border border-brand-primary-500/20 flex items-center gap-2">
                  <span>{address?.slice(0,6)}...{address?.slice(-4)}</span>
                  {nftBalance > 0 && (
                    <span className="bg-brand-primary-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                      {nftBalance} NFT{nftBalance !== 1 ? 's' : ''}
                    </span>
                  )}
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
                  href="#preview" 
                  className="block py-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-primary-500 transition-colors font-medium tracking-wide text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Preview
                </a>
                <a 
                  href="#early-access" 
                  className="block py-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-secondary-500 transition-colors font-medium tracking-wide text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Early Access
                </a>
                
                <div className="pt-4 border-t border-light-border dark:border-dark-border">
                  {isConnected ? (
                    <div className="space-y-3">
                      <div className="text-xs text-brand-primary-500 font-mono bg-light-surface dark:bg-dark-surface px-3 py-2 rounded-lg border border-brand-primary-500/20 flex items-center justify-between">
                        <span>{address?.slice(0,6)}...{address?.slice(-4)}</span>
                        {nftBalance > 0 && (
                          <span className="bg-brand-primary-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                            {nftBalance} NFT{nftBalance !== 1 ? 's' : ''}
                          </span>
                        )}
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

      {/* Hero Section with new copy */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 text-center overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8 relative"
          >
            <AnimatedText 
              text="Crypto News You Can Enjoy, Share, and Collect"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 via-brand-accent-500 to-brand-warning-500 bg-clip-text text-transparent drop-shadow-2xl font-display leading-tight tracking-tight"
              stagger={0.08}
            />
            {/* Glowing text shadow effect */}
            <div className="absolute inset-0 text-2xl sm:text-4xl md:text-6xl lg:text-6xl font-black text-brand-primary-500/20 blur-2xl -z-10 tracking-tight">
              Crypto News You Can Enjoy, Share, and Collect!
            </div>
          </motion.div>

          <ScrollReveal delay={0.3}>
            <p className="text-sm sm:text-base md:text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto font-medium px-4 tracking-wide">
              ToonLetterz turns the long and boring crypto news into animated masterpieces, blending humor and wit. We don't just report the news—we perform it!
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="flex flex-col gap-4 justify-center items-center max-w-2xl mx-auto mb-12 sm:mb-16 px-4">
              <div className="relative flex-1 w-full group">
                <input
                  type="email"
                  placeholder="Reserve your spot — before the drop..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-xl border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder-light-text-muted dark:placeholder-dark-text-muted focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500 outline-none transition-all duration-300 group-hover:border-brand-secondary-500/30 font-medium text-sm tracking-wide"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-primary-500/10 via-brand-secondary-500/10 to-brand-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20 blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <GlowingButton onClick={handleToonListSubmit} size="lg" variant="primary" className="w-full sm:w-auto font-semibold tracking-wide">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Join the ToonList
                </GlowingButton>
              </div>
            </div>
          </ScrollReveal>

          <AnimatePresence>
            {toonListMsg && (
              <motion.p
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="text-brand-primary-500 text-sm sm:text-base font-semibold bg-light-surface/30 dark:bg-dark-surface/30 backdrop-blur-xl px-4 sm:px-6 py-3 rounded-full border border-brand-primary-500/20 inline-block mx-4 tracking-wide"
              >
                {toonListMsg}
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
                    <div className="text-sm sm:text-lg font-bold text-light-text dark:text-dark-text mb-1 sm:mb-2 bg-gradient-to-r from-light-text to-light-text-secondary dark:from-dark-text dark:to-dark-text-secondary bg-clip-text text-transparent tracking-wide">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted group-hover:text-light-text-secondary dark:group-hover:text-dark-text-secondary transition-colors duration-300 font-medium tracking-wide">
                      {stat.label}
                    </div>
                  </motion.div>
                </HolographicCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center mb-8 sm:mb-12 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              Don't Let Boring News Hold You Back
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <ScrollReveal direction="left">
              <HolographicCard className="p-6 sm:p-8">
                <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-6 tracking-wide">
                  While you scroll past another dry crypto recap, early adopters are getting smarter—and ahead. Every skipped headline isn't just missed info—it's a missed advantage.
                </p>
              </HolographicCard>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="space-y-4 sm:space-y-6">
                {[
                  { icon: '😴', title: 'Boring Reports', desc: 'Dry updates that put you to sleep' },
                  { icon: '🤯', title: 'Information Overload', desc: 'Too much fluff, TL;DR ' },
                  { icon: '😵', title: 'Confusion', desc: 'Complex jargon that makes you feel dumber' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-light-surface/30 dark:bg-dark-surface/30 backdrop-blur-xl border border-light-border dark:border-dark-border"
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-light-text dark:text-dark-text tracking-wide text-sm">{item.title}</h4>
                      <p className="text-xs text-light-text-muted dark:text-dark-text-muted tracking-wide">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center mb-8 sm:mb-12 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              Your Secret Weapon? Animated Infotainment That Sticks
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {[
              { icon: <Lightbulb className="w-6 h-6" />, title: 'The "Aha!" Drop', desc: 'Watch crypto headlines come alive.'},
              { icon: <MessageCircle className="w-6 h-6" />, title: 'Your Coffee Shop Flex', desc: 'Be that friend who actually understands the news.' },
              { icon: <AlertCircle className="w-6 h-6" />, title: 'Skip the Scroll', desc: ' No more endless swiping through news feeds.' },
              { icon: <Trophy className="w-6 h-6" />, title: 'Mintable Moments', desc: 'Saw it. Got it. Minted it.Turn animated news drops into collectibles.' },
              { icon: <Users className="w-6 h-6" />, title: 'Shareable Brilliance', desc: ' Share with your friends. Your new superpower—making alpha fun!' },
              { icon: <Sparkles className="w-6 h-6" />, title: 'The ToonLetterz Code', desc: 'Animated news ✖ Visual humor ✖ Memes that inform. ' }
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <HolographicCard className="text-center group h-full">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="h-full flex flex-col"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-brand-primary-500 to-brand-secondary-500 p-3 text-white flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold mb-3 text-light-text dark:text-dark-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-primary-500 group-hover:to-brand-secondary-500 group-hover:bg-clip-text transition-all duration-300 tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted flex-1 tracking-wide">
                      {feature.desc}
                    </p>
                  </motion.div>
                </HolographicCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
       {/* Preview Section with Minting */}
      <section id="preview" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              🎬 Mint Your First ToonLetterz NFT
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <ScrollReveal direction="left">
              <HolographicCard className="relative overflow-hidden group">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20 relative">
                  <img 
                    src="/toonletterz_demo_.png?auto=compress&cs=tinysrgb&w=800"
                    alt="ToonLetterz Preview"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer border border-white/20 group-hover:border-brand-primary-500/50 transition-all duration-300">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1 drop-shadow-lg" />
                    </div>
                  </motion.div>
                  
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-2 text-white">
                      <p className="text-xs font-medium tracking-wide">Sample: "Lido Hack'd for Pennies"</p>
                    </div>
                  </div>
                </div>
              </HolographicCard>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight mb-4 sm:mb-6 font-display tracking-tight">
                    <span className="text-light-text dark:text-dark-text">Hack'd for</span>
                    <span className="block text-transparent bg-gradient-to-r from-brand-primary-500 to-brand-secondary-500 bg-clip-text mt-2">Pennies</span>
                  </h3>
                  <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4 sm:mb-6 font-medium tracking-wide">
                    Mint this episode as a collectible NFT on Starknet. Prove you were there before it was cool and join the exclusive collectors club.
                  </p>
                </div>

                {/* Mint/Error/Success Messages */}
                <AnimatePresence>
                  {mintError && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-brand-error-500/10 border border-brand-error-500/30 rounded-xl p-4 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-brand-error-500 mt-0.5 flex-shrink-0" />
                      <p className="text-brand-error-500 font-medium tracking-wide text-sm">{mintError}</p>
                    </motion.div>
                  )}
                  
                  {mintSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-brand-success-500/10 border border-brand-success-500/30 rounded-xl p-4 flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-brand-success-500 mt-0.5 flex-shrink-0" />
                      <p className="text-brand-success-500 font-medium tracking-wide text-sm">
                        🎉 Minting successful! Your ToonLetterz NFT is being processed. Check your wallet soon!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  {isConnected ? (
                    <GlowingButton 
                      onClick={mintEpisode} 
                      size="lg" 
                      variant="primary" 
                      className="w-full sm:w-auto font-semibold tracking-wide"
                      disabled={isMinting || nftBalance > 0}
                    >
                      {isMinting ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Minting...
                        </div>
                      ) : nftBalance > 0 ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Already Minted!
                        </>
                      ) : (
                        <>
                          <Rocket className="w-5 h-5 mr-2" />
                          Mint Now - Free
                        </>
                      )}
                    </GlowingButton>
                  ) : (
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                      {connectors.map((connector) => (
                        <GlowingButton 
                          key={connector.id} 
                          onClick={() => connect({ connector })}
                          variant="outline"
                          size="lg"
                          className="w-full sm:w-auto font-semibold tracking-wide"
                        >
                          <Zap className="w-5 h-5 mr-2" />
                          Connect {connector.name}
                        </GlowingButton>
                      ))}
                    </div>
                  )}
                  
                  <GlowingButton variant="outline" size="lg" className="w-full sm:w-auto font-semibold tracking-wide">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Preview
                  </GlowingButton>
                </div>

                {/* Enhanced minting progress */}
                <HolographicCard className="bg-light-surface/30 dark:bg-dark-surface/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-light-border dark:border-dark-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary flex items-center gap-2 font-medium tracking-wide">
                      <Coins className="w-4 h-4 text-brand-warning-500" />
                      Minting Progress
                    </span>
                    <span className="text-xs sm:text-sm text-brand-primary-500 font-bold tracking-wide">
                      {totalSupply} / 1000
                    </span>
                  </div>
                  <div className="w-full bg-light-surface dark:bg-dark-surface rounded-full h-2 sm:h-3 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 h-2 sm:h-3 rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${(totalSupply / 1000) * 100}%` }}
                      transition={{ duration: 2, delay: 1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                  <p className="text-xs text-light-text-muted dark:text-dark-text-muted mt-2 flex items-center gap-1 font-medium tracking-wide">
                    <Sparkles className="w-3 h-3 text-brand-warning-500" />
                    {1000 - totalSupply} NFTs remaining!
                  </p>
                </HolographicCard>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section with updated copy */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              🙋‍♂️ Frequently Asked Questions
            </h3>
          </ScrollReveal>

          <div className="space-y-3 sm:space-y-4">
            {[
              { 
                q: "What is ToonLetterz?", 
                a: "ToonLetterz is the animated infotainment drop that transforms the fast-moving, often absurd world of crypto into bite-sized, humorous animations." 
              },
              { 
                q: "How often do new Toonz drop?", 
                a: "Every week, like clockwork." 
              },
              { 
                q: "What makes ToonLetterz different?", 
                a: "We are redefining how news is told, using humor and animation to transform boring blocks of text into collectibles." 
              },
              { 
                q: "Can I mint more than one?", 
                a: "Nope. One mint per wallet. Keeps it rare, keeps it real." 
              },
              { 
                q: "When's the launch?", 
                a: "Soon. ToonList gets Toon'd in first." 
              }
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <HolographicCard className="overflow-hidden">
                  <button
                    className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left flex justify-between items-center text-light-text dark:text-dark-text hover:text-transparent hover:bg-gradient-to-r hover:from-brand-primary-500 hover:to-brand-secondary-500 hover:bg-clip-text transition-all duration-300"
                    onClick={() => toggleFaq(idx)}
                  >
                    <span className="text-sm sm:text-base font-bold pr-4 tracking-wide">{item.q}</span>
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
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed border-t border-light-border dark:border-dark-border pt-4 font-medium tracking-wide">
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

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-brand-primary-500/10 via-brand-secondary-500/10 to-brand-accent-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              The Toon Train's Leaving Soon
            </h2>
            <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary mb-8 sm:mb-12 max-w-3xl mx-auto font-medium tracking-wide">
              Join now for first access at launch, behind-the-scenes previews, minting privileges + Stay Toon'd for more!
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <GlowingButton size="lg" variant="primary" className="w-full sm:w-auto font-semibold tracking-wide">
                <ArrowRight className="w-5 h-5 mr-2" />
                Join the ToonList
              </GlowingButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-light-border dark:border-dark-border relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div 
              className="text-lg sm:text-xl font-black bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent mb-3 sm:mb-4 font-display tracking-tight"
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
            <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mb-4 sm:mb-6 font-medium px-4 tracking-wide">
              Stay Toon'd • Powered by <span className="text-brand-primary-500 font-bold">Starknet</span>
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 text-xs text-light-text-muted dark:text-dark-text-muted">
              <a href="#" className="hover:text-brand-primary-500 transition-colors duration-300 font-medium tracking-wide">Privacy</a>
              <a href="#" className="hover:text-brand-secondary-500 transition-colors duration-300 font-medium tracking-wide">Terms</a>
              <a href="#" className="hover:text-brand-accent-500 transition-colors duration-300 font-medium tracking-wide">Contact</a>
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