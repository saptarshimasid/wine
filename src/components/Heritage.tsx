'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grape, Waves, Flame, Box, ShieldCheck, ChevronRight, Clock, Star } from 'lucide-react';

interface Stage {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  duration: string;
  alchemyLabel: string;
  description: string;
  caskNote: string;
  chemistry: string[];
}

const STAGES: Stage[] = [
  {
    id: 1,
    icon: <Grape className="w-6 h-6 text-[#e6c280]" />,
    title: "Noble Harvest & Crush",
    subtitle: "The Selection of Organic Grains & Noble Vines",
    duration: "1 - 3 Days",
    alchemyLabel: "Sensory Foundation",
    description: "Every master batch begins with structural selection. We source premium organic barley from Speyside peatlands, estate-grown Cabernet grapes from Pauillac, and pure sugarcane molasses from Caribbean shores. Grinding, mashing, and pressing releases natural fermentable nectars.",
    caskNote: "Sugar content and enzyme balance determines the future viscosity and body.",
    chemistry: ["Noble Starches", "Enzymatic Conversions", "Natural Grapes Crush"]
  },
  {
    id: 2,
    icon: <Waves className="w-6 h-6 text-[#e6c280]" />,
    title: "Slow Fermentation",
    subtitle: "Yeast Conversion in Open-Top Oregon Pine Vats",
    duration: "4 - 7 Days",
    alchemyLabel: "Ester Formulation",
    description: "The liquid nectar meets custom strains of active yeasts in massive, historic Oregon pine washbacks. A slow, highly monitored bubbling ensues, converting raw sugars into carbon dioxide and a highly complex, aromatic 8% wash saturated with delicate esters.",
    caskNote: "Oregon pine vats sustain natural bacterial microflora, imparting crucial fruitiness.",
    chemistry: ["Esterification", "Active Yeast Culturing", "Wash formulation"]
  },
  {
    id: 3,
    icon: <Flame className="w-6 h-6 text-[#e6c280]" />,
    title: "Swan-Neck Distillation",
    subtitle: "Double Distillation inside Tall Copper Pot Stills",
    duration: "12 - 24 Hours",
    alchemyLabel: "Vapor Selection",
    description: "The aromatic wash is boiled in towering copper pot stills. As vapor ascends the slender neck, copper interactions extract undesirable sulfur compounds. Master distillers discard the harsh 'heads' and 'tails', locking down only the crystal-clear 'heart'.",
    caskNote: "Swan-neck height dictates copper contact time, forming a remarkably smooth spirit.",
    chemistry: ["Sulfur Extraction", "Copper Fractionation", "Heart Cut Harvesting"]
  },
  {
    id: 4,
    icon: <Box className="w-6 h-6 text-[#e6c280]" />,
    title: "Cask Maturation",
    subtitle: "Decades of Oak Alchemy in Dark Dunnage Warehouses",
    duration: "10 - 25+ Years",
    alchemyLabel: "Lignin Dissolution",
    description: "The raw spirit is filled into hand-charred American white oak or Oloroso sherry casks. Over decades, the spirit expands into the oak pores during summer and retracts in winter, dissolving vanillin and wood lignins, emerging as amber liquid gold.",
    caskNote: "Over 70% of a mature spirit's flavor and color is drawn entirely from wood lignin alchemy.",
    chemistry: ["Vanillin Dissolution", "Oxidative Esters", "Tannin Softening"]
  }
];

