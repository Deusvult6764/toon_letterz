/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Orbitron', 'monospace', 'system-ui', 'sans-serif'],
        'display': ['Orbitron', 'monospace', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'pixel': '0.1em', // Extra wide spacing for 8-bit feel
      },
      colors: {
        // Light theme colors
        light: {
          bg: '#fafbfc',           // Soft white with slight blue tint - trust, cleanliness
          surface: '#ffffff',      // Pure white - clarity, simplicity
          border: '#e2e8f0',       // Light gray - subtle definition
          text: '#1a202c',         // Dark charcoal - excellent readability
          'text-secondary': '#4a5568',  // Medium gray - hierarchy
          'text-muted': '#718096',      // Light gray - supporting text
        },
        
        // Dark theme colors
        dark: {
          bg: '#0f1419',           // Deep blue-black - premium, sophisticated
          surface: '#1a202c',      // Charcoal - depth without harshness
          border: '#2d3748',       // Medium gray - subtle definition
          text: '#f7fafc',         // Off-white - comfortable reading
          'text-secondary': '#e2e8f0',  // Light gray - hierarchy
          'text-muted': '#a0aec0',      // Medium gray - supporting text
        },
        
        // Brand Colors - Psychologically chosen for crypto/entertainment brand
        brand: {
          // Primary: Electric Blue - Trust, innovation, technology, reliability
          primary: {
            50: '#eff6ff',
            100: '#dbeafe', 
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',   // Main primary - trust, professionalism
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554'
          },
          
          // Secondary: Vibrant Purple - Creativity, luxury, innovation, premium
          secondary: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',   // Main secondary - creativity, premium feel
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
            950: '#3b0764'
          },
          
          // Accent: Cyan - Energy, freshness, digital innovation, modernity
          accent: {
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',   // Main accent - energy, digital feel
            500: '#06b6d4',
            600: '#0891b2',
            700: '#0e7490',
            800: '#155e75',
            900: '#164e63',
            950: '#083344'
          },
          
          // Success: Emerald - Growth, prosperity, positive outcomes, wealth
          success: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',   // Main success - growth, positive
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
            950: '#022c22'
          },
          
          // Warning: Amber - Attention, energy, optimism, excitement
          warning: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',   // Main warning - attention, energy
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
            950: '#451a03'
          },
          
          // Error: Rose - Urgency, importance, alerts, critical actions
          error: {
            50: '#fff1f2',
            100: '#ffe4e6',
            200: '#fecdd3',
            300: '#fda4af',
            400: '#fb7185',   // Main error - urgency, importance
            500: '#f43f5e',
            600: '#e11d48',
            700: '#be123c',
            800: '#9f1239',
            900: '#881337',
            950: '#4c0519'
          }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient': 'gradient 15s ease infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'blur-in': 'blurIn 0.8s ease-out',
        'holographic': 'holographic 4s ease-in-out infinite',
        'prismatic': 'prismatic 6s linear infinite',
        'cyber-glow': 'cyberGlow 2s ease-in-out infinite alternate',
        'theme-transition': 'themeTransition 0.3s ease-in-out',
        'pixel-pulse': 'pixelPulse 1.5s ease-in-out infinite',
        'glitch': 'glitch 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blurIn: {
          '0%': { filter: 'blur(10px)', opacity: '0' },
          '100%': { filter: 'blur(0)', opacity: '1' },
        },
        holographic: {
          '0%, 100%': { 
            background: 'linear-gradient(45deg, #3b82f6, #a855f7, #22d3ee)',
            transform: 'rotateY(0deg)'
          },
          '25%': { 
            background: 'linear-gradient(45deg, #a855f7, #22d3ee, #fbbf24)',
            transform: 'rotateY(5deg)'
          },
          '50%': { 
            background: 'linear-gradient(45deg, #22d3ee, #fbbf24, #10b981)',
            transform: 'rotateY(0deg)'
          },
          '75%': { 
            background: 'linear-gradient(45deg, #fbbf24, #10b981, #3b82f6)',
            transform: 'rotateY(-5deg)'
          },
        },
        prismatic: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        cyberGlow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.1)' 
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.8), inset 0 0 40px rgba(168, 85, 247, 0.2)' 
          },
        },
        themeTransition: {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
        pixelPulse: {
          '0%, 100%': { 
            transform: 'scale(1)',
            textShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
          },
          '50%': { 
            transform: 'scale(1.02)',
            textShadow: '0 0 20px rgba(168, 85, 247, 1), 0 0 30px rgba(34, 211, 238, 0.8)'
          },
        },
        glitch: {
          '0%, 100%': { 
            transform: 'translate(0)',
            filter: 'hue-rotate(0deg)'
          },
          '20%': { 
            transform: 'translate(-2px, 2px)',
            filter: 'hue-rotate(90deg)'
          },
          '40%': { 
            transform: 'translate(-2px, -2px)',
            filter: 'hue-rotate(180deg)'
          },
          '60%': { 
            transform: 'translate(2px, 2px)',
            filter: 'hue-rotate(270deg)'
          },
          '80%': { 
            transform: 'translate(2px, -2px)',
            filter: 'hue-rotate(360deg)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
        'aurora': 'linear-gradient(135deg, #3b82f6 0%, #a855f7 25%, #22d3ee 50%, #fbbf24 75%, #10b981 100%)',
        'cyber-grid': 'linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)',
        'holographic': 'linear-gradient(45deg, #3b82f6, #a855f7, #22d3ee, #fbbf24, #10b981)',
        'pixel-grid': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.1) 2px, rgba(59,130,246,0.1) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(168,85,247,0.1) 2px, rgba(168,85,247,0.1) 4px)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(59, 130, 246, 0.5)',
        'cyber-lg': '0 0 40px rgba(59, 130, 246, 0.8)',
        'neon': '0 0 30px rgba(168, 85, 247, 0.6)',
        'neon-lg': '0 0 60px rgba(168, 85, 247, 0.9)',
        'holographic': '0 8px 32px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'brand-glow': '0 0 30px rgba(59, 130, 246, 0.4)',
        'brand-glow-lg': '0 0 60px rgba(59, 130, 246, 0.6)',
        'pixel': 'inset 0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)',
        'pixel-lg': 'inset 0 0 0 3px rgba(168, 85, 247, 0.7), 0 0 30px rgba(168, 85, 247, 0.5)',
      },
      textShadow: {
        'pixel': '2px 2px 0px rgba(59, 130, 246, 0.8)',
        'pixel-lg': '3px 3px 0px rgba(168, 85, 247, 0.8), 6px 6px 0px rgba(34, 211, 238, 0.6)',
        'neon': '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(168, 85, 247, 0.6)',
      },
    },
  },
  plugins: [],
}