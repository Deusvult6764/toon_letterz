import React, { useEffect, useRef } from 'react';

const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if device is mobile
    const isMobile = window.innerWidth < 768;
    
    // Reduce particle count on mobile for better performance
    const particleCount = isMobile ? 40 : 80;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
    }> = [];

    // Brand colors for particles
    const colors = ['#3b82f6', '#a855f7', '#22d3ee', '#fbbf24', '#10b981'];

    // Create enhanced particles with mobile optimizations
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8),
        vy: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8),
        size: Math.random() * (isMobile ? 2 : 3) + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += particle.pulseSpeed;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate pulsing size and opacity
        const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;
        const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2;

        // Draw particle with glow effect (simplified for mobile)
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        
        if (!isMobile) {
          // Create glow effect only on desktop
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, pulseSize * 3
          );
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(0.5, particle.color + '40');
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.globalAlpha = pulseOpacity;
          ctx.fill();
        }

        // Draw core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = pulseOpacity * 1.5;
        ctx.fill();

        // Draw connections (reduced on mobile)
        const connectionDistance = isMobile ? 80 : 120;
        const maxConnections = isMobile ? 2 : 5;
        let connectionCount = 0;
        
        particles.slice(index + 1).forEach(otherParticle => {
          if (connectionCount >= maxConnections) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            
            if (!isMobile) {
              // Create gradient line only on desktop
              const lineGradient = ctx.createLinearGradient(
                particle.x, particle.y,
                otherParticle.x, otherParticle.y
              );
              lineGradient.addColorStop(0, particle.color);
              lineGradient.addColorStop(1, otherParticle.color);
              ctx.strokeStyle = lineGradient;
            } else {
              ctx.strokeStyle = particle.color;
            }
            
            ctx.globalAlpha = (connectionDistance - distance) / connectionDistance * 0.3;
            ctx.lineWidth = 1;
            ctx.stroke();
            connectionCount++;
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};

export default ParticleField;