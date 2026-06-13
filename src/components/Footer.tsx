'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldAlert, Sparkles, Mail, Compass } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Quick regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid connoisseur email.');
      return;
    }

    setError('');
    setIsSubmitted(true);
    setEmail('');
    
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  // Type for drifting amber dust particles
  interface Particle {
    id: number;
    size: number;
    delay: number;
    duration: number;
    left: string;
    xRange: number[];
  }

  const [mountedParticles, setMountedParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const list = Array.from({ length: 15 }).map((_, idx) => ({
      id: idx,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 8,
      duration: Math.random() * 8 + 8,
      left: `${Math.random() * 100}%`,
      xRange: [0, Math.random() * 20 - 10, 0],
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMountedParticles(list);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-white/5 bg-[#070708]/90 backdrop-blur-2xl py-20 px-6 md:px-12 relative overflow-hidden z-20">
      
      {/* Drifting Golden Amber Dust Particle System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-20 left-[20%] w-[400px] h-[400px] bg-[#d4af37]/3 rounded-full blur-[120px]" />
        
        {mountedParticles.map((p) => {
          return (
            <motion.div
              key={p.id}
              className="absolute bottom-[-10px] rounded-full bg-gradient-to-tr from-[#e6c280] to-[#d4af37]"
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                filter: 'blur(0.5px)',
              }}
              animate={{
                y: -300,
                x: p.xRange,
                opacity: [0, 0.6, 0.8, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Column 1: Brand Signature & Manifesto */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <span className="font-serif text-2xl tracking-[0.25em] uppercase bg-gradient-to-r from-[#e6c280] via-white to-[#e6c280] bg-clip-text text-transparent font-black block">
            Nectar & Oak
          </span>
          <p className="font-sans text-xs sm:text-sm text-white/40 leading-relaxed font-light max-w-sm">
            We preserve and procure the world’s most pristine chemical expressions. From decades of silent barrel slumber to your modern tasting glass, we treat spirits not just as beverages, but as deep chronological art.
          </p>
          {/* Legal Compliance Label */}
          <div className="flex items-start gap-2 bg-white/[0.02] border border-white/5 p-3 rounded-xl max-w-xs">
            <ShieldAlert className="w-4 h-4 text-[#d4af37]/60 mt-0.5 flex-shrink-0" />
            <span className="text-[9px] font-sans text-white/30 uppercase tracking-wider leading-relaxed">
              Enjoy Responsibly. Must be 21+ to purchase. All allocations are subject to state laws and strict age validation checks.
            </span>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
            Structures
          </h4>
          <ul className="space-y-2.5 font-sans text-xs uppercase tracking-widest font-light text-white/50">
            <li>
              <button onClick={() => scrollToSection('hero')} className="hover:text-[#d4af37] transition-colors cursor-pointer text-left">
                Home Vault
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('cellar')} className="hover:text-[#d4af37] transition-colors cursor-pointer text-left">
                The Cellar
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('heritage')} className="hover:text-[#d4af37] transition-colors cursor-pointer text-left">
                Distillery Heritage
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('sensory')} className="hover:text-[#d4af37] transition-colors cursor-pointer text-left">
                Sensory Balance
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('mixologist')} className="hover:text-[#d4af37] transition-colors cursor-pointer text-left">
                AI Mixologist
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Cellar Hours & Reservations */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
            Tasting Chambers
          </h4>
          <div className="space-y-3 font-sans text-xs text-white/50 leading-relaxed font-light">
            <div>
              <p className="text-[10px] uppercase font-bold text-white/80">Speyside Cask Room</p>
              <p className="text-white/40">101 Whisky Trail, Speyside, Scotland</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-white/80">Bordeaux Reserves</p>
              <p className="text-white/40">Château Cellars, Pauillac, France</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-white/80">Direct Reservations</p>
              <p className="text-[#d4af37]/80 hover:text-[#d4af37] cursor-pointer">reservations@nectarandoak.com</p>
            </div>
          </div>
        </div>

        {/* Column 4: Premium Glassmorphic Newsletter */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
            Allocation Alerts
          </h4>
          <p className="font-sans text-xs text-white/40 leading-relaxed font-light">
            Subscribe to receive private notification keys for rare dunnage releases and limited cask decanting events.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 relative">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                placeholder="connoisseur@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitted}
                className="w-full pl-11 pr-11 py-3 rounded-xl text-xs font-sans bg-white/[0.02] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/[0.04] transition-all"
              />
              <button
                type="submit"
                disabled={isSubmitted}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-[#e6c280] to-[#d4af37] text-black rounded-lg hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all cursor-pointer flex items-center justify-center"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-sans text-red-400 pl-1"
                >
                  {error}
                </motion.p>
              )}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1 text-[10px] font-sans text-[#d4af37] bg-[#d4af37]/5 border border-[#d4af37]/20 p-2.5 rounded-lg w-full"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Keys Sent. Welcome to the allocation roll.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

      </div>

      {/* Base copyright row */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 pt-8 border-t border-white/5 z-10 relative text-[10px] font-sans text-white/30 uppercase tracking-widest font-light">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-[#d4af37]/40" />
          <span>© {new Date().getFullYear()} Nectar & Oak Reserve. All Rights Reserved.</span>
        </div>
        
        {/* Social Badges */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-[#d4af37] transition-colors" aria-label="Instagram">
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="#" className="hover:text-[#d4af37] transition-colors" aria-label="Twitter">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        <span>Curated in Advanced Agentic Coding</span>
      </div>
    </footer>
  );
}
