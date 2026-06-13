'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Award, Gem, Sparkles, ShieldCheck } from 'lucide-react';

interface TierFeature {
  text: string;
  highlighted: boolean;
}

interface AllocationTier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  icon: React.ReactNode;
  features: TierFeature[];
  popular: boolean;
  color: string;
  glowColor: string;
}

const TIERS: AllocationTier[] = [
  {
    id: 'bronze',
    name: 'Bronze Cask Alliance',
    subtitle: 'For the curious collector starting their vintage journey.',
    price: '$150',
    period: 'monthly',
    icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
    popular: false,
    color: 'border-amber-900/30 hover:border-amber-600/50',
    glowColor: 'bg-amber-600/5',
    features: [
      { text: 'Quarterly allocation of 2 curated reserves', highlighted: false },
      { text: 'Access to the digital vault & tasting metrics', highlighted: false },
      { text: '10% member discount on extra vault purchases', highlighted: false },
      { text: 'Invitations to virtual alchemical masterclasses', highlighted: false },
      { text: 'Standard secure temperature-controlled delivery', highlighted: false },
    ],
  },
  {
    id: 'vintage',
    name: 'Vintage Cellar Syndicate',
    subtitle: 'Our signature tier. Secure allocation of highly limited releases.',
    price: '$450',
    period: 'monthly',
    icon: <Award className="w-6 h-6 text-[#d4af37]" />,
    popular: true,
    color: 'border-[#d4af37]/30 hover:border-[#d4af37]/80',
    glowColor: 'bg-[#d4af37]/10',
    features: [
      { text: 'Bi-monthly allocation of 3 rare reserve spirits', highlighted: true },
      { text: 'First-priority access to single-barrel selections', highlighted: false },
      { text: 'Direct messaging channel with our master sommeliers', highlighted: false },
      { text: 'Complimentary private tasting at estate cellars', highlighted: true },
      { text: 'VIP invitations to annual harvest & fermentation events', highlighted: false },
      { text: 'Insured climate-controlled global white-glove shipping', highlighted: false },
    ],
  },
  {
    id: 'sovereign',
    name: 'Sovereign Decanter Club',
    subtitle: 'The ultimate bespoke experience. 1-of-1 barrels and unmatched luxury.',
    price: '$1,200',
    period: 'monthly',
    icon: <Gem className="w-6 h-6 text-purple-400" />,
    popular: false,
    color: 'border-purple-900/30 hover:border-purple-500/50',
    glowColor: 'bg-purple-500/5',
    features: [
      { text: 'Bespoke custom-blended barrel segment (1-of-1)', highlighted: true },
      { text: 'Personal physical wine & spirit locker at our vault', highlighted: true },
      { text: 'Annual private weekend retreat at our French estate', highlighted: true },
      { text: 'Unlimited custom engravings and crystal decanters', highlighted: false },
      { text: '24/7 dedicated concierge sommelier service', highlighted: false },
      { text: 'Guaranteed lifetime access to unreleased library stocks', highlighted: false },
    ],
  },
];

export default function Allocations() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 70,
        damping: 15,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  interface AllocationParticle {
    id: number;
    width: string;
    height: string;
    left: string;
    top: string;
    xRange: number[];
    duration: number;
  }

  const [particles, setParticles] = React.useState<AllocationParticle[]>([]);

  React.useEffect(() => {
    const list = Array.from({ length: 12 }).map((_, i) => {
      const size = Math.random() * 4 + 2;
      return {
        id: i,
        width: size + 'px',
        height: size + 'px',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        xRange: [0, Math.random() * 40 - 20, 0],
        duration: Math.random() * 15 + 15,
      };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(list);
  }, []);

  return (
    <section id="allocations" className="relative py-32 px-6 md:px-12 bg-black overflow-hidden select-none border-t border-white/5">
      {/* Background visual assets */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#d4af37]/3 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/2 rounded-full blur-[180px] pointer-events-none" />

      {/* Decorative Drifting Gold Particle Backplate */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-tr from-[#d4af37] to-amber-500"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
            }}
            animate={{
              y: [0, -100, 0],
              x: p.xRange,
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center space-x-2 text-[#d4af37]"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em]">
              The Allocations Vault
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70"
          >
            Connoisseur Tiers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-white/50 leading-relaxed font-light"
          >
            Gain direct entry to our highly-guarded reserve pools. Choose your membership depth and unlock rare vintages, alchemical blending channels, and global elite sommelier services.
          </motion.p>
        </div>

        {/* Tiers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.015 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              className={`backdrop-blur-2xl bg-white/[0.01] border ${tier.color} rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(212,175,55,0.05)]`}
            >
              {/* Dynamic Spotlight Glow Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${
                    tier.id === 'sovereign' ? 'rgba(168, 85, 247, 0.12)' : 'rgba(212, 175, 55, 0.12)'
                  }, transparent 80%)`
                }}
              />
              {/* Dynamic Glowing Halo behind card on hover */}
              <div className={`absolute -right-20 -top-20 w-44 h-44 rounded-full blur-[80px] pointer-events-none group-hover:opacity-100 opacity-40 transition-opacity duration-700 ${tier.glowColor}`} />

              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute top-5 right-5 bg-gradient-to-r from-[#e6c280] to-[#d4af37] text-black text-[9px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  Highly Requested
                </div>
              )}

              {/* Card Header */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    {tier.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold tracking-wide text-white">
                      {tier.name}
                    </h3>
                    <p className="text-[10px] font-sans text-white/30 uppercase tracking-widest">
                      Spirits Allocation Club
                    </p>
                  </div>
                </div>

                <p className="font-sans text-xs text-white/50 leading-relaxed font-light min-h-[40px]">
                  {tier.subtitle}
                </p>

                {/* Price block */}
                <div className="flex items-baseline space-x-2 py-4 border-y border-white/5">
                  <span className="font-serif text-4xl sm:text-5xl font-black text-[#d4af37]">
                    {tier.price}
                  </span>
                  <span className="font-sans text-xs text-white/40 uppercase tracking-widest">
                    / {tier.period}
                  </span>
                </div>

                {/* Feature List */}
                <ul className="space-y-3.5 pt-4">
                  {tier.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      variants={itemVariants}
                      className="flex items-start space-x-2.5 text-xs text-white/70"
                    >
                      <div className="mt-0.5 flex-shrink-0 p-0.5 rounded-full bg-[#d4af37]/10 text-[#d4af37]">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className={`font-sans leading-tight ${feature.highlighted ? 'text-white font-semibold' : 'text-white/60 font-light'}`}>
                        {feature.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  className={`w-full py-4 text-xs font-sans tracking-widest uppercase font-bold rounded-full transition-all duration-300 cursor-pointer ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#e6c280] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e6c280] text-black shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                      : 'bg-white/5 border border-white/10 hover:border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  Secure My Allocation
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
