'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, BarChart3, Wind, Compass, Sparkles, GlassWater } from 'lucide-react';

interface TasteProfile {
  aroma: number; // percentage (0 - 100)
  body: number;
  sweetness: number;
  finish: number;
  cask: number;
  aromaType: string;
  bodyType: string;
  sweetnessType: string;
  finishType: string;
  caskType: string;
  manifesto: string;
}

const PROFILES: Record<string, TasteProfile> = {
  Whiskey: {
    aroma: 95,
    body: 88,
    sweetness: 35,
    finish: 92,
    cask: 90,
    aromaType: "Peat Smoke, Ginger Warmth & Dried Violets",
    bodyType: "Robust, Richly Oily, Viscous Full-Body",
    sweetnessType: "Sherry Dried Plums & Sweet Vanilla Undercurrent",
    finishType: "Infinite Dry Linger, Warming Cinnamon & Wood Ash",
    caskType: "Heavy Charred White Oak & Oloroso Wood Esters",
    manifesto: "Peated single malts extract maximum structural wood extractives. Double pot distillation leaves healthy heavier-chain alcohol esters intact, which slow-bubble in warehouse casks, developing an infinite, smoky structural finish."
  },
  Wine: {
    aroma: 92,
    body: 82,
    sweetness: 12,
    finish: 85,
    cask: 65,
    aromaType: "Cassis, Violet Flowers & Crushed Graphite",
    bodyType: "Structured Tannins, High Acidity & Velvet Dry",
    sweetnessType: "Bone Dry with Rich Fruity Blackberry Extracts",
    finishType: "Structured Linger, Savory Earth & Leather Accents",
    caskType: "24-Month French Allier Forest Oak Barrique aging",
    manifesto: "Noble grapes rely heavily on terroir structure and structural tannins. French forest barriques soften harsh wine acids over years, reacting slowly with atmospheric oxygen to resolve absolute fruit purity."
  },
  Rum: {
    aroma: 88,
    body: 76,
    sweetness: 72,
    finish: 80,
    cask: 80,
    aromaType: "Toffee, Roasted Sugar Cane & Butterscotch",
    bodyType: "Heavy Syrup, Molasses Cream & Warm Viscosity",
    sweetnessType: "Rich Toasted Caramel, Banana & Dark Orange Peel",
    finishType: "Lush Linger, Spiced Demerara Sugar & Oak wood",
    caskType: "Ex-Bourbon American Casks & Cognac wood finishes",
    manifesto: "Distilled entirely from pure virgin sugarcane honey or molasses, premium rums exhibit warm, sweet caramel ester profiles. High-altitude warehouse aging restricts excessive extraction, retaining elegant, sweet fruit curves."
  },
  Champagne: {
    aroma: 85,
    body: 40,
    sweetness: 28,
    finish: 78,
    cask: 35,
    aromaType: "White Orchard Flowers, Lime Zest & Fresh Brioche",
    bodyType: "Pristine Effervescence, Light Weight & Tensile",
    sweetnessType: "Crisp Mineral Acidity with Honeyed Apricot hints",
    finishType: "Clean Snap Linger, Saline Chalky Freshness & Apple",
    caskType: "Traditional Small Oak Tun vats or Stainless steel",
    manifesto: "Secondary bottle fermentation locks down carbon dioxide bubbles. Chalky limestone soil creates pristine grape acidity, which matches perfectly with decades of yeast autolysis to yield creamy, mineral blanc de noirs."
  },
  Beer: {
    aroma: 70,
    body: 60,
    sweetness: 22,
    finish: 65,
    cask: 20,
    aromaType: "Roasted Dark Malts, Dark Cocoa & Toasted Oats",
    bodyType: "Creamy Head, Thick Roasted Texture & Carbonated",
    sweetnessType: "Subtle Brown Sugar, Espresso & Nutty Bitterness",
    finishType: "Roasted Bitter Linger, Coffee Grounds & Toffee",
    caskType: "Brief Oak Aging (or Untreated fermentation)",
    manifesto: "A rich Abbey style dark Doppelbock combines roasted wheat and barley grains. Warm bottom-fermenting yeasts develop dense carbohydrate viscosity, yielding rich roasted cocoa and dark stone-fruit balance."
  },
  Vodka: {
    aroma: 35,
    body: 45,
    sweetness: 5,
    finish: 40,
    cask: 0,
    aromaType: "Clean Alpine Air, Delicate Vanilla & White Pepper",
    bodyType: "Pristine Purity, Crisp & Velvety Smooth Texture",
    sweetnessType: "Virtually Bone Dry, Faintly Sweet Grain Esters",
    finishType: "Impeccably Clean Linger, Brief Warming Alcohol Snaps",
    caskType: "Unaged, quartz sand and quadruple silver filtration",
    manifesto: "Premium vodka is designed to show absolute distillation purity. Utilizing elite winter grains and artesian mineral water, multiple column distillations strip away heavy organic fusel oils, leaving an ultra-clean velvet body and pristine structure."
  },
  Breezer: {
    aroma: 75,
    body: 50,
    sweetness: 65,
    finish: 60,
    cask: 0,
    aromaType: "Fresh Huckleberry, Crushed Wild Blackberry & Lime Zest",
    bodyType: "Effervescent Carbonation, Refreshing Light-Body",
    sweetnessType: "Delicate Fruit Sweetness, Vibrant Citrus Acidity",
    finishType: "Crisp & Clean Linger, Ripe Mountain Berries & Honey",
    caskType: "Natural tank infusion of fresh fruit nectars and spirits",
    manifesto: "Artisanal breezer formulations combine premium neutral grain spirits with freshly crushed mountain berry nectars and carbonated mineral spring water. This produces a bright, effervescent refresher of absolute summer purity."
  }
};

