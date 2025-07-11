import React, { useState, useEffect } from 'react';
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
  Wallet,
  Coins,
  Menu,
  X,
  Eye,
  Calendar,
  Flame,
  Volume2,
  VolumeX,
  Maximize2,
  Pause
} from 'lucide-react';

// Import Starknet components
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { Contract, RpcProvider } from 'starknet';

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

// Import ABI
import toonLetterzAbi from './toonLetterzAbi.json';

// Contract address (replace with actual deployed contract address)
const CONTRACT_ADDRESS = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyDTmfukPNgegiKFcyvotbhItrR-heiiPq-YkjNSWu5XCRbCL5d9UdJGg58hNWVvCk0JA/exec';

// Enhanced Wallet Dropdown Component with Loading States
const WalletDropdown: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  onConnect: (connector: any) => void;
  connectors: any[];
  className?: string;
  isConnecting?: boolean;
}> = ({ isOpen, onToggle, onConnect, connectors, className = "", isConnecting = false }) => {
  return (
    <div className={`relative ${className}`}>
      <GlowingButton 
        onClick={onToggle}
        variant="primary" 
        size="md"
        className="w-full flex items-center justify-between gap-2 group relative overflow-hidden"
        disabled={isConnecting}
      >
        {/* Enhanced shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
        
        <div className="flex items-center gap-2 relative z-10">
          {isConnecting ? (
            <LoadingSpinner size="sm" className="text-white" />
          ) : (
            <Wallet className="w-4 h-4" />
          )}
          <span className="font-semibold tracking-wide">
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </GlowingButton>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Enhanced backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-md"
              onClick={onToggle}
            />
            
            {/* Enhanced dropdown with glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 z-[9999] bg-light-surface/95 backdrop-blur-3xl rounded-3xl shadow-2xl ring-1 ring-light-border/50 overflow-hidden border border-light-border/30"
              style={{ minWidth: '320px' }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5" />
              
              <div className="relative p-4">
                <div className="text-xs font-bold text-light-text-muted uppercase tracking-wider px-4 py-3 mb-3 bg-light-surface/50 rounded-2xl">
                  Choose Your Wallet
                </div>
                {connectors.map((connector, index) => (
                  <motion.button
                    key={connector.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    onClick={() => {
                      console.log('Connecting to:', connector.name);
                      onConnect(connector);
                      onToggle();
                    }}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left hover:bg-gradient-to-r hover:from-brand-primary-500/10 hover:to-brand-secondary-500/10 transition-all duration-300 group border border-transparent hover:border-brand-primary-500/30 hover:shadow-lg hover:shadow-brand-primary-500/10"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary-500/20 to-brand-secondary-500/20 flex items-center justify-center group-hover:from-brand-primary-500/30 group-hover:to-brand-secondary-500/30 transition-all duration-300 flex-shrink-0 shadow-lg">
                      {connector.name === 'Argent' && (
                        <img 
                          src="https://www.argent.xyz/favicon.ico" 
                          alt="Argent" 
                          className="w-7 h-7 rounded-lg" 
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling!.style.display = 'block';
                          }}
                        />
                      )}
                      {connector.name === 'Braavos' && (
                        <img 
                          src="https://braavos.app/favicon.ico" 
                          alt="Braavos" 
                          className="w-7 h-7 rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling!.style.display = 'block';
                          }}
                        />
                      )}
                      <Wallet className="w-6 h-6 text-brand-primary-500" style={{ display: ['Argent', 'Braavos'].includes(connector.name) ? 'none' : 'block' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-light-text group-hover:text-brand-primary-500 transition-colors duration-300 tracking-wide truncate text-base">
                        {connector.name}
                      </div>
                      <div className="text-sm text-light-text-muted truncate mt-1">
                        {connector.name === 'Argent' && 'Smart wallet for Starknet'}
                        {connector.name === 'Braavos' && 'Browser extension wallet'}
                        {!['Argent', 'Braavos'].includes(connector.name) && 'Connect your wallet'}
                      </div>
                    </div>
                    <motion.div
                      className="text-light-text-muted group-hover:text-brand-primary-500 transition-colors duration-300 flex-shrink-0"
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Mobile Menu Component
const MobileMenu: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  isConnected: boolean;
  address?: string;
  userNFTs: number[];
  onDisconnect: () => void;
  connectors: any[];
  onConnect: (connector: any) => void;
  isConnecting?: boolean;
}> = ({ isOpen, onToggle, isConnected, address, userNFTs, onDisconnect, connectors, onConnect, isConnecting = false }) => {
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9997] bg-black/60 backdrop-blur-md"
            onClick={onToggle}
          />
          
          {/* Enhanced menu with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[9998] w-80 max-w-[90vw] bg-light-surface/95 backdrop-blur-3xl border-l border-light-border/50 shadow-2xl"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5" />
            
            <div className="flex flex-col h-full relative z-10">
              {/* Enhanced header */}
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

              {/* Content */}
              <div className="flex-1 p-6 space-y-6">
                {/* Wallet Section */}
                <div className="border-t border-light-border/50 pt-6">
                  {isConnected ? (
                    <div className="space-y-4">
                      <motion.div 
                        className="p-5 rounded-2xl bg-gradient-to-r from-brand-primary-500/10 via-brand-secondary-500/10 to-brand-accent-500/10 border border-brand-primary-500/20 shadow-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-base font-bold text-light-text tracking-wide">
                            Connected Wallet
                          </span>
                          <motion.div 
                            className="w-3 h-3 rounded-full bg-brand-success-500"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        <div className="text-sm text-light-text-muted font-mono mb-2">
                          {address?.slice(0, 6)}...{address?.slice(-4)}
                        </div>
                        {userNFTs.length > 0 && (
                          <div className="mt-3 text-sm text-brand-primary-500 font-bold bg-brand-primary-500/10 px-3 py-1 rounded-full inline-block">
                            {userNFTs.length} NFT{userNFTs.length !== 1 ? 's' : ''} owned
                          </div>
                        )}
                      </motion.div>
                      <GlowingButton 
                        onClick={() => { onDisconnect(); onToggle(); }} 
                        variant="outline" 
                        size="md" 
                        className="w-full"
                      >
                        Disconnect Wallet
                      </GlowingButton>
                    </div>
                  ) : (
                    <WalletDropdown
                      isOpen={showWalletDropdown}
                      onToggle={() => setShowWalletDropdown(!showWalletDropdown)}
                      onConnect={onConnect}
                      connectors={connectors}
                      className="w-full"
                      isConnecting={isConnecting}
                    />
                  )}
                </div>
              </div>

              {/* Enhanced footer */}
              <div className="p-6 border-t border-light-border/50 bg-light-surface/30">
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
  const [email, setEmail] = useState('');
  const [toonListMsg, setToonListMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mintStatus, setMintStatus] = useState('');
  const [userNFTs, setUserNFTs] = useState<number[]>([]);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  // Starknet hooks
  const { account, address, status } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // Initialize provider and contract
  const provider = new RpcProvider({ nodeUrl: "https://starknet-mainnet.public.blastapi.io" });
  const contract = new Contract(toonLetterzAbi, CONTRACT_ADDRESS, provider);

  // Connect contract to account when available
  useEffect(() => {
    if (account) {
      contract.connect(account);
    }
  }, [account]);

  // Load user NFTs when account connects
  useEffect(() => {
    if (address) {
      loadUserNFTs();
    }
  }, [address]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showWalletDropdown) {
        setShowWalletDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showWalletDropdown]);

  // Enhanced toast function
  const showToastMessage = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const loadUserNFTs = async () => {
    if (!address) return;
    
    try {
      const balance = await contract.balanceOf(address);
      const nftCount = parseInt(balance.toString());
      const nfts = [];
      
      for (let i = 0; i < nftCount; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        nfts.push(parseInt(tokenId.toString()));
      }
      
      setUserNFTs(nfts);
    } catch (error) {
      console.error('Error loading NFTs:', error);
    }
  };

  const handleMint = async () => {
    if (!account) {
      showToastMessage('Please connect your wallet first', 'error');
      return;
    }

    setIsMinting(true);
    try {
      setMintStatus('Minting in progress...');
      const result = await contract.mint_item();
      await provider.waitForTransaction(result.transaction_hash);
      setMintStatus('Successfully minted! 🎉');
      showToastMessage('NFT minted successfully! 🎉', 'success');
      loadUserNFTs(); // Refresh NFT list
    } catch (error) {
      console.error('Minting error:', error);
      setMintStatus('Minting failed. Please try again.');
      showToastMessage('Minting failed. Please try again.', 'error');
    } finally {
      setIsMinting(false);
    }
  };

  const handleToonListSubmit = async () => {
    if (!email) {
      showToastMessage('Please enter your email address', 'error');
      return;
    }
    
    if (!email.includes('@')) {
      showToastMessage('Please enter a valid email address', 'error');
      return;
    }
    
    setIsSubmittingEmail(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setToonListMsg('🎉 Welcome Tooner, Stay Toon\'d!');
    showToastMessage('Successfully joined the ToonList! 🎉', 'success');
    setEmail('');
    setIsSubmittingEmail(false);
    
    // Clear message after 5 seconds
    setTimeout(() => setToonListMsg(''), 5000);
  };

  const handleConnectWallet = async (connector: any) => {
    console.log('Attempting to connect with:', connector);
    setIsConnecting(true);
    try {
      await connect({ connector });
      setShowWalletDropdown(false);
      showToastMessage(`Connected to ${connector.name}!`, 'success');
    } catch (error) {
      console.error('Connection error:', error);
      showToastMessage('Failed to connect wallet. Please try again.', 'error');
    } finally {
      setIsConnecting(false);
    }
  };

  const scrollToEmailSignup = () => {
    const emailSection = document.getElementById('email-signup');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Enhanced highlight effect
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
      a: "ToonLetterz transforms complex crypto news into engaging animated stories. Think of it as your weekly crypto briefing, but actually entertaining and easy to understand." 
    },
    { 
      q: "How often do new Toonz drop?", 
      a: "Every week, like clockwork." 
    },
    { 
      q: "Can I really mint these as NFTs?", 
      a: "Absolutely! Each episode can be minted as a collectible NFT on Starknet so you can own the moments that matter in crypto history!" 
    },
    { 
      q: "What makes this different from other crypto news platforms?", 
      a: "ToonLetterz is the first animated newsletter, we don't just report the news—we perform it. Visual storytelling meets crypto news with a dash of humor that actually makes you remember what happened." 
    },
    { 
      q: "Is this suitable for crypto beginners?", 
      a: "Perfect for beginners! We break down complex topics into digestible, visual stories that anyone can follow, regardless of their crypto knowledge." 
    }
  ];

  const isConnected = status === 'connected';

  // Launch countdown (set to 30 days from now for demo)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-light-bg text-light-text">
      {/* Background Components */}
      <AnimatedBackground />
      <ParticleField />

      {/* Toast Notifications */}
      <ToastNotification
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Enhanced Header with glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl bg-light-surface/90 border-b border-light-border/50 transition-all duration-300 shadow-lg">
        {/* Gradient overlay */}
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

          {/* Desktop - Enhanced Wallet Connection */}
          <div className="hidden md:flex items-center gap-4">
            {!isConnected ? (
              <WalletDropdown
                isOpen={showWalletDropdown}
                onToggle={() => setShowWalletDropdown(!showWalletDropdown)}
                onConnect={handleConnectWallet}
                connectors={connectors}
                isConnecting={isConnecting}
              />
            ) : (
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div 
                  className="text-sm text-brand-primary-500 font-mono bg-gradient-to-r from-light-surface/80 to-light-surface/60 backdrop-blur-xl px-4 py-3 rounded-2xl border border-brand-primary-500/20 flex items-center gap-3 shadow-lg"
                  whileHover={{ scale: 1.05, shadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                >
                  <span className="font-bold">{address?.slice(0,6)}...{address?.slice(-4)}</span>
                  {userNFTs.length > 0 && (
                    <motion.span 
                      className="bg-brand-primary-500 text-white px-3 py-1 rounded-full text-xs font-black"
                      whileHover={{ scale: 1.1 }}
                    >
                      {userNFTs.length} NFT{userNFTs.length !== 1 ? 's' : ''}
                    </motion.span>
                  )}
                </motion.div>
                <GlowingButton onClick={() => disconnect()} variant="outline" size="sm">
                  Disconnect
                </GlowingButton>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        isConnected={isConnected}
        address={address}
        userNFTs={userNFTs}
        onDisconnect={disconnect}
        connectors={connectors}
        onConnect={handleConnectWallet}
        isConnecting={isConnecting}
      />

      {/* Enhanced Hero Section */}
      <section className="pt-28 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 sm:mb-10"
            >
            
            </motion.div>
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
            {/* Enhanced glowing text shadow effect */}
            <div className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brand-primary-500/20 blur-3xl -z-10 tracking-tight animate-pulse">
              Crypto News You Can Enjoy, Share, and Collect
            </div>
          </motion.div>

          <ScrollReveal delay={0.4}>
            <p className="text-lg sm:text-xl md:text-2xl text-light-text-secondary mb-10 sm:mb-14 max-w-4xl mx-auto font-medium leading-relaxed tracking-wide">
              ToonLetterz turns boring crypto news into weekly animated masterpieces, blending humor with wit. We don't just report the news—we perform it!
            </p>
          </ScrollReveal>

          {/* Enhanced Waitlist Form */}
          <ScrollReveal delay={0.6}>
            <HolographicCard className="max-w-3xl mx-auto mb-20" id="email-signup">
              <div className="p-8 sm:p-10">
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-black text-light-text mb-3 tracking-wide">
                    Join the ToonList
                  </h3>
                  <p className="text-base text-light-text-muted tracking-wide">
                    Be first to experience crypto news come alive in <em>view-time</em>
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex-1 relative group">
                    <input
                      type="email"
                      placeholder="Your email for early access..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-light-surface/50 backdrop-blur-xl border border-light-border text-light-text placeholder-light-text-muted focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500 outline-none transition-all duration-300 tracking-wide text-lg group-hover:border-brand-primary-500/30 shadow-lg"
                      disabled={isSubmittingEmail}
                    />
                    {/* Enhanced input glow effect */}
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
                        Toon in
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

          {/* Enhanced scroll indicator */}
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

      {/* Trust Signals Section */}
      {/*
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center mb-12 sm:mb-16 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              Trusted by the Community
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <TrustSignals />
          </ScrollReveal>
        </div>
      </section>
      */}

      {/* Value Proposition Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-16 sm:mb-20 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              Why Your Brain Will Thank You
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-16">
            {[
              { icon: <Lightbulb className="w-7 h-7" />, title: 'The "Aha!" Drop', desc: 'Complex updates made simple through visual stories that actually stick in your memory.'},
              { icon: <MessageCircle className="w-7 h-7" />, title: 'Your Coffee Shop Flex', desc: 'Be that friend who actually understands the news and can explain it to others.' },
              { icon: <AlertCircle className="w-7 h-7" />, title: 'Skip the Scroll', desc: 'No more endless swiping through boring news feeds that put you to sleep.' },
              { icon: <Trophy className="w-7 h-7" />, title: 'Mintable Moments', desc: 'Saw it. Got it. Minted it. Turn animated news drops into valuable collectibles.' },
              { icon: <Users className="w-7 h-7" />, title: 'Shareable Brilliance', desc: 'Share crypto content your friends actually get and want to watch!' },
              { icon: <Sparkles className="w-7 h-7" />, title: 'The ToonLetterz Code', desc: 'Animated news ✖ Visual humor ✖ Memes that inform and entertain.' }
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
      
      {/* Enhanced Preview Section with Interactive Demo */}
      <section id="preview" className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-brand-primary-500/5 via-brand-secondary-500/5 to-brand-accent-500/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-16 sm:mb-20 bg-gradient-to-r from-brand-primary-500 via-brand-secondary-500 to-brand-accent-500 bg-clip-text text-transparent font-display tracking-tight">
              See It. Get It. Own It.
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            {/* Interactive Demo */}
            <ScrollReveal direction="left">
              <InteractiveDemo />
            </ScrollReveal>

            {/* Enhanced Minting Interface */}
            <ScrollReveal direction="right">
              <div className="space-y-8 sm:space-y-10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-6 text-light-text tracking-wide">
                    Mint This Episode as NFT
                  </h3>
                  <p className="text-lg text-light-text-secondary mb-8 tracking-wide leading-relaxed">
                    Own a piece of crypto history. Each ToonLetterz episode can be minted as a unique collectible on Starknet.
                  </p>
                </div>

                {/* Enhanced Wallet Connection & Minting */}
                <HolographicCard>
                  <div className="space-y-6">
                    {!isConnected ? (
                      <div className="text-center">
                        <p className="text-base text-light-text-muted mb-6 tracking-wide">
                          Connect your Starknet wallet to mint
                        </p>
                        <WalletDropdown
                          isOpen={showWalletDropdown}
                          onToggle={() => setShowWalletDropdown(!showWalletDropdown)}
                          onConnect={handleConnectWallet}
                          connectors={connectors}
                          className="w-full"
                          isConnecting={isConnecting}
                        />
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <motion.div 
                          className="flex items-center justify-between p-6 bg-gradient-to-r from-brand-primary-500/10 via-brand-secondary-500/10 to-brand-accent-500/10 rounded-2xl border border-brand-primary-500/20 shadow-lg"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div>
                            <div className="text-base font-bold text-light-text tracking-wide mb-1">
                              Connected Wallet
                            </div>
                            <div className="text-sm text-light-text-muted font-mono">
                              {address?.slice(0, 6)}...{address?.slice(-4)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-base font-bold text-brand-primary-500 tracking-wide">
                              {userNFTs.length} NFTs
                            </div>
                            <motion.div 
                              className="w-3 h-3 rounded-full bg-brand-success-500 ml-auto mt-1"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </div>
                        </motion.div>
                        
                        <GlowingButton 
                          onClick={handleMint}
                          size="lg"
                          variant="primary"
                          className="w-full text-lg font-bold"
                          disabled={isMinting}
                        >
                          {isMinting ? (
                            <>
                              <LoadingSpinner size="sm" className="text-white mr-2" />
                              Minting...
                            </>
                          ) : (
                            <>
                              <Coins className="w-6 h-6 mr-2" />
                              Mint Episode NFT
                            </>
                          )}
                        </GlowingButton>
                        
                        {mintStatus && (
                          <motion.div 
                            className="p-4 rounded-2xl bg-brand-primary-500/10 border border-brand-primary-500/20"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <p className="text-base text-center text-brand-primary-500 font-bold tracking-wide">
                              {mintStatus}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </HolographicCard>

                {/* Enhanced Benefits */}
                <div className="space-y-4">
                  {[
                    'Own the moment crypto history was made',
                    'Trade and collect rare episodes',
                    'Collect, share, and level up on the Toonerboard',
                    'Stay Toon\'d for more!'
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

      {/* Enhanced FAQ Section */}
      <section id="faq" className="py-20 sm:py-24 px-4 sm:px-6">
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
      </section>

      {/* Enhanced Final CTA Section */}
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

      {/* Enhanced Footer */}
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
                Built on <span className="text-brand-primary-500 font-bold">Starknet</span>
              </span>
            </div>
          </div>
          
          {/* Additional footer content */}
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