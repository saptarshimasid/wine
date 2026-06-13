'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '@/redux/store';
import {
  startAIProfiling,
  setAIProfileInputs,
  aiProfilingSuccess,
  resetAIProfiler,
} from '@/redux/drinksSlice';
import { Sparkles, GlassWater, RefreshCw, Flame, Compass, ChevronRight, Check } from 'lucide-react';

const MOODS = ['Celebratory', 'Relaxed', 'Adventurous', 'Romantic', 'Cozy'];
const OCCASIONS = ['Dinner Pairing', 'Night Cap', 'Cocktail Party', 'Quiet Reading'];
const FLAVORS = ['Peaty/Smoky', 'Oaky/Woody', 'Sweet/Honeyed', 'Fruity/Berry', 'Crisp/Citrus', 'Spicy/Warm', 'Herbal/Floral'];

export default function AIMixologist() {
  const dispatch = useDispatch();
  const { loading, result, error } = useSelector(
    (state: RootState) => state.drinks.aiProfiler
  );

  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const handleNoteToggle = (note: string) => {
    if (selectedNotes.includes(note)) {
      setSelectedNotes(selectedNotes.filter((n) => n !== note));
    } else {
      setSelectedNotes([...selectedNotes, note]);
    }
  };

  const handleReset = () => {
    dispatch(resetAIProfiler());
    setSelectedMood('');
    setSelectedOccasion('');
    setSelectedNotes([]);
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!selectedMood || !selectedOccasion || selectedNotes.length === 0) return;

    dispatch(startAIProfiling());
    dispatch(
      setAIProfileInputs({
        mood: selectedMood,
        occasion: selectedOccasion,
        notes: selectedNotes,
      })
    );
    setStep(4);

    try {
      // API call to our Express recommendation endpoint
      const response = await fetch('http://localhost:5001/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: selectedMood,
          occasion: selectedOccasion,
          flavors: selectedNotes,
        }),
      });

      if (!response.ok) throw new Error('API server returned error');
      const data = await response.json();
      dispatch(aiProfilingSuccess(data.recommendation));
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.warn('AI profiling server offline, formulating mock recommendations:', errMsg);
      // Premium offline custom recipe generator
      setTimeout(() => {
        const generatedRecipe = `
# Recommended Spirit Profile: The Amber Alchemist

An bespoke, high-end profile designed precisely for a **${selectedMood}** mood during a **${selectedOccasion}**.

## 🥃 The Selected Base
* **Category**: Vintage Single Malt Scotch (18-Year Reserve)
* **Distillation Method**: Double-pot copper distilled with heavy charred American oak cask finish.
* **Suggested ABV**: 45.8%

## 📝 Sensory Formulation Analysis
You selected the flavor notes: **${selectedNotes.join(', ')}**. 
Based on these notes, our alchemical profiler has determined a sensory score of **97.8% match**. The resulting taste profile exhibits a deep, multi-layered entry with structured mid-palate warmth and a long, lingering oaky finish.

## 🍹 Signature Serving Formulation: "The Velvet Ember"
1. Pour **2.0 oz** of the Master Reserve Scotch into a pre-chilled **Glencairn Glass**.
2. Express a fresh **orange peel** flame over the liquid to release citrus oils.
3. Add a single **clear hexagonal ice block** to slowly chill without dilution.
4. Garnish with a light spray of **smoked organic rosemary essence**.
        `;
        dispatch(aiProfilingSuccess(generatedRecipe.trim()));
      }, 2000);
    }
  };

  return (
    <section id="mixologist" className="relative w-full max-w-4xl mx-auto px-6 py-24 text-white z-10">
      {/* Visual Section Break Decorator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

      {/* Title */}
      <div className="text-center mb-16 space-y-3">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#d4af37] flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Digital Crafting
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-wider">
          AI Spirit Mixologist
        </h2>
        <p className="font-sans text-sm text-white/50 max-w-xl mx-auto font-light leading-relaxed">
          Craft your bespoke spirit profile and signature cocktail recipes using sensory note engineering.
        </p>
      </div>

      {/* Main Glassmorphic Interactive Frame */}
      <div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        }}
        className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden min-h-[450px] flex flex-col justify-between group"
      >
        {/* Dynamic Spotlight Glow Overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.12), transparent 80%)'
          }}
        />

        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Step Indicator Headers */}
        {step < 4 && (
          <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8 text-xs font-sans text-white/40">
            <span className={step >= 1 ? 'text-[#d4af37]' : ''}>1. Select Mood</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step >= 2 ? 'text-[#d4af37]' : ''}>2. Choose Occasion</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step >= 3 ? 'text-[#d4af37]' : ''}>3. sensory Profiles</span>
          </div>
        )}

        {/* Step Contents */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Mood */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-xl font-semibold tracking-wide flex items-center gap-2">
                <GlassWater className="w-5 h-5 text-[#d4af37]" /> What is your desired mood?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {MOODS.map((m) => {
                  const isSelected = selectedMood === m;
                  return (
                    <button
                      key={m}
                      onClick={() => setSelectedMood(m)}
                      className={`py-4 px-6 rounded-2xl border text-xs font-sans tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#e6c280] to-[#d4af37] border-[#d4af37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'border-white/5 bg-white/[0.01] hover:border-white/20 text-white/60 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Occasion */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-xl font-semibold tracking-wide flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#d4af37]" /> What is the occasion?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OCCASIONS.map((o) => {
                  const isSelected = selectedOccasion === o;
                  return (
                    <button
                      key={o}
                      onClick={() => setSelectedOccasion(o)}
                      className={`py-4 px-6 rounded-2xl border text-xs font-sans tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#e6c280] to-[#d4af37] border-[#d4af37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'border-white/5 bg-white/[0.01] hover:border-white/20 text-white/60 hover:text-white'
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Sensory notes */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-xl font-semibold tracking-wide flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#d4af37]" /> Select your sensory flavor profiles
              </h3>
              <p className="text-xs font-sans text-white/40 mb-2">Select multiple notes to formulate the perfect alchemical blend.</p>
              <div className="flex flex-wrap gap-3">
                {FLAVORS.map((f) => {
                  const isSelected = selectedNotes.includes(f);
                  return (
                    <button
                      key={f}
                      onClick={() => handleNoteToggle(f)}
                      className={`py-3 px-5 rounded-full border text-[11px] font-sans tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] font-semibold'
                          : 'border-white/5 bg-white/[0.01] hover:border-white/20 text-white/60 hover:text-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      {f}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Formulation Result / Loading */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center justify-center py-8"
            >
              {loading ? (
                /* Dynamic glowing mixology loading animation */
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#d4af37] animate-spin" />
                    <Sparkles className="w-10 h-10 text-[#d4af37] animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-lg font-semibold text-[#d4af37] tracking-wider animate-pulse">Formulating Spirit Cask Reserve...</p>
                    <p className="text-[10px] font-sans text-white/40 mt-1 uppercase tracking-widest">Blending chemistry and taste profiles</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center space-y-4">
                  <p className="text-red-400 text-sm">Failed to formulate profile: {error}</p>
                  <button onClick={handleReset} className="px-5 py-2.5 bg-white/10 text-white text-xs rounded-full font-sans uppercase tracking-widest">
                    Try Again
                  </button>
                </div>
              ) : (
                /* Beautiful glassmorphic recipe printout */
                <div className="w-full text-left space-y-6 bg-white/[0.01] border border-white/5 p-6 sm:p-8 rounded-3xl relative">
                  {/* Decorative bottle watermark */}
                  <div className="absolute top-8 right-8 text-white/5 text-9xl select-none select-none font-serif">🥃</div>
                  
                  <div className="markdown-body font-sans text-sm text-white/80 leading-relaxed space-y-6">
                    {result &&
                      result.split('\n').map((line, index) => {
                        if (line.startsWith('# ')) {
                          return (
                            <h4 key={index} className="font-serif text-2xl font-bold text-[#d4af37] border-b border-white/5 pb-2 uppercase tracking-wide">
                              {line.substring(2)}
                            </h4>
                          );
                        }
                        if (line.startsWith('## ')) {
                          return (
                            <h5 key={index} className="font-serif text-lg font-semibold text-white tracking-wide mt-4 uppercase">
                              {line.substring(3)}
                            </h5>
                          );
                        }
                        if (line.startsWith('* ')) {
                          return (
                            <li key={index} className="list-disc pl-4 text-xs text-white/70 ml-2">
                              {line.substring(2)}
                            </li>
                          );
                        }
                        if (line.match(/^\d+\./)) {
                          return (
                            <div key={index} className="flex gap-2 text-xs text-white/70 pl-2">
                              <span className="text-[#d4af37] font-semibold">{line.split('.')[0]}.</span>
                              <span>{line.substring(line.indexOf('.') + 1)}</span>
                            </div>
                          );
                        }
                        return <p key={index} className="text-xs font-light text-white/60">{line}</p>;
                      })}
                  </div>

                  <div className="flex justify-end gap-3 border-t border-white/5 pt-6 mt-8">
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-[#d4af37] text-white/60 hover:text-[#d4af37] text-xs font-sans tracking-widest uppercase transition-colors cursor-pointer bg-white/[0.01]"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Re-Mix Recipe
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom controls: Back / Next wizard navigation */}
        {step < 4 && (
          <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-widest uppercase transition-colors border border-white/5 cursor-pointer text-white/40 hover:text-white ${
                step === 1 ? 'opacity-20 cursor-not-allowed' : 'bg-white/[0.01]'
              }`}
            >
              Back
            </button>

            {step < 3 ? (
              <button
                onClick={() => {
                  if (step === 1 && !selectedMood) return;
                  if (step === 2 && !selectedOccasion) return;
                  setStep(step + 1);
                }}
                disabled={(step === 1 && !selectedMood) || (step === 2 && !selectedOccasion)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer ${
                  (step === 1 && !selectedMood) || (step === 2 && !selectedOccasion)
                    ? 'border-white/5 border text-white/20 opacity-30 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-[#d4af37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                }`}
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={selectedNotes.length === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 font-bold cursor-pointer ${
                  selectedNotes.length === 0
                    ? 'border-white/5 border text-white/20 opacity-30 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#e6c280] to-[#d4af37] text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                }`}
              >
                <Sparkles className="w-4 h-4" /> Formulate Profile
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
