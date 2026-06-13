'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Sparkles, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface QuoteItem {
  quote: string;
  author: string;
  title: string;
  year: string;
}

const QUOTES: QuoteItem[] = [
  {
    quote: "We do not measure time in years, but in the slow, rhythmic expansion of oak fibers and the quiet exchange of wood and spirit.",
    author: "Alexander MacIntosh",
    title: "Master Cask Cooper",
    year: "Est. 1984",
  },
  {
    quote: "Distillation is rigorous science, but maturation is absolute alchemy. We capture sunlight, peat, and pure spring water, and let them find peace in darkness.",
    author: "Hélène de Montaigne",
    title: "Grand Cru Cellar Master",
    year: "Est. 1991",
  },
];

export default function Masterpiece() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxTextRef = useRef<HTMLDivElement>(null);
  const quoteContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const parallaxText = parallaxTextRef.current;
    const quoteContainer = quoteContainerRef.current;

    if (!section || !parallaxText) return;

    // Background horizontal translation scrub animation
    const textAnim = gsap.fromTo(
      parallaxText,
      { x: '10%' },
      {
        x: '-25%',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      }
    );

    // Fade-in reveal sequence for quote cards
    let quoteTrigger: ScrollTrigger | null = null;
    if (quoteContainer) {
      quoteTrigger = ScrollTrigger.create({
        trigger: quoteContainer,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            quoteContainer.children,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.3,
              ease: 'power3.out',
            }
          );
        },
        once: true,
      });
    }

    return () => {
      textAnim.scrollTrigger?.kill();
      textAnim.kill();
      if (quoteTrigger) quoteTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-40 bg-black overflow-hidden select-none border-t border-white/5 flex flex-col justify-center min-h-[85vh]"
    >
      {/* Visual background atmospheric elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#d4af37]/2 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Custom Gold Ambient Light Sweep */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent animate-pulse" />

      {/* Giant Parallax Backdrop Typography */}
      <div className="absolute top-1/4 left-0 w-full overflow-hidden pointer-events-none select-none z-0">
        <div
          ref={parallaxTextRef}
          className="font-serif text-[12vw] sm:text-[14vw] font-black uppercase text-white/[0.015] tracking-[0.1em] whitespace-nowrap leading-none border-y border-white/[0.01] py-4"
        >
          ALCHEMY OF TIME • ALCHEMY OF TIME
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Tag */}
        <div className="flex items-center space-x-2 text-[#d4af37] mb-8">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em]">
            The Mastercraft Philosophy
          </span>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Philosophical Intro */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl font-black uppercase tracking-wide leading-tight text-white">
              Maturation is the Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6c280] via-[#d4af37] to-[#e6c280]">Fine Art</span>
            </h2>
            <p className="font-sans text-sm text-white/50 leading-relaxed font-light">
              Deep within the thick, stone walls of our estate cellars, our reserves slumber in total silence. Through seasonal cycles and slow evaporation, the liquid breathes through oak staves, absorbing deep amber color and complex aromatics.
            </p>
            <div className="pt-4 flex items-center space-x-2 text-white/40">
              <Compass className="w-4 h-4 text-[#d4af37]" />
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-light">
                Handcrafted copper pots & oak casks
              </span>
            </div>
          </div>

          {/* Right Column: Premium Interactive Quotes */}
          <div
            ref={quoteContainerRef}
            className="lg:col-span-7 space-y-8 flex flex-col justify-start"
          >
            {QUOTES.map((item, index) => (
              <div
                key={index}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                className="opacity-0 backdrop-blur-xl bg-white/[0.01] border border-white/5 hover:border-[#d4af37]/20 p-8 md:p-10 rounded-3xl relative transition-all duration-500 shadow-xl group hover:shadow-[0_15px_30px_rgba(212,175,55,0.02)]"
              >
                {/* Dynamic Spotlight Glow Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.12), transparent 80%)'
                  }}
                />
                
                {/* Large Quote Icon overlay */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-[#d4af37]/5 pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <p className="font-serif text-base sm:text-lg text-white/80 leading-relaxed font-medium italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                        {item.author}
                      </h4>
                      <p className="text-[10px] font-sans text-white/40 uppercase tracking-widest font-light">
                        {item.title}
                      </p>
                    </div>
                    <span className="font-serif text-[10px] tracking-widest text-white/30 uppercase font-light">
                      {item.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
