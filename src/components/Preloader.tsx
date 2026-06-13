'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Elegant count-up animation
    const counterObj = { value: 0 };
    const duration = 2.5; // seconds

    const tl = gsap.timeline({
      onComplete: () => {
        // Complete preloader intro
        const exitTl = gsap.timeline({
          onComplete: onComplete,
        });

        exitTl.to([countRef.current, liquidRef.current, titleRef.current, subtitleRef.current], {
          opacity: 0,
          y: -50,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power4.in',
        });

        exitTl.to(
          preloaderRef.current,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', // premium horizontal slice up
            duration: 1.2,
            ease: 'power4.inOut',
          },
          '-=0.4'
        );
      },
    });

    tl.to(counterObj, {
      value: 100,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        const currentCount = Math.floor(counterObj.value);
        setCount(currentCount);
        // Animate the rising liquid height
        if (liquidRef.current) {
          liquidRef.current.style.height = `${currentCount}%`;
        }
      },
    });

    // Subtitle entrance
    gsap.fromTo(
      [titleRef.current, subtitleRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1.2, ease: 'power3.out' }
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#070708] select-none text-white"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      {/* Decorative Golden Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#b22222] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col items-center max-w-md text-center px-6">
        {/* Animated Wine Glass Loading Container */}
        <div className="relative w-36 h-36 mb-8 flex items-center justify-center border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md">
          {/* Glass Contour outline */}
          <svg
            className="w-20 h-20 text-[#d4af37]/30 absolute z-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Elegant wine glass contour */}
            <path d="M5 3h14v7c0 4.5-3.5 8-8 8s-8-3.5-8-8V3Z" />
            <path d="M12 18v4" />
            <path d="M8 22h8" />
          </svg>

          {/* Liquid Fill Element (inside glass shape) */}
          <div className="w-20 h-20 absolute overflow-hidden pointer-events-none rounded-b-xl" style={{ clipPath: 'path("M5 3h14v7c0 4.5-3.5 8-8 8s-8-3.5-8-8V3Z")' }}>
            <div
              ref={liquidRef}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#800020] via-[#d4af37] to-[#e6c280] w-full transition-all duration-75 ease-out"
              style={{ height: '0%' }}
            >
              {/* Wave SVG moving across inside the liquid */}
              <div className="absolute -top-3 left-0 w-[200%] h-6 animate-[wave_3s_infinite_linear] opacity-80">
                <svg viewBox="0 0 1200 120" className="w-full h-full fill-[#e6c280]">
                  <path d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 C1150,90 1350,30 1500,60 L1500,120 L0,120 Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Counter Percent */}
        <div
          ref={countRef}
          className="font-mono text-6xl font-light tracking-widest text-[#d4af37] select-none mb-6 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
        >
          {count.toString().padStart(3, '0')}%
        </div>

        {/* Brand Text */}
        <h1
          ref={titleRef}
          className="font-serif text-3xl font-bold tracking-widest uppercase mb-2 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-[#f3e5ab] to-white"
        >
          Nectar & Oak
        </h1>
        <p
          ref={subtitleRef}
          className="font-sans text-xs uppercase tracking-[0.25em] text-[#d4af37]/80"
        >
          Curating the World&apos;s Finest Spirits
        </p>
      </div>

      <style jsx global>{`
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
