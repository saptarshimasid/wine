'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG progress variables
  const radius = 22;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md bg-black/40 border border-white/10 hover:border-[#d4af37]/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-[#d4af37] transition-colors duration-300 cursor-pointer group"
          title="Scroll to Top"
        >
          {/* Progress circle */}
          <svg className="absolute w-full h-full -rotate-90 pointer-events-none" width="48" height="48">
            <circle
              className="text-white/5"
              stroke="currentColor"
              strokeWidth={stroke}
              fill="transparent"
              r={normalizedRadius}
              cx="24"
              cy="24"
            />
            <circle
              className="text-[#d4af37] transition-all duration-100 ease-out"
              stroke="currentColor"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              fill="transparent"
              r={normalizedRadius}
              cx="24"
              cy="24"
            />
          </svg>
          <ArrowUp className="w-5 h-5 text-white/70 group-hover:text-[#d4af37] transition-colors duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
