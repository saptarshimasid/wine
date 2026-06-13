'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowDown, Flame, Compass, Star, Award, ShieldCheck, Key, LogOut } from 'lucide-react';
import LoginModal from '@/components/LoginModal';

gsap.registerPlugin(ScrollTrigger);

interface ReserveSpirit {
  id: string;
  name: string;
  category: string;
  age: string;
  abv: string;
  origin: string;
  score: string;
  barrel: string;
  desc: string;
  color: string;
}

const RESERVES: ReserveSpirit[] = [
  {
    id: '1',
    name: 'The Macallan Gran Reserva',
    category: 'Whiskey',
    age: '25 Years',
    abv: '45.8%',
    origin: 'Speyside, Scotland',
    score: '99 PTS',
    barrel: 'First-fill Oloroso Sherry Oak',
    desc: 'An exquisite reserve of legendary depth. Exudes deep notes of dried fruits, ginger warmth, cinnamon, and rich wood smoke.',
    color: 'from-[#d4af37]/20 to-[#b22222]/20',
  },
  {
    id: '2',
    name: 'Château Mouton Rothschild',
    category: 'Wine',
    age: '2010 Vintage',
    abv: '13.5%',
    origin: 'Pauillac, Bordeaux',
    score: '100 PTS',
    barrel: '100% New French Oak Barriques',
    desc: 'A magnificent vintage showing unparalleled precision. Blends layers of blackcurrant, cassis, rich graphite, floral violets, and cedar.',
    color: 'from-[#800020]/20 to-[#4a0404]/20',
  },
  {
    id: '3',
    name: 'Krug Clos d’Ambonnay',
    category: 'Champagne',
    age: '2002 Millésime',
    abv: '12.5%',
    origin: 'Reims, France',
    score: '99 PTS',
    barrel: 'Traditional Small Oak Casks',
    desc: 'An exceptional Blanc de Noirs champagne. Captures pure pinot noir tension, red currant hints, brioche creaminess, and chalky mineral depth.',
    color: 'from-[#f3e5ab]/20 to-[#d4af37]/10',
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const card3DRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeReserve = RESERVES[activeIndex];

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    // Elegant entrance animations
    const tl = gsap.timeline();

    tl.fromTo(
      leftColRef.current ? leftColRef.current.children : [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out' }
    );

    tl.fromTo(
      rightColRef.current,
      { scale: 0.96, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' },
      '-=0.8'
    );

    // Parallax Scroll Effect
    if (heroRef.current) {
      gsap.to(leftColRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(rightColRef.current, {
        y: 80,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // 3D Card Hover Interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = card3DRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation coordinates (-10 to 10 degrees)
    const rx = ((y / rect.height) - 0.5) * -15;
    const ry = ((x / rect.width) - 0.5) * 15;

    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = card3DRef.current;
    if (!card) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const scrollToCellar = () => {
    document.getElementById('cellar')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMixologist = () => {
    document.getElementById('mixologist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between text-white overflow-hidden py-8 px-6 md:px-12 select-none"
    >
      {/* Cinematic Premium Whiskey Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-[0.7] contrast-[1.1]"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-pouring-whiskey-into-a-glass-with-ice-40019-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Luxury Dark-Theme Blending Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070708]/80 via-[#070708]/30 to-[#070708] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(7,7,8,0.95)_100%)] z-10" />
      </div>

      {/* Floating navigation header */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between z-40 backdrop-blur-xl bg-white/[0.01] border border-white/10 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl">
        <div className="flex items-center space-x-2">
          <span className="font-serif text-sm sm:text-xl tracking-[0.12em] sm:tracking-[0.25em] uppercase bg-gradient-to-r from-[#e6c280] via-white to-[#e6c280] bg-clip-text text-transparent font-black">
            Nectar & Oak
          </span>
        </div>
        <nav className="hidden md:flex space-x-8 font-sans text-xs uppercase tracking-widest font-light text-white/50">
          <a href="#cellar" className="hover:text-[#d4af37] transition-colors duration-300">The Cellar</a>
          <a href="#heritage" className="hover:text-[#d4af37] transition-colors duration-300">Heritage</a>
          <a href="#sensory" className="hover:text-[#d4af37] transition-colors duration-300">Sensory</a>
          <a href="#mixologist" className="hover:text-[#d4af37] transition-colors duration-300">AI Mixologist</a>
        </nav>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-2 sm:space-x-3 bg-[#d4af37]/5 border border-[#d4af37]/30 hover:border-[#d4af37] px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-sans transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <span className="text-[#d4af37] flex items-center gap-1 sm:gap-1.5 font-bold uppercase tracking-wider text-[8px] sm:text-[10px] max-w-[80px] sm:max-w-none truncate">
                <Key className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse flex-shrink-0" /> {currentUser}
              </span>
              <button
                onClick={() => setCurrentUser(null)}
                className="text-white/40 hover:text-red-400 transition-colors cursor-pointer ml-1 flex-shrink-0"
                title="Log Out"
              >
                <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="border border-[#d4af37]/30 hover:border-[#d4af37] text-[10px] sm:text-xs font-sans tracking-widest uppercase py-2 sm:py-2.5 px-3.5 sm:px-6 rounded-full bg-[#d4af37]/5 hover:bg-[#d4af37]/20 text-[#d4af37] transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer font-medium"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Two-Column split landing layout */}
      <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 pt-16 pb-8">
        
        {/* Left Column: Premium Brand Philosophy */}
        <div
          ref={leftColRef}
          className="lg:col-span-6 flex flex-col justify-center text-left space-y-8"
        >
          {/* Reserve Tag */}
          <div className="flex items-center space-x-2 bg-white/[0.03] border border-white/5 py-1.5 px-3 rounded-full w-fit">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#d4af37]">
              Grand Cru Reserve & Spirits
            </span>
          </div>

          {/* Premium Headline */}
          <h1
            ref={titleRef}
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-wide leading-[1.05]"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
              Savor The
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e6c280] via-[#d4af37] to-[#e6c280]">
              Liquid Gold
            </span>
          </h1>

          {/* Luxury Description */}
          <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed font-light max-w-lg">
            Immerse yourself in our private reserves. From 25-year sherry-aged Scotch to elite Grand Cru Bordeaux vintages, we curate rare spirits that transform degustation into absolute art.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToCellar}
              className="flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#e6c280] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e6c280] text-black font-semibold text-xs font-sans tracking-widest uppercase rounded-full hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-500 cursor-pointer group"
            >
              Enter Vaults <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToMixologist}
              className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 hover:border-white/20 text-white text-xs font-sans tracking-widest uppercase rounded-full transition-colors cursor-pointer"
            >
              Consult Mixologist
            </button>
          </div>

          {/* Elite Badges Grid */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5 max-w-md">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]"/>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white/80">Curation</span>
              </div>
              <p className="text-[10px] font-sans text-white/40">100% Authentic</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5">
                <Star className="w-4 h-4 text-[#d4af37]"/>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white/80">Reviews</span>
              </div>
              <p className="text-[10px] font-sans text-white/40">98+ Cellar Score</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-[#d4af37]"/>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white/80">Excellence</span>
              </div>
              <p className="text-[10px] font-sans text-white/40">Limited Releases</p>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Interactive 3D Showcase Card */}
        <div
          ref={rightColRef}
          className="lg:col-span-6 flex flex-col items-center justify-center relative"
        >
          {/* Reserve Type Tab Switcher */}
          <div className="flex space-x-2 bg-black/40 border border-white/10 p-1.5 rounded-full mb-6 relative z-20">
            {RESERVES.map((res, index) => (
              <button
                key={res.id}
                onClick={() => setActiveIndex(index)}
                className={`px-4 py-2 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  activeIndex === index
                    ? 'bg-[#d4af37] text-black font-bold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {res.category}
              </button>
            ))}
          </div>

          {/* Interactive 3D Tilt Showcase Card */}
          <div
            ref={card3DRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-md backdrop-blur-2xl bg-white/[0.01] border border-white/10 rounded-3xl p-8 relative shadow-2xl transition-all duration-200 ease-out cursor-default overflow-hidden group"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            {/* Dynamic Spotlight Glow Overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
              style={{
                background: 'radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.15), transparent 80%)'
              }}
            />

            {/* Swirling color gradient backplate inside the card matching selection */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${activeReserve.color} opacity-30 transition-all duration-700 pointer-events-none`} />

            {/* Glowing orb */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none animate-pulse" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeReserve.id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-6 relative z-10"
              >
                {/* Product Tags */}
                <div className="flex items-center justify-between">
                  <span className="bg-[#d4af37]/10 text-[#d4af37] text-[9px] uppercase font-sans font-bold tracking-widest px-2.5 py-1 rounded">
                    {activeReserve.category} Vault
                  </span>
                  <span className="font-serif text-[#d4af37] font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" /> {activeReserve.score}
                  </span>
                </div>

                {/* Main Product Title */}
                <h3 className="font-serif text-2xl font-bold tracking-wide text-white leading-tight">
                  {activeReserve.name}
                </h3>

                {/* Subtitle properties */}
                <div className="grid grid-cols-2 gap-4 text-xs font-sans text-white/50 border-y border-white/5 py-4">
                  <div className="space-y-0.5">
                    <p className="text-[9px] uppercase tracking-wider text-white/30">Aging / Vintage</p>
                    <p className="font-semibold text-white/80">{activeReserve.age}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] uppercase tracking-wider text-white/30">Proof / ABV</p>
                    <p className="font-semibold text-white/80">{activeReserve.abv}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] uppercase tracking-wider text-white/30">Origin</p>
                    <p className="font-semibold text-white/80">{activeReserve.origin}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] uppercase tracking-wider text-white/30">Cask / Wood</p>
                    <p className="font-semibold text-white/80 truncate max-w-[150px]" title={activeReserve.barrel}>
                      {activeReserve.barrel}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-xs text-white/60 leading-relaxed font-light min-h-[72px]">
                  {activeReserve.desc}
                </p>

                {/* Luxury Decanter / Outline Representation */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="font-sans text-[10px] text-white/30 uppercase tracking-[0.2em] font-light">
                    Exclusive Reserve allocation
                  </span>
                  <div className="flex items-center space-x-1">
                    <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="text-[10px] font-sans text-[#d4af37] font-semibold">Rare Edition</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        onClick={scrollToCellar}
        className="flex flex-col items-center justify-center z-10 cursor-pointer animate-bounce group pb-4"
      >
        <span className="font-sans text-[9px] font-light uppercase tracking-[0.3em] text-white/30 group-hover:text-[#d4af37] transition-colors duration-300 mb-1.5">
          Enter The Cellar
        </span>
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#d4af37] transition-colors duration-300">
          <ArrowDown className="w-4 h-4 text-white/40 group-hover:text-[#d4af37] transition-colors duration-300" />
        </div>
      </div>

      {/* Member Login Modal Overlay */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(name) => setCurrentUser(name)}
      />
    </section>
  );
}