const CATEGORIES = ['Whiskey', 'Wine', 'Rum', 'Champagne', 'Beer', 'Vodka', 'Breezer'];

export default function SensoryWheel() {
  const [activeCategory, setActiveCategory] = useState('Whiskey');
  const profile = PROFILES[activeCategory];

  // Radial Gauge Circular Calculations
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="sensory" className="relative w-full max-w-7xl mx-auto px-6 py-24 text-white z-10">
      {/* Section Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

      {/* Heading */}
      <div className="text-center mb-16 space-y-3">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#d4af37]">
          Taste Geometry
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-wider">
          Alchemical Sensory Balance
        </h2>
        <p className="font-sans text-sm text-white/50 max-w-xl mx-auto font-light leading-relaxed">
          Hover or tap through categories to inspect organic flavor chemistry and cellar structures measured across five sensory variables.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="flex justify-center gap-3 mb-16 flex-wrap">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 relative overflow-hidden cursor-pointer ${
                isActive
                  ? 'text-black font-semibold'
                  : 'text-white/60 border border-white/5 bg-white/[0.01] hover:bg-white/[0.04]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSensoryTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#e6c280] to-[#d4af37]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Sensory Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: 5 Interactive SVG Circular Gauges */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
          <SensoryGauge label="Aroma Profile" value={profile.aroma} subtitle={profile.aromaType} icon={<Wind className="w-4 h-4 text-[#d4af37]" />} circumference={circumference} radius={radius} />
          <SensoryGauge label="Body & Tannin" value={profile.body} subtitle={profile.bodyType} icon={<GlassWater className="w-4 h-4 text-[#d4af37]" />} circumference={circumference} radius={radius} />
          <SensoryGauge label="Sweetness Index" value={profile.sweetness} subtitle={profile.sweetnessType} icon={<Sparkles className="w-4 h-4 text-[#d4af37]" />} circumference={circumference} radius={radius} />
          <SensoryGauge label="Finish Duration" value={profile.finish} subtitle={profile.finishType} icon={<BarChart3 className="w-4 h-4 text-[#d4af37]" />} circumference={circumference} radius={radius} />
          <SensoryGauge label="Cask & Wood" value={profile.cask} subtitle={profile.caskType} icon={<Compass className="w-4 h-4 text-[#d4af37]" />} circumference={circumference} radius={radius} />
          
          {/* Aesthetic Badge Gauge */}
          <div className="backdrop-blur-md bg-white/[0.01] border border-white/5 p-5 rounded-3xl flex flex-col justify-center items-center text-center space-y-2">
            <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#d4af37]">Cellar Level</span>
            <span className="font-serif text-3xl text-white font-bold">100%</span>
            <span className="text-[10px] font-sans text-white/30 uppercase">Master Grade Approved</span>
          </div>
        </div>

        {/* Right Column: Narrative Spirit Profile Analysis */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="backdrop-blur-2xl bg-white/[0.01] border border-white/10 p-8 rounded-3xl relative shadow-2xl overflow-hidden"
            >
              {/* Gold gradient sweep */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/2 to-transparent pointer-events-none" />

              <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                Cellar Chemistry Analysis
              </span>
              
              <h3 className="font-serif text-2xl font-bold tracking-wider text-white uppercase mt-2 mb-4">
                {activeCategory} Reserve DNA
              </h3>

              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light mb-6">
                {profile.manifesto}
              </p>

              {/* Chemical variables specs list */}
              <div className="space-y-4 border-t border-white/5 pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 flex-shrink-0" />
                  <div className="space-y-0.5 text-left">
                    <p className="text-[9px] font-sans text-white/30 uppercase tracking-widest">Active Ester Compound</p>
                    <p className="text-xs font-sans text-white/80 font-semibold">{profile.aromaType.split(',')[0]}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 flex-shrink-0" />
                  <div className="space-y-0.5 text-left">
                    <p className="text-[9px] font-sans text-white/30 uppercase tracking-widest">Maturation Influence</p>
                    <p className="text-xs font-sans text-white/80 font-semibold">{profile.caskType}</p>
                  </div>
                </div>
              </div>

              {/* Compliance check signature */}
              <div className="flex items-center gap-2 pt-6 mt-6 border-t border-white/5 text-[9px] font-sans text-white/30 uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5 text-[#d4af37]/60" /> Taste validation verified under cask code 09-ND
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

interface GaugeProps {
  label: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  circumference: number;
  radius: number;
}

function SensoryGauge({ label, value, subtitle, icon, circumference, radius }: GaugeProps) {
  // Stroke Offset mapping
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="group backdrop-blur-md bg-white/[0.01] border border-white/10 hover:border-[#d4af37]/30 p-5 rounded-3xl flex flex-col items-center text-center space-y-4 hover:bg-white/[0.03] transition-all duration-500 shadow-lg">
      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white/55 group-hover:text-white transition-colors">
        {label}
      </span>

      {/* SVG Radial Meter */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Glow backdrop */}
        <div className="absolute w-12 h-12 bg-[#d4af37]/5 rounded-full blur-md group-hover:bg-[#d4af37]/10 transition-colors duration-500" />
        
        <svg className="w-20 h-20 -rotate-90">
          {/* Base track circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-white/5 fill-none"
            strokeWidth="3.5"
          />
          {/* Colored progress circle */}
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-[#d4af37] fill-none"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        {/* Inner Icon */}
        <div className="absolute flex flex-col items-center justify-center">
          {icon}
          <span className="text-xs font-serif font-black text-white/90 mt-0.5">{value}%</span>
        </div>
      </div>

      {/* Dynamic subtitle description line */}
      <p className="text-[10px] font-sans text-white/40 leading-relaxed font-light line-clamp-2 max-w-[120px]">
        {subtitle}
      </p>
    </div>
  );
}
