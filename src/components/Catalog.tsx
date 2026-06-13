'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { RootState } from '@/redux/store';
import {
  Drink,
  setCategory,
  setSearchQuery,
  setSortBy,
  toggleFavorite,
  addToCompare,
  removeFromCompare,
  clearCompare,
} from '@/redux/drinksSlice';
import { Heart, Scale, Search, SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = ['All', 'Wine', 'Whiskey', 'Beer', 'Rum', 'Champagne', 'Vodka', 'Breezer'];

// Static rich fallback dataset
const FALLBACK_DRINKS: Drink[] = [
  {
    id: '1',
    name: 'Château Margaux 2015',
    category: 'Wine',
    description: 'A legendary vintage of unmatched elegance. Combines deep floral aromas with rich dark berries, structured tannins, and a velvety finish.',
    abv: '13.5%',
    origin: 'Bordeaux, France',
    rating: 4.9,
    price: '$650.00',
    image: '🍷',
    notes: ['Blackcurrant', 'Violets', 'Sweet Spice', 'Oak'],
    glass: 'Bordeaux Glass',
  },
  {
    id: '2',
    name: 'The Macallan Sherry Oak 18',
    category: 'Whiskey',
    description: 'An iconic single malt Scotch matured in hand-picked sherry-seasoned oak casks from Jerez. Delivers a rich, full-bodied sensory experience.',
    abv: '43.0%',
    origin: 'Speyside, Scotland',
    rating: 4.8,
    price: '$380.00',
    image: '🥃',
    notes: ['Dried Fruit', 'Ginger', 'Wood Smoke', 'Cinnamon'],
    glass: 'Glencairn Glass',
  },
  {
    id: '3',
    name: 'Trappist Westvleteren 12',
    category: 'Beer',
    description: 'Universally acclaimed as one of the finest beers in the world. A complex dark Belgian Abbey ale brewed inside the Saint Sixtus monastery.',
    abv: '10.2%',
    origin: 'Westvleteren, Belgium',
    rating: 4.7,
    price: '$45.00',
    image: '🍺',
    notes: ['Caramel', 'Dark Plum', 'Toffee', 'Chocolate'],
    glass: 'Trappist Chalice',
  },
  {
    id: '4',
    name: 'Ron Zacapa Centenario XO',
    category: 'Rum',
    description: 'A blend of rums aged from 6 to 25 years in the highlands of Guatemala. Finished in French cognac casks for a remarkably complex palate.',
    abv: '40.0%',
    origin: 'Guatemala',
    rating: 4.8,
    price: '$120.00',
    image: '🍹',
    notes: ['Toasted Oak', 'Vanilla', 'Caramel', 'Orange Peel'],
    glass: 'Snifter Glass',
  },
  {
    id: '5',
    name: 'Dom Pérignon Vintage 2012',
    category: 'Champagne',
    description: 'A classic millésime that celebrates tension and contrast. Features intense mineral depth with bursts of citrus and toasted brioche notes.',
    abv: '12.5%',
    origin: 'Champagne, France',
    rating: 4.9,
    price: '$260.00',
    image: '🍾',
    notes: ['White Flowers', 'Apricot', 'Mint', 'Toasted Brioche'],
    glass: 'Champagne Flute',
  },
  {
    id: '6',
    name: 'Lagavulin 16 Year Old',
    category: 'Whiskey',
    description: 'The definitive Islay malt, renowned for its intense peat smoke, rich brine notes, and deep oak finish. An absolute classic for smoky spirit lovers.',
    abv: '43.0%',
    origin: 'Islay, Scotland',
    rating: 4.7,
    price: '$110.00',
    image: '🥃',
    notes: ['Heavy Smoke', 'Peat', 'Sea Salt', 'Black Tea'],
    glass: 'Glencairn Glass',
  },
  {
    id: '7',
    name: 'Yamazaki 18 Year Old',
    category: 'Whiskey',
    description: 'A legendary Japanese single malt. Intensely fruit-forward and highly sought after, aged in Sherry, American Oak, and rare Mizunara Oak casks.',
    abv: '43.0%',
    origin: 'Osaka, Japan',
    rating: 4.9,
    price: '$950.00',
    image: '🥃',
    notes: ['Mizunara Oak', 'Black Cherry', 'Sandalwood', 'Candied Ginger'],
    glass: 'Glencairn Glass',
  },
  {
    id: '8',
    name: 'Penfolds Grange Bin 95 2018',
    category: 'Wine',
    description: "Australia's most prestigious Shiraz. A masterfully structured wine displaying immense concentration, ripe tannins, and dark fruit complexity.",
    abv: '14.5%',
    origin: 'Barossa Valley, Australia',
    rating: 4.9,
    price: '$850.00',
    image: '🍷',
    notes: ['Blackberry', 'Liquorice', 'Dark Chocolate', 'Vanilla Oak'],
    glass: 'Bordeaux Glass',
  },
  {
    id: '9',
    name: "Krug Clos d'Ambonnay 2002",
    category: 'Champagne',
    description: 'An incredibly rare Blanc de Noirs champagne originating from a tiny walled vineyard. Shows absolute pinot noir tension, red currant, and creaminess.',
    abv: '12.5%',
    origin: 'Reims, France',
    rating: 5.0,
    price: '$2200.00',
    image: '🍾',
    notes: ['Red Currant', 'Toasted Brioche', 'Chalky Mineral', 'Honeyed Fig'],
    glass: 'Champagne Flute',
  },
  {
    id: '10',
    name: 'Diplomático Ambassador',
    category: 'Rum',
    description: "An exceptional rum crafted from Venezuela's best reserves, aged in white oak barrels for twelve years and finished in PX Sherry casks.",
    abv: '47.0%',
    origin: 'Venezuela',
    rating: 4.9,
    price: '$280.00',
    image: '🍹',
    notes: ['Sherry Finish', 'Dried Fruits', 'Sweet Cigar Smoke', 'Nutmeg'],
    glass: 'Snifter Glass',
  },
  {
    id: '11',
    name: 'Weihenstephaner Korbinian',
    category: 'Beer',
    description: 'A premium German Doppelbock of legendary standing. Dark, malty, and robust with deep roasted malt aromas and elegant carbonation.',
    abv: '7.4%',
    origin: 'Bavaria, Germany',
    rating: 4.8,
    price: '$18.00',
    image: '🍺',
    notes: ['Roasted Malt', 'Brown Sugar', 'Dark Plums', 'Toasted Hazelnut'],
    glass: 'Beer Stein',
  },
  {
    id: '12',
    name: 'Mount Gay 1703 Master Select',
    category: 'Rum',
    description: 'A supreme blend of the finest double and single copper column distillates, aged from 10 to 30 years. Offers a rich profile of ripe banana and toasted spice.',
    abv: '43.0%',
    origin: 'Barbados',
    rating: 4.8,
    price: '$200.00',
    image: '🍹',
    notes: ['Ripe Banana', 'Toasted Almond', 'Vanilla Bean', 'Mocha'],
    glass: 'Snifter Glass',
  },
  {
    id: '13',
    name: 'Beluga Gold Line',
    category: 'Vodka',
    description: 'An ultra-premium Siberian vodka that undergoes a unique 90-day resting period. Unbelievably crisp and smooth, filtered through quartz sand and double-filtered through silver.',
    abv: '40.0%',
    origin: 'Siberia, Russia',
    rating: 4.9,
    price: '$170.00',
    image: '🍸',
    notes: ['White Pepper', 'Honey', 'Oat Infusion', 'Alpine Herbs'],
    glass: 'Caviar Shot Glass',
  },
  {
    id: '14',
    name: 'Nectar & Oak Wild Berry',
    category: 'Breezer',
    description: 'A luxurious, artisanal take on a summer refresher. Infused with wild blackberries, huckleberries, premium neutral French spirits, and sparkling mineral water.',
    abv: '6.5%',
    origin: 'Provence, France',
    rating: 4.6,
    price: '$24.00',
    image: '🍹',
    notes: ['Wild Blackberry', 'Huckleberry', 'Sparkling Lime', 'Organic Honey'],
    glass: 'Collins Glass',
  },
  {
    id: '15',
    name: 'Belvedere Smogóry Forest',
    category: 'Vodka',
    description: 'Crafted from rare Diamond Rye grown at a single estate in western Poland. Rich and savory with notes of toasted salted caramel, honey, and bold white pepper finishing clean.',
    abv: '40.0%',
    origin: 'Lubusz, Poland',
    rating: 4.8,
    price: '$85.00',
    image: '🍸',
    notes: ['Salted Caramel', 'White Pepper', 'Toasted Rye', 'Dark Honey'],
    glass: 'Chilled Coupe',
  },
  {
    id: '16',
    name: 'Nectar & Oak Passion Fruit',
    category: 'Breezer',
    description: 'An exotic summer RTD formulation. Infused with fresh tropical passion fruit nectar, sparkling artesian water, and neutral grain spirit filtered through rare quartz crystals.',
    abv: '6.5%',
    origin: 'Cote d\'Azur, France',
    rating: 4.7,
    price: '$24.00',
    image: '🍹',
    notes: ['Passion Fruit', 'Zesty Citrus', 'Sparkling Carbonation', 'Crystal Spirits'],
    glass: 'Highball Glass',
  },
];

function ParallaxCard({ children, index }: { children: React.ReactNode; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const [offsets, setOffsets] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setOffsets([0, 0]);
      } else if (width < 1024) {
        setOffsets(index % 2 === 0 ? [-20, 20] : [20, -20]);
      } else {
        if (index % 3 === 0) {
          setOffsets([-40, 40]);
        } else if (index % 3 === 1) {
          setOffsets([-10, 10]);
        } else {
          setOffsets([30, -30]);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [index]);

  const yRaw = useTransform(scrollYProgress, [0, 1], offsets);
  const y = useSpring(yRaw, { stiffness: 85, damping: 20, mass: 0.4 });

  return (
    <motion.div ref={cardRef} style={{ y }} className="h-full">
      {children}
    </motion.div>
  );
}

export default function Catalog() {
  const dispatch = useDispatch();
  const { category, searchQuery, sortBy } = useSelector((state: RootState) => state.drinks.filters);
  const favorites = useSelector((state: RootState) => state.drinks.favorites);
  const compareList = useSelector((state: RootState) => state.drinks.compareList);

  const [drinks, setDrinks] = useState<Drink[]>(FALLBACK_DRINKS);
  const [showFilters, setShowFilters] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  // Attempt to fetch drinks from API backend on mount, falling back to local list
  useEffect(() => {
    let active = true;
    fetch('http://localhost:5001/api/drinks')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not application/json');
        }
        return res.json();
      })
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) {
          setDrinks(data);
        }
      })
      .catch((err) => {
        console.warn('Drink catalog running from local offline archive:', err.message);
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredDrinks = drinks
    .filter((drink) => {
      if (!drink) return false;
      const drinkCategory = drink.category || 'All';
      const matchesCategory = category === 'All' || drinkCategory === category;
      
      const drinkName = drink.name || '';
      const drinkNotes = drink.notes || [];
      const drinkOrigin = drink.origin || '';
      
      const matchesSearch =
        drinkName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drinkNotes.some((n) => n && n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        drinkOrigin.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'abv') {
        const abvA = parseFloat(a.abv || '0');
        const abvB = parseFloat(b.abv || '0');
        return abvB - abvA;
      }
      return 0;
    });

  const handleCategoryChange = (cat: string) => {
    dispatch(setCategory(cat));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSort = (criteria: 'name' | 'rating' | 'abv') => {
    dispatch(setSortBy(criteria));
  };

  const toggleFav = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const handleCompareClick = (drink: Drink) => {
    if (compareList.some((d) => d.id === drink.id)) {
      dispatch(removeFromCompare(drink.id));
    } else {
      dispatch(addToCompare(drink));
    }
  };

  return (
    <section id="cellar" className="relative w-full max-w-7xl mx-auto px-6 py-24 text-white z-10">
      {/* Visual Section Break Decorator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

      {/* Heading */}
      <div className="text-center mb-16 space-y-3">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#d4af37]">
          Curated Reserve
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-wider">
          The Cellar Vaults
        </h2>
        <p className="font-sans text-sm text-white/50 max-w-xl mx-auto font-light leading-relaxed">
          Filter through rare award-winning whiskies, delicate wines, craft abbey ales, complex rums, and premium vintage champagnes.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        {/* Horizontal Category Switcher */}
        <div className="flex flex-wrap justify-center gap-2 max-w-full">
          {CATEGORIES.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive
                    ? 'text-black font-semibold'
                    : 'text-white/60 border border-white/5 bg-white/[0.01] hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-gradient-to-r from-[#e6c280] to-[#d4af37]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Panel */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Glassmorphic Search Input */}
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search spirits, notes..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-11 pr-4 py-2.5 rounded-full text-xs font-sans bg-white/[0.02] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/[0.04] transition-all"
            />
          </div>

          {/* Toggle Filter Options */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center p-3 rounded-full border border-white/10 hover:border-[#d4af37] bg-white/[0.02] transition-colors cursor-pointer text-white/70 hover:text-[#d4af37]"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Filter Collapsible (GSAP / Framer animation) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-8"
          >
            <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md flex flex-wrap gap-6 items-center">
              <span className="text-xs font-sans uppercase tracking-widest text-[#d4af37] mr-4">
                Sort By:
              </span>
              {(['rating', 'abv', 'name'] as const).map((criteria) => {
                const isActive = sortBy === criteria;
                return (
                  <button
                    key={criteria}
                    onClick={() => handleSort(criteria)}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase font-sans tracking-widest transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-[#d4af37] border border-[#d4af37]/30'
                        : 'border border-white/5 hover:border-white/20 text-white/50'
                    }`}
                  >
                    {criteria === 'abv' ? 'Alcohol (ABV)' : criteria}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Catalog Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]"
      >
        <AnimatePresence mode="popLayout">
          {filteredDrinks.map((drink, index) => {
            const isFav = favorites.includes(drink.id);
            const inCompare = compareList.some((d) => d.id === drink.id);

            const cardVariants = {
              hidden: { opacity: 0, y: 30, scale: 0.96 },
              show: (idx: number) => ({
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring' as const,
                  stiffness: 80,
                  damping: 14,
                  delay: Math.min(idx * 0.04, 0.3)
                }
              })
            };

            return (
              <ParallaxCard key={drink.id} index={index}>
                <motion.div
                  layout
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  exit={{ opacity: 0, scale: 0.9 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                className="group relative flex flex-col justify-between backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-3xl p-6 hover:bg-white/[0.04] hover:border-[#d4af37]/30 transition-all duration-500 shadow-xl overflow-hidden"
              >
                {/* Dynamic Spotlight Glow Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.12), transparent 80%)'
                  }}
                />

                {/* Top utilities: Category badge and Favorite / Compare toggles */}
                <div className="flex items-center justify-between mb-6 z-10">
                  <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded">
                    {drink.category || 'All'}
                  </span>
                  <div className="flex items-center space-x-2">
                    {/* Compare Button */}
                    <button
                      onClick={() => handleCompareClick(drink)}
                      className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                        inCompare
                          ? 'bg-[#d4af37] border-[#d4af37] text-black'
                          : 'border-white/5 bg-white/[0.02] hover:border-white/20 text-white/55 hover:text-white'
                      }`}
                      title={inCompare ? 'Remove comparison' : 'Compare item'}
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFav(drink.id)}
                      className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                        isFav
                          ? 'border-[#ff4d4d]/30 bg-[#ff4d4d]/10 text-[#ff4d4d]'
                          : 'border-white/5 bg-white/[0.02] hover:border-white/20 text-white/55 hover:text-white'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current opacity-90" style={{ fill: isFav ? 'currentColor' : 'none' }} />
                    </button>
                  </div>
                </div>

                {/* Drink Artwork Monogram */}
                <div className="w-full h-44 flex items-center justify-center relative mb-6">
                  {/* Decorative glowing backdrops */}
                  <div className="absolute w-24 h-24 bg-[#d4af37]/5 rounded-full blur-xl group-hover:bg-[#d4af37]/10 transition-colors duration-500" />
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-500 z-10 select-none select-none filter drop-shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
                    {drink.image || '🍷'}
                  </span>
                </div>

                {/* Info details */}
                <div className="space-y-4 z-10">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-lg font-semibold tracking-wide group-hover:text-[#d4af37] transition-colors">
                        {drink.name || 'Unnamed Spirit'}
                      </h3>
                      <span className="font-serif text-[#d4af37] font-semibold text-sm pl-2">
                        {drink.price || 'Allocation Only'}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-white/40">{drink.origin || 'Unknown Origin'}</p>
                  </div>

                  <p className="text-xs font-sans text-white/60 leading-relaxed font-light line-clamp-3">
                    {drink.description || 'No description available.'}
                  </p>

                  {/* Flavor Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(drink.notes || []).map((note) => (
                      <span
                        key={note}
                        className="text-[9px] font-sans text-white/50 border border-white/5 bg-white/[0.02] px-2 py-0.5 rounded-full"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Rating, Glass and ABV specifications */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2 text-[10px] font-sans text-white/40">
                    <span>★ {drink.rating || 0.0} / 5.0</span>
                    <span>ABV {drink.abv || 'N/A'}</span>
                    <span>{drink.glass || 'Standard Glass'}</span>
                  </div>
                </div>
                </motion.div>
              </ParallaxCard>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Comparison Bottom Tray Drawer */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-6 backdrop-blur-2xl bg-black/80 border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left tray title */}
              <div className="text-left space-y-1">
                <h4 className="font-serif text-md font-semibold text-[#d4af37] tracking-wider uppercase flex items-center gap-2">
                  <Scale className="w-4 h-4" /> Spirit Comparison Vault
                </h4>
                <p className="text-xs font-sans text-white/40">
                  Comparing {compareList.length} of 3 maximum spirits.
                </p>
              </div>

              {/* Middle compared items cards layout */}
              <div className="flex flex-wrap gap-4 justify-center">
                {compareList.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-white/[0.03] border border-white/5 py-2 px-4 rounded-full relative group"
                  >
                    <span className="text-xl select-none">{item.image}</span>
                    <div className="text-left">
                      <p className="text-[10px] font-serif font-bold text-white/90 truncate max-w-[120px]">
                        {item.name}
                      </p>
                      <p className="text-[9px] font-sans text-white/40">{item.abv} ABV</p>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCompare(item.id))}
                      className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 cursor-pointer ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Right utility buttons: Clear / View details */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(clearCompare())}
                  className="px-4 py-2 text-xs font-sans tracking-widest uppercase border border-white/10 hover:border-[#ff4d4d]/30 text-white/60 hover:text-[#ff4d4d] rounded-full transition-all cursor-pointer bg-transparent"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsComparing(true)}
                  className="px-5 py-2 bg-gradient-to-r from-[#e6c280] to-[#d4af37] text-black font-semibold text-xs font-sans tracking-widest uppercase rounded-full hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
                >
                  Analyze Specs
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Full Modal Backdrop */}
      <AnimatePresence>
        {isComparing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-lg"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="w-full max-w-4xl backdrop-blur-2xl bg-[#0d0d0f]/90 border border-white/10 p-8 rounded-3xl text-left shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsComparing(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white text-white/50 hover:text-white transition-colors cursor-pointer bg-white/[0.01]"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif text-2xl font-semibold tracking-wider text-[#d4af37] mb-8 uppercase border-b border-white/5 pb-4">
                Spirit Comparative Matrix
              </h3>

              {/* Table Specifications Grid */}
              <div className="grid grid-cols-4 gap-4 text-xs font-sans text-white/90">
                {/* Headers */}
                <div className="font-bold text-[#d4af37] uppercase tracking-wider">Specifications</div>
                {compareList.map((item) => (
                  <div key={item.id} className="font-serif font-semibold text-center border-b border-white/5 pb-2">
                    <span className="text-2xl select-none block mb-1">{item.image}</span>
                    {item.name}
                  </div>
                ))}

                {/* Fill empty cells if comparing less than 3 */}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div key={idx} className="text-center text-white/10 italic">Empty Slot</div>
                ))}

                {/* Pricing row */}
                <div className="font-semibold text-white/50 border-t border-white/5 py-3">Price</div>
                {compareList.map((item) => (
                  <div key={item.id} className="text-center font-bold text-[#d4af37] border-t border-white/5 py-3">
                    {item.price}
                  </div>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div key={idx} className="border-t border-white/5 py-3" />
                ))}

                {/* Category row */}
                <div className="font-semibold text-white/50 border-t border-white/5 py-3">Category</div>
                {compareList.map((item) => (
                  <div key={item.id} className="text-center border-t border-white/5 py-3">{item.category}</div>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div key={idx} className="border-t border-white/5 py-3" />
                ))}

                {/* ABV row */}
                <div className="font-semibold text-white/50 border-t border-white/5 py-3">Alcohol Content (ABV)</div>
                {compareList.map((item) => (
                  <div key={item.id} className="text-center border-t border-white/5 py-3 font-semibold text-white">
                    {item.abv}
                  </div>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div key={idx} className="border-t border-white/5 py-3" />
                ))}

                {/* Origin row */}
                <div className="font-semibold text-white/50 border-t border-white/5 py-3">Origin</div>
                {compareList.map((item) => (
                  <div key={item.id} className="text-center border-t border-white/5 py-3 text-white/70">{item.origin}</div>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div key={idx} className="border-t border-white/5 py-3" />
                ))}

                {/* Rating row */}
                <div className="font-semibold text-white/50 border-t border-white/5 py-3">Rating</div>
                {compareList.map((item) => (
                  <div key={item.id} className="text-center border-t border-white/5 py-3 font-bold text-[#e6c280]">
                    ★ {item.rating} / 5.0
                  </div>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div key={idx} className="border-t border-white/5 py-3" />
                ))}

                {/* Glass Type row */}
                <div className="font-semibold text-white/50 border-t border-white/5 py-3">Preferred Glass</div>
                {compareList.map((item) => (
                  <div key={item.id} className="text-center border-t border-white/5 py-3 text-white/80">{item.glass}</div>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div key={idx} className="border-t border-white/5 py-3" />
                ))}

                {/* Flavor Notes row */}
                <div className="font-semibold text-white/50 border-t border-white/5 py-3">Flavor Notes</div>
                {compareList.map((item) => (
                  <div key={item.id} className="text-center border-t border-white/5 py-3">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {item.notes.map((n) => (
                        <span key={n} className="bg-white/5 px-2 py-0.5 rounded text-[10px] text-white/80">{n}</span>
                      ))}
                    </div>
                  </div>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div key={idx} className="border-t border-white/5 py-3" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
