#!/usr/bin/env python3
import sys
import json

# Curated catalog of fine premium spirits inside the python model
DRINKS_POOL = [
    {
        "id": "1",
        "name": "Château Margaux 2015",
        "category": "Wine",
        "abv": "13.5%",
        "origin": "Bordeaux, France",
        "price": "$650.00",
        "notes": ["fruit", "floral", "sweet", "spicy", "oak", "fruity/berry", "sweet/honeyed", "herbal/floral"],
        "description": "A legendary vintage of unmatched elegance. Combines deep floral aromas with rich dark berries, structured tannins, and a velvety finish."
    },
    {
        "id": "2",
        "name": "The Macallan Sherry Oak 18",
        "category": "Whiskey",
        "abv": "43.0%",
        "origin": "Speyside, Scotland",
        "price": "$380.00",
        "notes": ["woody", "spicy", "warm", "fruity/berry", "oaky/woody", "spicy/warm"],
        "description": "An iconic single malt Scotch matured in hand-picked sherry-seasoned oak casks from Jerez. Delivers a rich, full-bodied sensory experience."
    },
    {
        "id": "3",
        "name": "Trappist Westvleteren 12",
        "category": "Beer",
        "abv": "10.2%",
        "origin": "Westvleteren, Belgium",
        "price": "$45.00",
        "notes": ["sweet", "fruity", "spicy", "sweet/honeyed", "fruity/berry"],
        "description": "Universally acclaimed as one of the finest beers in the world. A complex dark Belgian Abbey ale brewed inside the Saint Sixtus monastery."
    },
    {
        "id": "4",
        "name": "Ron Zacapa Centenario XO",
        "category": "Rum",
        "abv": "40.0%",
        "origin": "Guatemala",
        "price": "$120.00",
        "notes": ["sweet", "woody", "warm", "sweet/honeyed", "oaky/woody", "spicy/warm"],
        "description": "A blend of rums aged from 6 to 25 years in the highlands of Guatemala. Finished in French cognac casks for a remarkably complex palate."
    },
    {
        "id": "5",
        "name": "Dom Pérignon Vintage 2012",
        "category": "Champagne",
        "abv": "12.5%",
        "origin": "Champagne, France",
        "price": "$260.00",
        "notes": ["crisp", "citrus", "floral", "crisp/citrus", "herbal/floral"],
        "description": "A classic millésime that celebrates tension and contrast. Features intense mineral depth with bursts of citrus and toasted brioche notes."
    },
    {
        "id": "6",
        "name": "Lagavulin 16 Year Old",
        "category": "Whiskey",
        "abv": "43.0%",
        "origin": "Islay, Scotland",
        "price": "$110.00",
        "notes": ["peaty", "smoky", "warm", "peaty/smoky", "spicy/warm"],
        "description": "The definitive Islay malt, renowned for its intense peat smoke, rich brine notes, and deep oak finish. An absolute classic for smoky spirit lovers."
    }
]

def calculate_match_score(drink_notes, target_flavors):
    # Normalize notes
    d_notes = {n.lower().strip() for n in drink_notes}
    t_flavors = {f.lower().strip() for f in target_flavors}
    
    # Calculate Jaccard similarity
    intersection = d_notes.intersection(t_flavors)
    union = d_notes.union(t_flavors)
    
    if not union:
        return 0.0
    return len(intersection) / len(union)

def main():
    # Load arguments
    if len(sys.argv) < 4:
        # Provide default response if no arguments
        print(json.dumps({"error": "Missing sensory parameters"}))
        return

    mood = sys.argv[1]
    occasion = sys.argv[2]
    flavors_raw = sys.argv[3]
    
    try:
        flavors = json.loads(flavors_raw)
    except Exception:
        flavors = [f.strip() for f in flavors_raw.split(",") if f.strip()]

    # Find the best matching spirit from pool
    best_drink = None
    best_score = -1.0
    
    for drink in DRINKS_POOL:
        score = calculate_match_score(drink["notes"], flavors)
        # Apply occasion and mood boosts
        if drink["category"] == "Whiskey" and mood.lower() in ["relaxed", "cozy"]:
            score += 0.1
        if drink["category"] == "Champagne" and mood.lower() == "celebratory":
            score += 0.15
        if drink["category"] == "Wine" and occasion.lower() == "dinner pairing":
            score += 0.1
            
        if score > best_score:
            best_score = score
            best_drink = drink

    if not best_drink:
        best_drink = DRINKS_POOL[1] # Fallback to The Macallan

    match_pct = min(100.0, max(45.0, (best_score * 100.0) + 50.0))

    # Formulate Custom Recipe based on calculations
    recipe = f"""
# Recommended Spirit Profile: {best_drink['name']}

An exquisite alchemical match designed precisely for a **{mood}** mood during a **{occasion}**.

## 🥃 The Selected Base
* **Category**: Master Reserve {best_drink['category']} ({best_drink['origin']})
* **Description**: {best_drink['description']}
* **Suggested ABV**: {best_drink['abv']} | **Price Point**: {best_drink['price']}

## 📝 Sensory Formulation Analysis
You selected the flavor notes: **{", ".join(flavors)}**.
Our Python Jaccard Matcher computed a sensory alignment of **{match_pct:.1f}%**. The selected {best_drink['category']} provides a luxurious platform that complements these sensory preferences perfectly.

## 🍹 Signature Serving Formulation: "The Alchemy Pour"
1. Pour **2.0 oz** of {best_drink['name']} into a fresh **Glencairn/Snifter Glass**.
2. Enhance with a single premium **sphere of hand-carved ice** to preserve body.
3. Express **fresh essential zest** matching the key sensory notes over the glass.
4. Garnish with a light spray of **botanical spirits** for aromatic excellence.
"""

    response = {
        "success": True,
        "drink": best_drink,
        "alignment": f"{match_pct:.1f}%",
        "recommendation": recipe.strip()
    }
    
    print(json.dumps(response))

if __name__ == "__main__":
    main()
