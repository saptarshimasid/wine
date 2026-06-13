'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string; // Emoji monogram or initial
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sir Alistair Vance',
    role: 'Grand Sommelier & Cellar Advisor',
    content: 'The Château Margaux allocation is pristine. Nectar & Oak remains my absolute premier destination for sourcing rare, investment-grade bottles. Their temperature-controlled logistics and impeccable customer care are second to none.',
    rating: 5,
    avatar: '🍷',
  },
  {
    id: 2,
    name: 'Lady Sophia Thorne',
    role: 'Hospitality Collector & Estate Owner',
    content: 'Their bespoke AI Mixologist formulated a smoked rosemary whiskey profile that completely redefined our high-profile estate dinner. The dynamic sensory precision and balance of flavors were absolute perfection.',
    rating: 5,
    avatar: '🥃',
  },
  {
    id: 3,
    name: 'Marcus Aurelius Chen',
    role: 'Rare Cask Investor',
    content: 'Unrivaled authentication vaults. Knowing every single bottle of rare Speyside Single Malt is verified under cask-grade certification adds absolute peace of mind. Truly a masterpiece of digital spirits curation.',
    rating: 5,
    avatar: '⚜️',
  },
  {
    id: 4,
    name: 'Dr. Elena Rostova',
    role: 'Sensory Chemist & Spirits Judge',
    content: 'The artisanal wild berry RTD is a masterclass in fruit balance—sublime berry freshness matching perfectly with French neutral spirit purity. Crisp, effervescent, and impeccably clean in its structural finish.',
    rating: 5,
    avatar: '🍹',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1));
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="relative w-full max-w-7xl mx-auto px-6 py-24 text-white z-10 overflow-hidden">
      {/* Visual Section Break Decorator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

      {/* Heading */}
      <div className="text-center mb-16 space-y-3">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#d4af37]">
          Connoisseur Guild
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-wider">
          Collector Chronicles
        </h2>
        <p className="font-sans text-sm text-white/50 max-w-xl mx-auto font-light leading-relaxed">
          Read raw sensory accounts, vintage acquisition notes, and alchemical appraisals from our most esteemed VIP guild members.
        </p>
      </div>

      {/* Testimonial Box */}
      <div className="relative max-w-4xl mx-auto min-h-[380px] sm:min-h-[320px] flex items-center justify-center px-4 sm:px-12">
        {/* Glow backdrop decorator */}
        <div className="absolute w-64 h-64 bg-[#d4af37]/3 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }}
            className="group relative w-full backdrop-blur-2xl bg-white/[0.01] border border-white/10 p-8 sm:p-12 rounded-3xl flex flex-col items-center text-center space-y-6 hover:border-[#d4af37]/20 transition-all duration-500 shadow-2xl overflow-hidden"
          >
            {/* Dynamic Spotlight Glow Overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.08), transparent 80%)'
              }}
            />

            {/* Quote Icon */}
            <Quote className="w-8 h-8 text-[#d4af37]/30 group-hover:text-[#d4af37]/60 transition-colors duration-500 z-10" />

            {/* Rating Stars */}
            <div className="flex items-center space-x-1 z-10">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#d4af37] fill-[#d4af37] drop-shadow-[0_0_4px_rgba(212,175,55,0.4)]" />
              ))}
            </div>

            {/* Review Content */}
            <p className="font-serif text-lg sm:text-xl text-white/90 leading-relaxed font-light z-10 max-w-2xl italic">
              &ldquo;{current.content}&rdquo;
            </p>

            {/* Author Profile Info */}
            <div className="flex flex-col items-center space-y-2 z-10 pt-4">
              {/* Avatar Emoji / Monogram */}
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-2xl relative shadow-md group-hover:scale-105 transition-transform">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 select-none">{current.avatar}</span>
              </div>

              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wider text-white flex items-center justify-center gap-1.5">
                  {current.name}
                  <span title="Verified Guild Connoisseur" className="flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37] opacity-80" />
                  </span>
                </h4>
                <p className="text-[10px] font-sans text-white/40 uppercase tracking-widest mt-0.5">{current.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Left Arrow Controller */}
        <button
          onClick={handlePrev}
          className="absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/10 hover:border-[#d4af37]/50 bg-black/40 hover:bg-black/60 text-white/60 hover:text-white transition-all cursor-pointer z-20 hover:scale-105 active:scale-95"
          title="Previous Appraisement"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Arrow Controller */}
        <button
          onClick={handleNext}
          className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/10 hover:border-[#d4af37]/50 bg-black/40 hover:bg-black/60 text-white/60 hover:text-white transition-all cursor-pointer z-20 hover:scale-105 active:scale-95"
          title="Next Appraisement"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slide Index Indicators (Dots) */}
      <div className="flex justify-center items-center space-x-2 mt-8 z-10 relative">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentIndex ? 'w-6 bg-[#d4af37]' : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
