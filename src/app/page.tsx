'use client';

import React, { useState } from 'react';
import ReduxProvider from '@/components/ReduxProvider';
import Preloader from '@/components/Preloader';
import ThreeCanvas from '@/components/ThreeCanvas';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Heritage from '@/components/Heritage';
import SensoryWheel from '@/components/SensoryWheel';
import Masterpiece from '@/components/Masterpiece';
import Testimonials from '@/components/Testimonials';
import Allocations from '@/components/Allocations';
import AIMixologist from '@/components/AIMixologist';
import Footer from '@/components/Footer';
import ScrollProvider from '@/components/ScrollProvider';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ReduxProvider>
      {/* 3D WebGL Swirling Ambient Background */}
      <ThreeCanvas />

      {/* Preloader Splash Loading Animation */}
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <ScrollProvider>
          {/* Full Scrollable Animated Application */}
          <div className="min-h-screen flex flex-col justify-start select-none relative overflow-x-hidden">
            {/* Main Landing Sections */}
            <main className="flex-grow">
              <Hero />
              <Catalog />
              <Heritage />
              <SensoryWheel />
              <Masterpiece />
              <Testimonials />
              <Allocations />
              <AIMixologist />
            </main>

            {/* Luxury Footer */}
            <Footer />

            {/* Click to Top Scroll Progress Button */}
            <ScrollToTop />
          </div>
        </ScrollProvider>
      )}
    </ReduxProvider>
  );
}
