'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Shield, Sparkles, LogIn } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all reserve credentials.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    // Mock verification
    setTimeout(() => {
      setIsLoading(false);
      const username = email.split('@')[0];
      onLoginSuccess(username.charAt(0).toUpperCase() + username.slice(1));
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
        >
          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-md backdrop-blur-2xl bg-[#09090b]/90 border border-white/10 p-8 rounded-3xl text-left shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#800020]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/5 hover:border-white text-white/50 hover:text-white transition-colors cursor-pointer bg-white/[0.01]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Title / Logo */}
            <div className="text-center mb-8 space-y-2">
              <span className="font-sans text-[9px] uppercase font-bold tracking-[0.25em] text-[#d4af37] flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" /> Connoisseur Club
              </span>
              <h3 className="font-serif text-2xl font-semibold tracking-wider text-white uppercase">
                Member Sign-In
              </h3>
              <p className="font-sans text-[11px] text-white/40 max-w-[280px] mx-auto font-light leading-relaxed">
                Unlock allocations, direct cellar requests, and custom sensory tracking.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="text-center text-xs font-sans text-red-400 bg-red-500/10 border border-red-500/20 py-2.5 rounded-xl">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-white/50">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    required
                    placeholder="member@nectarandoak.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl text-xs font-sans bg-white/[0.02] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/[0.04] transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-white/50">
                    Secret Cask Pass
                  </label>
                  <a href="#" className="text-[9px] font-sans text-[#d4af37]/65 hover:text-[#d4af37] uppercase tracking-wider">
                    Forgot Key?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl text-xs font-sans bg-white/[0.02] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/[0.04] transition-all"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-[#e6c280] to-[#d4af37] text-black font-semibold text-xs font-sans tracking-widest uppercase rounded-xl hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-pulse" /> Verifying Seals...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" /> Authenticate
                  </>
                )}
              </button>
            </form>

            {/* Social single-sign on dividers */}
            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-[9px] font-sans text-white/30 uppercase tracking-widest font-light">
                Or access via
              </span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    onLoginSuccess('Google Guest');
                    onClose();
                  }, 1000);
                }}
                className="py-2.5 px-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-white/70 hover:text-white text-[10px] font-sans tracking-widest uppercase transition-colors cursor-pointer text-center"
              >
                Google
              </button>
              <button
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    onLoginSuccess('Apple Member');
                    onClose();
                  }, 1000);
                }}
                className="py-2.5 px-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-white/70 hover:text-white text-[10px] font-sans tracking-widest uppercase transition-colors cursor-pointer text-center"
              >
                Apple ID
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
