const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Handcrafted rich inventory served by node server
const DRINKS_DATA = [
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
    price: '$2,200.00',
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

// 1. GET drinks list endpoint
app.get('/api/drinks', (req, res) => {
  res.json(DRINKS_DATA);
});

// 2. POST AI Recommendation endpoint (calls Python engine subprocess)
app.post('/api/recommend', (req, res) => {
  const { mood, occasion, flavors } = req.body;

  if (!mood || !occasion || !flavors) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const pythonScript = path.join(__dirname, '..', 'ai_engine', 'recommender.py');
  
  // Spawn Python script as a subprocess
  const flavorsJson = JSON.stringify(flavors);
  const pyProcess = spawn('python3', [pythonScript, mood, occasion, flavorsJson]);

  let stdoutData = '';
  let stderrData = '';

  pyProcess.stdout.on('data', (data) => {
    stdoutData += data.toString();
  });

  pyProcess.stderr.on('data', (data) => {
    stderrData += data.toString();
  });

  pyProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python subprocess exited with code ${code}. Stderr: ${stderrData}`);
      return fallbackRecommendation(mood, occasion, flavors, res);
    }

    try {
      const recommendation = JSON.parse(stdoutData.trim());
      res.json(recommendation);
    } catch (parseErr) {
      console.error('Error parsing Python output, running JS fallback matching:', parseErr);
      fallbackRecommendation(mood, occasion, flavors, res);
    }
  });
});

// Safe JS fallback if python script fails
function fallbackRecommendation(mood, occasion, flavors, res) {
  let matchedDrink = DRINKS_DATA[1]; // default Macallan
  let bestScore = -1;

  DRINKS_DATA.forEach((drink) => {
    let intersection = drink.notes.filter((note) => 
      flavors.some((f) => note.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(note.toLowerCase()))
    );
    let score = intersection.length;
    
    // category bias
    if (drink.category === 'Whiskey' && ['relaxed', 'cozy'].includes(mood.toLowerCase())) score += 1;
    if (drink.category === 'Champagne' && mood.toLowerCase() === 'celebratory') score += 1.5;
    if (drink.category === 'Wine' && occasion.toLowerCase() === 'dinner pairing') score += 1;

    if (score > bestScore) {
      bestScore = score;
      matchedDrink = drink;
    }
  });

  const matchPct = Math.min(98.5, 55.0 + (bestScore * 10));

  const recipe = `
# Recommended Spirit Profile: ${matchedDrink.name} (Reserve Fallback)

An alchemical formulation calculated utilizing our native JavaScript matching matrix.

## 🥃 The Selected Base
* **Category**: Master Reserve ${matchedDrink.category} (${matchedDrink.origin})
* **Suggested ABV**: ${matchedDrink.abv} | **Price Point**: ${matchedDrink.price}

## 📝 Sensory Formulation Analysis
You selected flavor notes: **${flavors.join(', ')}**.
Our reserve matching algorithm computed an alignment of **${matchPct.toFixed(1)}%** with our sensory inventory.

## 🍹 Signature Serving Formulation
1. Serve **2.0 oz** in a pristine, chilled **${matchedDrink.glass}**.
2. Enhance with a single, massive crystal ice block to retain full body.
3. Garnish with a light zest corresponding to the key sensory notes.
  `;

  res.json({
    success: true,
    drink: matchedDrink,
    alignment: `${matchPct.toFixed(1)}%`,
    recommendation: recipe.trim()
  });
}

app.listen(PORT, () => {
  console.log(`Nectar & Oak Express Backend active on http://localhost:${PORT}`);
});