export default function Heritage() {
  const [activeStageId, setActiveStageId] = useState(1);
  const activeStage = STAGES.find(s => s.id === activeStageId)!;

  return (
    <section id="heritage" className="relative w-full max-w-7xl mx-auto px-6 py-24 text-white z-10 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] bg-[#d4af37]/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-[#800020]/2 rounded-full blur-[100px] pointer-events-none" />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 space-y-3"
      >
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#d4af37]">
          Time, Timber & Copper
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-wider">
          The Distillery Heritage
        </h2>
        <p className="font-sans text-sm text-white/50 max-w-xl mx-auto font-light leading-relaxed">
          Embark on the chronological transformation. Follow the painstaking path from organic fields to aged liquid gold reserves.
        </p>
      </motion.div>

      {/* Main Grid: Stages Tracker & Detailed Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        
        {/* Left Column: Interactive Stages Selector */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-serif text-lg font-bold tracking-wider text-white/80 uppercase mb-4 pl-2 border-l-2 border-[#d4af37]">
            Chronological Pillars
          </h3>
          <div className="relative pl-4 space-y-4 before:absolute before:left-[27px] before:top-4 before:bottom-4 before:w-[1px] before:bg-white/10">
            {STAGES.map((stage) => {
              const isSelected = stage.id === activeStageId;
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  }}
                  className={`group relative flex items-start gap-5 p-4 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.03] border-[#d4af37]/45 shadow-[0_4px_20px_rgba(212,175,55,0.05)]'
                      : 'bg-transparent border-transparent hover:bg-white/[0.01]'
                  }`}
                >
                  {/* Dynamic Spotlight Glow Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                    style={{
                      background: 'radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.12), transparent 80%)'
                    }}
                  />
                  {/* Indicator Icon Ball */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border z-10 transition-all duration-500 relative ${
                    isSelected
                      ? 'bg-[#d4af37] border-[#d4af37] text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                      : 'bg-[#121214] border-white/10 text-white/40 group-hover:border-white/30 group-hover:text-white'
                  }`}>
                    {isSelected ? <CheckCircleIcon /> : <span className="text-[10px] font-bold font-sans">{stage.id}</span>}
                  </div>

                  {/* Stage titles and metadata */}
                  <div className="space-y-1 flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-serif text-sm font-semibold tracking-wide transition-colors ${
                        isSelected ? 'text-[#d4af37]' : 'text-white/80 group-hover:text-white'
                      }`}>
                        {stage.title}
                      </h4>
                      <span className="text-[9px] font-sans text-white/30 uppercase font-light">
                        {stage.duration}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-white/40 leading-relaxed font-light line-clamp-1">
                      {stage.subtitle}
                    </p>
                  </div>

                  {/* Small Chevron indicator */}
                  <ChevronRight className={`w-4 h-4 mt-1 transition-transform duration-500 ${
                    isSelected ? 'translate-x-0.5 text-[#d4af37]' : 'opacity-0 group-hover:opacity-40'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Animated Showcase Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              className="w-full backdrop-blur-2xl bg-white/[0.01] border border-white/10 p-8 rounded-3xl relative shadow-2xl overflow-hidden group"
            >
              {/* Dynamic Spotlight Glow Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{
                  background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.12), transparent 80%)'
                }}
              />
              {/* Decorative Subtle Glowing Core */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-[#d4af37]/5 rounded-full blur-xl pointer-events-none" />

              {/* Title Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#d4af37]/10 rounded-xl border border-[#d4af37]/20">
                    {activeStage.icon}
                  </div>
                  <div>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                    Stage {activeStage.id} | {activeStage.alchemyLabel}
                  </span>
                  <h3 className="font-serif text-xl font-bold tracking-wide text-white">
                    {activeStage.title}
                  </h3>
                </div>
              </div>
              
              {/* Duration Tag */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-full w-fit">
                <Clock className="w-3.5 h-3.5 text-white/40" />
                <span className="text-[10px] font-sans font-medium text-white/70 uppercase">
                  {activeStage.duration}
                </span>
              </div>
            </div>

            {/* Main Description */}
            <div className="space-y-6">
              <p className="font-sans text-sm text-white/60 leading-relaxed font-light">
                {activeStage.description}
              </p>

              {/* Oak wood citation box */}
              <div className="p-4 bg-[#d4af37]/5 border-l-2 border-[#d4af37] rounded-r-xl space-y-1">
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Cooper Note
                </span>
                <p className="text-xs font-sans text-white/70 leading-relaxed font-light italic">
                  &ldquo;{activeStage.caskNote}&rdquo;
                </p>
              </div>

                {/* Chemistry Variables tags */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-white/40 block">
                    Alchemy Variables
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeStage.chemistry.map((chem) => (
                      <span
                        key={chem}
                        className="text-[10px] font-sans text-white/80 bg-white/[0.02] border border-white/10 px-3.5 py-1.5 rounded-full hover:border-[#d4af37]/30 transition-colors"
                      >
                        {chem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legal Certificate badge */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-sans text-white/30">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> Controlled Heritage Standard
                </span>
                <span>Batch Reserve No. 82-A</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </motion.div>
    </section>
  );
}

// Small helper Check icon
function CheckCircleIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
