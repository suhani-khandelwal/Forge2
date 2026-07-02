export const FALLBACK_DATA = {
  skincare: {
    signalSummary: {
      topInsight: "Consumers are shifting away from harsh multi-step active routines towards barrier-repairing mists and gentle hybrid formulations.",
      marketMood: "Cautious but highly search-active regarding active ingredient irritation."
    },
    concepts: [
      {
        id: 1001,
        name: "Ceramide Barrier Mist",
        tagline: "Repair your skin barrier in 7 days",
        category: "skincare",
        format: "Face Mist Spray",
        ingredients: ["Ceramide NP", "Niacinamide 5%", "Centella Asiatica"],
        rationale: "Fills the gap between budget hydration mists and premium barrier serums. Easily applied throughout the day.",
        priceINR: "₹699",
        scores: { marketSize: 85, novelty: 78, competition: 35 },
        competitiveIntelligence: {
          whiteSpace: "High demand for ceramide format under ₹800.",
          differentiation: "Spray-on fine mist format for easy reapplication.",
          pricing: { low: "₹299", mid: "₹699", premium: "₹1,200" },
          topCompetitors: [
            { brand: "Minimalist (Market Leader)", product: "Ceramide Moisturizer", price: "₹349", platform: "Nykaa", keyIngredients: ["Ceramide 0.3%", "Madecassoside"], keyClaims: "Deep skin barrier repair" },
            { brand: "Laneige (Premium)", product: "Cream Skin Refiner", price: "₹2,150", platform: "Amazon", keyIngredients: ["Ceramides", "White Leaf Tea"], keyClaims: "Intense 24-hr hydration" },
            { brand: "Dot & Key (Direct Threat)", product: "Barrier Repair Face Cream", price: "₹395", platform: "Nykaa", keyIngredients: ["Ceramide 3", "Hyaluronic Acid"], keyClaims: "Strengthens skin moisture barrier" }
          ]
        }
      },
      {
        id: 1002,
        name: "SPF 60 Gel Sunscreen for Acne-Prone",
        tagline: "Zero white cast. Zero breakouts.",
        category: "skincare",
        format: "Gel Sunscreen",
        ingredients: ["Zinc Oxide (micronized)", "Niacinamide 3%", "Salicylic Acid 0.5%"],
        rationale: "Addresses the top complaint (white cast + breakouts) in India's sunscreen market.",
        priceINR: "₹599",
        scores: { marketSize: 95, novelty: 60, competition: 72 },
        competitiveIntelligence: {
          whiteSpace: "Very few non-comedogenic sunscreens with active acne-treatment buffers exist.",
          differentiation: "Combines sunscreen with salicylic acid buffer to actively fight sebum and breakouts.",
          pricing: { low: "₹299", mid: "₹599", premium: "₹999" },
          topCompetitors: [
            { brand: "Aqualogica (Market Leader)", product: "Glow+ Dewy Sunscreen", price: "₹399", platform: "Nykaa", keyIngredients: ["Vitamin C", "Papaya Extract"], keyClaims: "Brightens and shields" },
            { brand: "Minimalist (Premium)", product: "SPF 50 Sunscreen", price: "₹399", platform: "Amazon", keyIngredients: ["Multi-vitamins", "UV Filters"], keyClaims: "No white cast, lightweight" },
            { brand: "La Roche-Posay (Direct Threat)", product: "Anthelios Gel-Cream", price: "₹2,400", platform: "Nykaa", keyIngredients: ["Airlicium", "Zinc Gluconate"], keyClaims: "Ultra-matte acne-safe sunscreen" }
          ]
        }
      },
      {
        id: 1003,
        name: "Glutathione Glass Skin Serum",
        tagline: "Korean-inspired radiance for Indian skin",
        category: "skincare",
        format: "Brightening Serum",
        ingredients: ["Glutathione 2%", "Alpha Arbutin 2%", "Vitamin C"],
        rationale: "Bridges the gap between DIY oral supplements and expensive clinical skin treatments.",
        priceINR: "₹1,299",
        scores: { marketSize: 88, novelty: 94, competition: 28 },
        competitiveIntelligence: {
          whiteSpace: "Topical glutathione serums are highly searched but rarely offered by local D2C brands.",
          differentiation: "Direct topical glutathione stabilized with arbutin to target stubborn hyperpigmentation.",
          pricing: { low: "₹499", mid: "₹1,299", premium: "₹2,500" },
          topCompetitors: [
            { brand: "Derma Co (Market Leader)", product: "2% Glutathione Serum", price: "₹649", platform: "Amazon", keyIngredients: ["Glutathione", "Vitamin C"], keyClaims: "Brightens pigmentation" },
            { brand: "Paula's Choice (Premium)", product: "Clinical Niacinamide + Peptide", price: "₹3,900", platform: "Nykaa", keyIngredients: ["Niacinamide", "Peptides"], keyClaims: "Tightens pores and glows" },
            { brand: "Sirona (Direct Threat)", product: "Glutathione Skin Serum", price: "₹599", platform: "Nykaa", keyIngredients: ["Glutathione", "Aloe Vera"], keyClaims: "Reduces dark spots" }
          ]
        }
      },
      {
        id: 1004,
        name: "Blue Light Defense Moisturizer",
        tagline: "Shield your skin from digital damage",
        category: "skincare",
        format: "Daily Moisturizer",
        ingredients: ["Lutein", "Bakuchiol 1%", "Vitamin E"],
        rationale: "First-mover digital-defense cream targeting urban tech professionals with high screen times.",
        priceINR: "₹949",
        scores: { marketSize: 75, novelty: 98, competition: 15 },
        competitiveIntelligence: {
          whiteSpace: "No local D2C brand currently has an exclusive screen protection skincare line.",
          differentiation: "Uses lutein-based screen filters coupled with bakuchiol to counteract digital ageing.",
          pricing: { low: "₹399", mid: "₹949", premium: "₹1,800" },
          topCompetitors: [
            { brand: "Plum (Market Leader)", product: "Green Tea Moisturizer", price: "₹470", platform: "Nykaa", keyIngredients: ["Green Tea", "Glycolic Acid"], keyClaims: "Matte oil-free hydration" },
            { brand: "Kiehl's (Premium)", product: "Ultra Facial Cream", price: "₹2,950", platform: "Amazon", keyIngredients: ["Glacial Glycoprotein", "Squalane"], keyClaims: "24-hour facial hydration" },
            { brand: "Dot & Key (Direct Threat)", product: "Cica Night Gel", price: "₹495", platform: "Nykaa", keyIngredients: ["Cica", "Niacinamide"], keyClaims: "Fights blue light and acne damage" }
          ]
        }
      },
      {
        id: 1005,
        name: "Retinol-Bakuchiol Night Cream",
        tagline: "Retinol results. Zero irritation.",
        category: "skincare",
        format: "Night Cream",
        ingredients: ["Retinol 0.05%", "Bakuchiol 1.5%", "Squalane"],
        rationale: "Bridges the retinol fear gap by offering maximum efficacy with a soothing bakuchiol buffer.",
        priceINR: "₹1,199",
        scores: { marketSize: 82, novelty: 80, competition: 42 },
        competitiveIntelligence: {
          whiteSpace: "Users avoid pure retinol due to peeling; hybrid creams are a major unmet demand.",
          differentiation: "Phased-release active system that mitigates purge reactions.",
          pricing: { low: "₹499", mid: "₹1,199", premium: "₹1,999" },
          topCompetitors: [
            { brand: "Minimalist (Market Leader)", product: "0.3% Retinol Serum", price: "₹599", platform: "Nykaa", keyIngredients: ["Retinol", "Coenzyme Q10"], keyClaims: "Reduces fine lines and wrinkles" },
            { brand: "Re'equil (Premium)", product: "0.1% Retinol Cream", price: "₹850", platform: "Amazon", keyIngredients: ["Retinol", "Ceramides"], keyClaims: "Anti-ageing skin repair" },
            { brand: "Pilgrim (Direct Threat)", product: "Retinol Anti-Ageing Cream", price: "₹650", platform: "Nykaa", keyIngredients: ["Retinol", "Pomegranate"], keyClaims: "Youthful skin glow" }
          ]
        }
      },
      {
        id: 1006,
        name: "Pollution Shield Cleansing Balm",
        tagline: "Melt away pollution. Restore glow.",
        category: "skincare",
        format: "Cleansing Balm",
        ingredients: ["Rice Bran Oil", "Activated Charcoal", "Moringa Extract"],
        rationale: "Metro-focused daily double cleanse balm under ₹800 targeting PM2.5 exposure.",
        priceINR: "₹749",
        scores: { marketSize: 78, novelty: 86, competition: 22 },
        competitiveIntelligence: {
          whiteSpace: "Most double cleanses are imported or oily; there is a lack of deep charcoal balms.",
          differentiation: "Contains physical micro-binders that trap city pollution particles.",
          pricing: { low: "₹399", mid: "₹749", premium: "₹1,400" },
          topCompetitors: [
            { brand: "Clinique (Market Leader)", product: "Take The Day Off", price: "₹3,200", platform: "Nykaa", keyIngredients: ["Safflower Seed Oil"], keyClaims: "Dissolves makeup and dirt" },
            { brand: "Earth Rhythm (Premium)", product: "Matcha Cleansing Balm", price: "₹599", platform: "Amazon", keyIngredients: ["Matcha Green Tea"], keyClaims: "Gentle makeup remover" },
            { brand: "Deconstruct (Direct Threat)", product: "Soothing Cleansing Balm", price: "₹499", platform: "Nykaa", keyIngredients: ["Oat Lipids", "Bisabolol"], keyClaims: "Deep clean without stripping" }
          ]
        }
      },
      {
        id: 1007,
        name: "Azelaic Acid Tone-Corrector",
        tagline: "Even out. Clear up. Glow on.",
        category: "skincare",
        format: "Serum",
        ingredients: ["Azelaic Acid 10%", "Niacinamide 2%", "Prebiotics"],
        rationale: "Targets acne scars, redness, and PIH (Post-Inflammatory Hyperpigmentation) without peeling.",
        priceINR: "₹899",
        scores: { marketSize: 80, novelty: 75, competition: 38 },
        competitiveIntelligence: {
          whiteSpace: "Most azelaic acid products are clinical creams; there is a gap for soothing serums.",
          differentiation: "Serum suspension combined with prebiotics to strengthen skin defenses.",
          pricing: { low: "₹349", mid: "₹899", premium: "₹1,500" },
          topCompetitors: [
            { brand: "Derma Co (Market Leader)", product: "10% Azelaic Acid", price: "₹499", platform: "Nykaa", keyIngredients: ["Azelaic Acid", "Niacinamide"], keyClaims: "Fades acne marks" },
            { brand: "Paula's Choice (Premium)", product: "10% Azelaic Acid Booster", price: "₹3,500", platform: "Amazon", keyIngredients: ["Azelaic Acid", "Salicylic Acid"], keyClaims: "Clears blemishes and redness" },
            { brand: "Minimalist (Direct Threat)", product: "10% Azealic Serum", price: "₹499", platform: "Nykaa", keyIngredients: ["Azelaic Acid", "Allantoin"], keyClaims: "Soothes skin inflammation" }
          ]
        }
      },
      {
        id: 1008,
        name: "Cica Hydro-Soothing Gel",
        tagline: "Instant cooling. Deep redness repair.",
        category: "skincare",
        format: "Gel",
        ingredients: ["Cica 5%", "Hyaluronic Acid", "Green Tea"],
        rationale: "Ultralight, oil-free moisturizer tailored for hot and humid Indian summers.",
        priceINR: "₹499",
        scores: { marketSize: 90, novelty: 70, competition: 50 },
        competitiveIntelligence: {
          whiteSpace: "High demand for soothing hydration during heatwaves; aloe gels feel sticky.",
          differentiation: "Non-sticky, rapid-absorption gel targeting heat rash and barrier sensitivity.",
          pricing: { low: "₹199", mid: "₹499", premium: "₹999" },
          topCompetitors: [
            { brand: "L'Oreal (Market Leader)", product: "Hyaluronic Acid Gel Cream", price: "₹999", platform: "Nykaa", keyIngredients: ["Hyaluronic Acid"], keyClaims: "Deep skin plumping" },
            { brand: "Dot & Key (Premium)", product: "Cica calming gel", price: "₹390", platform: "Amazon", keyIngredients: ["Cica", "Tea Tree"], keyClaims: "Hydrates and cools acne skin" },
            { brand: "Dr. Sheth's (Direct Threat)", product: "Cica & Ceramide Gel", price: "₹499", platform: "Nykaa", keyIngredients: ["Cica", "Ceramides"], keyClaims: "Soothes hot, inflamed skin" }
          ]
        }
      }
    ],
    gapMatrixData: [
      { name: "Ceramide Barrier Mist", x: 35, y: 85 },
      { name: "SPF 60 Gel Sunscreen", x: 72, y: 92 },
      { name: "Glutathione Glass Serum", x: 28, y: 88 },
      { name: "Blue Light Defense", x: 15, y: 78 },
      { name: "Retinol-Bakuchiol Cream", x: 42, y: 82 },
      { name: "Pollution Shield Balm", x: 22, y: 80 },
      { name: "Azelaic Acid Corrector", x: 38, y: 84 },
      { name: "Cica Soothing Gel", x: 50, y: 86 }
    ],
    trendData: [
      { month: "Oct 25", ceramide: 40, sunscreen: 75, glutathione: 20, cica: 45 },
      { month: "Nov 25", ceramide: 46, sunscreen: 80, glutathione: 25, cica: 50 },
      { month: "Dec 25", ceramide: 52, sunscreen: 88, glutathione: 32, cica: 56 },
      { month: "Jan 26", ceramide: 60, sunscreen: 95, glutathione: 40, cica: 62 },
      { month: "Feb 26", ceramide: 68, sunscreen: 90, glutathione: 50, cica: 70 },
      { month: "Mar 26", ceramide: 75, sunscreen: 84, glutathione: 62, cica: 78 },
      { month: "Apr 26", ceramide: 80, sunscreen: 76, glutathione: 74, cica: 85 },
      { month: "May 26", ceramide: 86, sunscreen: 70, glutathione: 85, cica: 90 }
    ],
    sentimentData: [
      { theme: "Irritation Control", positive: 90, negative: 10 },
      { theme: "Sticky Feel", positive: 45, negative: 55 },
      { theme: "White Cast", positive: 38, negative: 62 },
      { theme: "Hydration", positive: 82, negative: 18 }
    ]
  },
  haircare: {
    signalSummary: {
      topInsight: "Consumers are shifting away from heavy scalp oils towards active-infused scalp serums and leave-in bond repair masks.",
      marketMood: "Frustrated with generic anti-dandruff formulas and looking for hair-growth clinicals."
    },
    concepts: [
      {
        id: 2001,
        name: "Bhringraj + Biotin Scalp Serum",
        tagline: "Ayurvedic roots meet clinical science",
        category: "haircare",
        format: "Scalp Serum",
        ingredients: ["Bhringraj Extract 3%", "Biotin", "Redensyl"],
        rationale: "Bridges traditional ayurvedic hair care with clinical actives for growth and thickness.",
        priceINR: "₹1,299",
        scores: { marketSize: 92, novelty: 85, competition: 55 },
        competitiveIntelligence: {
          whiteSpace: "Fills the gap between pure clinical brands (Minimalist) and heritage-only brands (Kama).",
          differentiation: "Combines ancient growth oil extracts with direct follicle stimulators (Redensyl).",
          pricing: { low: "₹499", mid: "₹1,299", premium: "₹2,500" },
          topCompetitors: [
            { brand: "Mamaearth (Market Leader)", product: "Onion Hair Serum", price: "₹349", platform: "Nykaa", keyIngredients: ["Onion Seed Extract", "Biotin"], keyClaims: "Reduces hair fall" },
            { brand: "Kama Ayurveda (Premium)", product: "Bringadi Intensive Treatment", price: "₹1,895", platform: "Amazon", keyIngredients: ["Bhringraj", "Sesame Oil"], keyClaims: "Traditional hair oiling" },
            { brand: "Minimalist (Direct Threat)", product: "Hair Growth Actives 18%", price: "₹799", platform: "Nykaa", keyIngredients: ["Redensyl", "Anagain"], keyClaims: "Multi-functional growth serum" }
          ]
        }
      },
      {
        id: 2002,
        name: "Onion + Keratin Bond Repair Mask",
        tagline: "Clinically-backed bond repair at home",
        category: "haircare",
        format: "Hair Mask",
        ingredients: ["Onion Extract", "Hydrolyzed Keratin", "Bond Builders"],
        rationale: "Brings salon-grade hair rebuilding technology to an affordable consumer price point.",
        priceINR: "₹549",
        scores: { marketSize: 90, novelty: 72, competition: 60 },
        competitiveIntelligence: {
          whiteSpace: "Bond repair categories are dominated by imports (>₹2000); D2C brands lack local options.",
          differentiation: "Combines protein repair with local onion root-strengthening extracts.",
          pricing: { low: "₹299", mid: "₹549", premium: "₹1,200" },
          topCompetitors: [
            { brand: "L'Oreal (Market Leader)", product: "Total Repair 5 Mask", price: "₹399", platform: "Nykaa", keyIngredients: ["Ceramides", "Protein"], keyClaims: "Fights 5 signs of damage" },
            { brand: "Olaplex (Premium)", product: "No. 3 Hair Perfector", price: "₹2,950", platform: "Amazon", keyIngredients: ["Bis-Aminopropyl"], keyClaims: "Rebuilds hair bonds" },
            { brand: "Mamaearth (Direct Threat)", product: "Onion Hair Mask", price: "₹599", platform: "Nykaa", keyIngredients: ["Onion Extract", "Organic Bamboo Vinegar"], keyClaims: "Controls hair fall and frizz" }
          ]
        }
      },
      {
        id: 2003,
        name: "Caffeine Scalp Tonic",
        tagline: "Wake up your scalp. Wake up your roots.",
        category: "haircare",
        format: "Scalp Tonic",
        ingredients: ["Caffeine 1%", "Saw Palmetto", "Niacinamide"],
        rationale: "Fills the gap between greasy overnight hair oils and expensive hair transplant serums.",
        priceINR: "₹799",
        scores: { marketSize: 83, novelty: 88, competition: 20 },
        competitiveIntelligence: {
          whiteSpace: "Caffeine scalp tonics are highly recommended on forums but absent in Indian D2C.",
          differentiation: "Water-light daily tonic that stimulates follicles without styling residue.",
          pricing: { low: "₹399", mid: "₹799", premium: "₹1,600" },
          topCompetitors: [
            { brand: "Alpecin (Market Leader)", product: "Caffeine Liquid", price: "₹1,250", platform: "Amazon", keyIngredients: ["Caffeine", "Zinc", "Niacinamide"], keyClaims: "Strengthens hair roots" },
            { brand: "Forest Essentials (Premium)", product: "Bhringraj Scalp Tonic", price: "₹2,200", platform: "Nykaa", keyIngredients: ["Bhringraj", "Ayurvedic Herbs"], keyClaims: "Controls thinning hair" },
            { brand: "Pilgrim (Direct Threat)", product: "Spanish Rosemary Tonic", price: "₹399", platform: "Nykaa", keyIngredients: ["Rosemary", "Biotin"], keyClaims: "Promotes hair density" }
          ]
        }
      },
      {
        id: 2004,
        name: "Scalp Microbiome Shampoo",
        tagline: "Balance your scalp. Transform your hair.",
        category: "haircare",
        format: "Shampoo",
        ingredients: ["Prebiotic Inulin", "Zinc Pyrithione 1%", "Tea Tree Oil"],
        rationale: "Dermatological dandruff shampoo that balances scale microbiome without stripping natural oils.",
        priceINR: "₹699",
        scores: { marketSize: 90, novelty: 82, competition: 65 },
        competitiveIntelligence: {
          whiteSpace: "Consumers complain anti-dandruff shampoos dry out hair; there is a lack of prebiotic options.",
          differentiation: "Contains prebiotics that feed good scalp flora while eliminating yeast.",
          pricing: { low: "₹249", mid: "₹699", premium: "₹1,200" },
          topCompetitors: [
            { brand: "Head & Shoulders (Market Leader)", product: "Cool Menthol Shampoo", price: "₹299", platform: "Nykaa", keyIngredients: ["ZPT"], keyClaims: "Up to 100% dandruff free" },
            { brand: "Kérastase (Premium)", product: "Symbiose Anti-Dandruff", price: "₹3,200", platform: "Amazon", keyIngredients: ["Salicylic Acid", "Piroctone Olamine"], keyClaims: "Purifies itchy scalp" },
            { brand: "Bare Anatomy (Direct Threat)", product: "Anti-Dandruff Shampoo", price: "₹549", platform: "Nykaa", keyIngredients: ["Salicylic Acid", "Biotin"], keyClaims: "Cleanses scalp and roots" }
          ]
        }
      },
      {
        id: 2005,
        name: "Amla + Collagen Hair Gummies",
        tagline: "Feed your hair from within.",
        category: "haircare",
        format: "Nutraceutical Gummies",
        ingredients: ["Amla Extract", "Biotin 10,000mcg", "Marine Collagen"],
        rationale: "Tasty chewable beauty supplements bridging standard multivitamins with scalp rejuvenation.",
        priceINR: "₹999",
        scores: { marketSize: 85, novelty: 90, competition: 30 },
        competitiveIntelligence: {
          whiteSpace: "Most hair gummies use synthetic vitamins; lacking organic amla blends.",
          differentiation: "Combines ancient amla remedy with clinically proven marine collagen peptides.",
          pricing: { low: "₹499", mid: "₹999", premium: "₹1,500" },
          topCompetitors: [
            { brand: "Power Gummies (Market Leader)", product: "Hair Vitamins", price: "₹800", platform: "Nykaa", keyIngredients: ["Biotin", "Zinc"], keyClaims: "Longer and stronger hair" },
            { brand: "SugarBearHair (Premium)", product: "Hair Vitamins", price: "₹2,800", platform: "Amazon", keyIngredients: ["Biotin", "Folic Acid"], keyClaims: "Cruelty-free vitamin gummies" },
            { brand: "What's Up Beauty (Direct Threat)", product: "Hair Gummies", price: "₹899", platform: "Nykaa", keyIngredients: ["Biotin", "Sea Buckthorn"], keyClaims: "Nourishes roots and nails" }
          ]
        }
      },
      {
        id: 2006,
        name: "Rice Water Protein Treatment",
        tagline: "Ancient beauty ritual. Modern formula.",
        category: "haircare",
        format: "Leave-in Treatment",
        ingredients: ["Fermented Rice Water", "Hydrolyzed Wheat Protein", "Inositol"],
        rationale: "Leaves hair silky and detangled while feeding it amino acids from rice ferment.",
        priceINR: "₹499",
        scores: { marketSize: 88, novelty: 78, competition: 25 },
        competitiveIntelligence: {
          whiteSpace: "DIY rice water is messy; commercial options lack concentrated leave-in versions.",
          differentiation: "Enriched fermented spray that locks in hydration without needing a wash.",
          pricing: { low: "₹199", mid: "₹499", premium: "₹899" },
          topCompetitors: [
            { brand: "WishCare (Market Leader)", product: "Fermented Rice Water", price: "₹599", platform: "Nykaa", keyIngredients: ["Rice Water", "Keratin"], keyClaims: "Repairs damaged dry hair" },
            { brand: "Briogeo (Premium)", product: "Don't Despair, Repair!", price: "₹3,400", platform: "Amazon", keyIngredients: ["Rosehip Oil", "Algae Extract"], keyClaims: "Deep conditioning mask" },
            { brand: "Mamaearth (Direct Threat)", product: "Rice Water Conditioner", price: "₹349", platform: "Nykaa", keyIngredients: ["Rice Water", "Keratin"], keyClaims: "Splits ends and frizz control" }
          ]
        }
      },
      {
        id: 2007,
        name: "Heat Protectant + Frizz Serum",
        tagline: "Style fearlessly. Damage never.",
        category: "haircare",
        format: "Styling Serum",
        ingredients: ["Argan Oil", "Cyclopentasiloxane", "Keratin"],
        rationale: "High-performance styling shield that protects up to 230°C while controlling frizz.",
        priceINR: "₹649",
        scores: { marketSize: 80, novelty: 70, competition: 45 },
        competitiveIntelligence: {
          whiteSpace: "Most heat protectants are heavy, sticky salon sprays; there is a lack of light serums.",
          differentiation: "Double-duty formula that provides gloss and heat protection.",
          pricing: { low: "₹299", mid: "₹649", premium: "₹1,200" },
          topCompetitors: [
            { brand: "TRESemmé (Market Leader)", product: "Heat Defense Spray", price: "₹600", platform: "Nykaa", keyIngredients: ["Keratin", "Marula Oil"], keyClaims: "Protects against styling damage" },
            { brand: "Moroccanoil (Premium)", product: "Treatment Light", price: "₹3,800", platform: "Amazon", keyIngredients: ["Argan Oil", "Linseed Extract"], keyClaims: "Glossy styling base" },
            { brand: "BBlunt (Direct Threat)", product: "Hot Shot Shield Spray", price: "₹499", platform: "Nykaa", keyIngredients: ["Grapeseed Oil", "Provitamin B5"], keyClaims: "Protects from heat styling" }
          ]
        }
      },
      {
        id: 2008,
        name: "DHT-Blocking Hair Fall Serum",
        tagline: "Stop hair fall at the root cause.",
        category: "haircare",
        format: "Scalp Serum",
        ingredients: ["Saw Palmetto 5%", "Redensyl 3%", "Pumpkin Seed Oil"],
        rationale: "Combats androgenetic alopecia (pattern thinning) using natural DHT-blocking extracts.",
        priceINR: "₹1,499",
        scores: { marketSize: 85, novelty: 82, competition: 40 },
        competitiveIntelligence: {
          whiteSpace: "Limited local options that combine Saw Palmetto with standard growth peptides.",
          differentiation: "A non-drug formula that avoids the post-minoxidil shedding cycle.",
          pricing: { low: "₹599", mid: "₹1,499", premium: "₹2,999" },
          topCompetitors: [
            { brand: "Man Matters (Market Leader)", product: "Hair Tonic", price: "₹799", platform: "Nykaa", keyIngredients: ["Procapil", "Saw Palmetto"], keyClaims: "DHT blocking growth tonic" },
            { brand: "Hims (Premium)", product: "Topical Finasteride", price: "₹3,500", platform: "Amazon", keyIngredients: ["Finasteride", "Minoxidil"], keyClaims: "Prescription hair regrowth" },
            { brand: "Traya (Direct Threat)", product: "Hair Ras Serum", price: "₹999", platform: "Nykaa", keyIngredients: ["Redensyl", "Bhringraj"], keyClaims: "Doctor-backed hair fall rescue" }
          ]
        }
      }
    ],
    gapMatrixData: [
      { name: "Bhringraj Scalp Serum", x: 55, y: 92 },
      { name: "Onion Bond Mask", x: 60, y: 90 },
      { name: "Caffeine Scalp Tonic", x: 20, y: 83 },
      { name: "Microbiome Shampoo", x: 65, y: 90 },
      { name: "Amla Hair Gummies", x: 30, y: 85 },
      { name: "Rice Water Treatment", x: 25, y: 88 },
      { name: "Heat Protectant Serum", x: 45, y: 80 },
      { name: "DHT-Blocking Serum", x: 40, y: 85 }
    ],
    trendData: [
      { month: "Oct 25", bhringraj: 35, onion: 68, caffeine: 15, rice: 28 },
      { month: "Nov 25", bhringraj: 40, onion: 72, caffeine: 22, rice: 35 },
      { month: "Dec 25", bhringraj: 48, onion: 80, caffeine: 30, rice: 44 },
      { month: "Jan 26", bhringraj: 56, onion: 85, caffeine: 42, rice: 52 },
      { month: "Feb 26", bhringraj: 65, onion: 82, caffeine: 55, rice: 60 },
      { month: "Mar 26", bhringraj: 74, onion: 75, caffeine: 68, rice: 72 },
      { month: "Apr 26", bhringraj: 82, onion: 68, caffeine: 77, rice: 80 },
      { month: "May 26", bhringraj: 88, onion: 62, caffeine: 85, rice: 88 }
    ],
    sentimentData: [
      { theme: "Hair Thinning", positive: 70, negative: 30 },
      { theme: "Scalp Greasiness", positive: 50, negative: 50 },
      { theme: "Dandruff Relief", positive: 76, negative: 24 },
      { theme: "Frizz Control", positive: 65, negative: 35 }
    ]
  },
  supplements: {
    signalSummary: {
      topInsight: "Consumers are shifting away from hard synthetic capsules towards gummy formats and premium wellness stack powders.",
      marketMood: "Eager for clean formulations, seeking non-synthetic absorption helpers."
    },
    concepts: [
      {
        id: 3001,
        name: "Ashwagandha KSM-66 Gummies",
        tagline: "Stress relief that tastes like dessert",
        category: "supplements",
        format: "Gummies",
        ingredients: ["Ashwagandha KSM-66", "L-Theanine", "Vitamin D3"],
        rationale: "Premium stress management gummies utilizing gold-standard KSM-66 extract.",
        priceINR: "₹799",
        scores: { marketSize: 85, novelty: 82, competition: 40 },
        competitiveIntelligence: {
          whiteSpace: "High demand for stress management; capsules feel like medicines.",
          differentiation: "Combines patented KSM-66 Ashwagandha with synergistic calming agents (L-Theanine).",
          pricing: { low: "₹399", mid: "₹799", premium: "₹1,200" },
          topCompetitors: [
            { brand: "Himalaya (Market Leader)", product: "Ashwagandha Capsules", price: "₹250", platform: "Nykaa", keyIngredients: ["Organic Ashwagandha"], keyClaims: "Relieves stress and anxiety" },
            { brand: "Goli (Premium)", product: "Ashwagandha Gummies", price: "₹1,999", platform: "Amazon", keyIngredients: ["KSM-66 Ashwagandha", "Vitamin D"], keyClaims: "Supports memory and relaxation" },
            { brand: "What's Up Wellness (Direct Threat)", product: "Stress Relief Gummies", price: "₹799", platform: "Nykaa", keyIngredients: ["Ashwagandha", "Chamomile"], keyClaims: "Calms mind and improves sleep" }
          ]
        }
      },
      {
        id: 3002,
        name: "Plant-Based Collagen Builder",
        tagline: "Boost your collagen naturally.",
        category: "supplements",
        format: "Powder Stack",
        ingredients: ["Silica (Bamboo Extract)", "Acerola Cherry (Vit C)", "Sesbania Grandiflora"],
        rationale: "Fills the gap between direct animal collagen and ineffective plain biotin supplements.",
        priceINR: "₹1,199",
        scores: { marketSize: 88, novelty: 86, competition: 52 },
        competitiveIntelligence: {
          whiteSpace: "Large vegetarian population seeking collagen alternatives.",
          differentiation: "All-organic botanical stack loaded with direct pro-collagen cofactors.",
          pricing: { low: "₹499", mid: "₹1,199", premium: "₹1,999" },
          topCompetitors: [
            { brand: "OZiva (Market Leader)", product: "Plant Collagen Builder", price: "₹899", platform: "Nykaa", keyIngredients: ["Biotin", "Amla", "Bamboo Shoot"], keyClaims: "Supports anti-ageing skin" },
            { brand: "Vital Proteins (Premium)", product: "Marine Collagen", price: "₹3,200", platform: "Amazon", keyIngredients: ["Hydrolyzed Collagen"], keyClaims: "Skin, hair, and nail health" },
            { brand: "Plix (Direct Threat)", product: "Collagen Booster", price: "₹799", platform: "Nykaa", keyIngredients: ["Hyaluronic Acid", "Vitamin C"], keyClaims: "Locks skin moisture and glow" }
          ]
        }
      },
      {
        id: 3003,
        name: "Probiotic + ACV Gut Gummies",
        tagline: "Healthy gut. Happy immune system.",
        category: "supplements",
        format: "Gummies",
        ingredients: ["Bacillus Coagulans", "Apple Cider Vinegar", "Inulin"],
        rationale: "Gut-balancing gummy targeting digestion and bloating in a delicious chewable format.",
        priceINR: "₹699",
        scores: { marketSize: 90, novelty: 78, competition: 35 },
        competitiveIntelligence: {
          whiteSpace: "Liquid ACV tastes bad; pill probiotics are boring. High demand for gut gummies.",
          differentiation: "Combines 2 billion CFU spore probiotics with raw unfiltered ACV mother extract.",
          pricing: { low: "₹399", mid: "₹699", premium: "₹1,200" },
          topCompetitors: [
            { brand: "HealthKart (Market Leader)", product: "Apple Cider Vinegar", price: "₹399", platform: "Nykaa", keyIngredients: ["ACV with Mother"], keyClaims: "Improves metabolism and digestion" },
            { brand: "Olly (Premium)", product: "Probiotic Gummies", price: "₹2,100", platform: "Amazon", keyIngredients: ["Probiotics", "Prebiotics"], keyClaims: "Supports digestive balance" },
            { brand: "Purna (Direct Threat)", product: "ACV Gummies", price: "₹499", platform: "Nykaa", keyIngredients: ["Apple Cider Vinegar"], keyClaims: "Weight management and detox" }
          ]
        }
      },
      {
        id: 3004,
        name: "Curcumin + Piperine Anti-Inflammatory",
        tagline: "Target joint health and muscle recovery.",
        category: "supplements",
        format: "Softgel Capsule",
        ingredients: ["Curcumin 95% Standardized", "Piperine 95%", "Ginger Extract"],
        rationale: "Highly bioavailable anti-inflammatory supplement for active recovery.",
        priceINR: "₹599",
        scores: { marketSize: 78, novelty: 70, competition: 45 },
        competitiveIntelligence: {
          whiteSpace: "Curcumin has poor absorption; local brands lack curcumin-piperine complexes.",
          differentiation: "Standardized active curcumin paired with black pepper extract to increase absorption by 2000%.",
          pricing: { low: "₹299", mid: "₹599", premium: "₹999" },
          topCompetitors: [
            { brand: "Organic India (Market Leader)", product: "Turmeric Formula", price: "₹350", platform: "Nykaa", keyIngredients: ["Turmeric", "Ginger"], keyClaims: "Supports joint mobility" },
            { brand: "Solgar (Premium)", product: "Full Spectrum Curcumin", price: "₹2,800", platform: "Amazon", keyIngredients: ["Liquid Curcumin"], keyClaims: "Fast absorption anti-inflammatory" },
            { brand: "Carbamide Forte (Direct Threat)", product: "Curcumin with Black Pepper", price: "₹499", platform: "Nykaa", keyIngredients: ["Curcumin", "Piperine"], keyClaims: "Supports joints and immunity" }
          ]
        }
      },
      {
        id: 3005,
        name: "Marine Collagen Beauty Stack",
        tagline: "Premium marine peptides for radiant skin.",
        category: "supplements",
        format: "Powder Stack",
        ingredients: ["Hydrolyzed Marine Collagen", "Hyaluronic Acid", "Vitamin C"],
        rationale: "Targets skin elasticity, joint integrity, and nail strength with premium wild-caught peptides.",
        priceINR: "₹1,499",
        scores: { marketSize: 82, novelty: 80, competition: 38 },
        competitiveIntelligence: {
          whiteSpace: "Most collagens are bovine-sourced; lack of pure wild-caught fish collagen.",
          differentiation: "Ultra-purified marine peptides that lack fishy smell or aftertaste.",
          pricing: { low: "₹799", mid: "₹1,499", premium: "₹2,999" },
          topCompetitors: [
            { brand: "Wellbeing Nutrition (Market Leader)", product: "Marine Collagen", price: "₹1,999", platform: "Nykaa", keyIngredients: ["Korean Marine Collagen"], keyClaims: "Skin glow and anti-ageing" },
            { brand: "Inja (Premium)", product: "Fit Collagen", price: "₹2,400", platform: "Amazon", keyIngredients: ["Japanese Collagen"], keyClaims: "Nourishes skin and joints" },
            { brand: "HK Vitals (Direct Threat)", product: "Collagen Powder", price: "₹999", platform: "Nykaa", keyIngredients: ["Collagen", "Biotin"], keyClaims: "Stronger hair and bright skin" }
          ]
        }
      },
      {
        id: 3006,
        name: "L-Theanine + Chamomile Sleep gummies",
        tagline: "Relax. Sleep. Wake up refreshed.",
        category: "supplements",
        format: "Gummies",
        ingredients: ["L-Theanine", "Chamomile Extract", "Melatonin 3mg"],
        rationale: "Drug-free sleep aid targeting restless urban professionals.",
        priceINR: "₹899",
        scores: { marketSize: 80, novelty: 84, competition: 32 },
        competitiveIntelligence: {
          whiteSpace: "Melatonin pills cause morning grogginess; gummies are a highly sought alternative.",
          differentiation: "Combines L-Theanine with low-dose melatonin to induce natural sleep cycles.",
          pricing: { low: "₹399", mid: "₹899", premium: "₹1,499" },
          topCompetitors: [
            { brand: "Boldfit (Market Leader)", product: "Melatonin Tablets", price: "₹349", platform: "Nykaa", keyIngredients: ["Melatonin", "Valerian Root"], keyClaims: "Improves sleep latency" },
            { brand: "Olly (Premium)", product: "Sleep Gummies", price: "₹2,200", platform: "Amazon", keyIngredients: ["Melatonin", "L-Theanine"], keyClaims: "Healthy sleep cycle support" },
            { brand: "Setu (Direct Threat)", product: "Sleep & Restore Gummies", price: "₹899", platform: "Nykaa", keyIngredients: ["Melatonin", "Chamomile"], keyClaims: "Wake up fully rested" }
          ]
        }
      },
      {
        id: 3007,
        name: "Omega-3 Algae-Based Vegan Stack",
        tagline: "Pure DHA + EPA. 100% fish-free.",
        category: "supplements",
        format: "Softgel Capsule",
        ingredients: ["Algal Oil (DHA/EPA)", "Astaxanthin", "Vitamin E"],
        rationale: "Cruelty-free omega-3 source tailored for India's large vegetarian market.",
        priceINR: "₹1,299",
        scores: { marketSize: 86, novelty: 92, competition: 18 },
        competitiveIntelligence: {
          whiteSpace: "Omega-3 market is dominated by fish oils; vegan alternatives are imported and expensive.",
          differentiation: "Sourced directly from ocean algae, preventing typical fishy burps.",
          pricing: { low: "₹499", mid: "₹1,299", premium: "₹2,200" },
          topCompetitors: [
            { brand: "HK Vitals (Market Leader)", product: "Fish Oil Capsules", price: "₹599", platform: "Nykaa", keyIngredients: ["Fish Oil", "Omega-3"], keyClaims: "Supports heart and joints" },
            { brand: "True Basics (Premium)", product: "Vegan Omega", price: "₹1,800", platform: "Amazon", keyIngredients: ["Algal DHA"], keyClaims: "Pure vegetarian DHA source" },
            { brand: "Unived (Direct Threat)", product: "Algae Omega-3", price: "₹1,199", platform: "Nykaa", keyIngredients: ["Algal Oil", "EPA/DHA"], keyClaims: "Brain, heart, and eye support" }
          ]
        }
      },
      {
        id: 3008,
        name: "Shatavari + Iron PCOS Relief",
        tagline: "Hormonal balance. Natural vitality.",
        category: "supplements",
        format: "Powder Stack",
        ingredients: ["Shatavari Extract", "Iron Bisglycinate", "Myo-Inositol"],
        rationale: "Targets hormonal imbalance, cycle irregularities, and fatigue in active women.",
        priceINR: "₹999",
        scores: { marketSize: 84, novelty: 80, competition: 28 },
        competitiveIntelligence: {
          whiteSpace: "PCOS powders are either clinical inositols or raw herbs; lacking hybrid solutions.",
          differentiation: "Taps traditional Shatavari combined with gentle absorption iron and myo-inositol.",
          pricing: { low: "₹399", mid: "₹999", premium: "₹1,600" },
          topCompetitors: [
            { brand: "Cureveda (Market Leader)", product: "Women's Elixir", price: "₹795", platform: "Nykaa", keyIngredients: ["Shatavari", "Ashoka"], keyClaims: "Supports hormonal balance" },
            { brand: "Oziva (Premium)", product: "HerBalance PCOS", price: "₹899", platform: "Amazon", keyIngredients: ["Inositol", "Chasteberry"], keyClaims: "Regulates menstrual cycles" },
            { brand: "PCOS Club (Direct Threat)", product: "Inositol Powder", price: "₹999", platform: "Nykaa", keyIngredients: ["Myo-Inositol", "D-Chiro Inositol"], keyClaims: "Improves insulin sensitivity" }
          ]
        }
      }
    ],
    gapMatrixData: [
      { name: "Ashwagandha Gummies", x: 40, y: 85 },
      { name: "Plant Collagen Builder", x: 52, y: 88 },
      { name: "Probiotic ACV Gummies", x: 35, y: 90 },
      { name: "Curcumin Joint Softgels", x: 45, y: 78 },
      { name: "Marine Collagen Powder", x: 38, y: 82 },
      { name: "Sleep Gummies", x: 32, y: 80 },
      { name: "Omega-3 Algae Softgels", x: 18, y: 86 },
      { name: "PCOS Relief Powder", x: 28, y: 84 }
    ],
    trendData: [
      { month: "Oct 25", ashwagandha: 38, collagen: 52, probiotic: 25, curcumin: 18 },
      { month: "Nov 25", ashwagandha: 44, collagen: 58, probiotic: 32, curcumin: 24 },
      { month: "Dec 25", ashwagandha: 50, collagen: 64, probiotic: 40, curcumin: 30 },
      { month: "Jan 26", ashwagandha: 58, collagen: 70, probiotic: 48, curcumin: 38 },
      { month: "Feb 26", ashwagandha: 65, collagen: 78, probiotic: 55, curcumin: 46 },
      { month: "Mar 26", ashwagandha: 74, collagen: 82, probiotic: 65, curcumin: 52 },
      { month: "Apr 26", ashwagandha: 80, collagen: 88, probiotic: 74, curcumin: 60 },
      { month: "May 26", ashwagandha: 85, collagen: 92, probiotic: 82, curcumin: 68 }
    ],
    sentimentData: [
      { theme: "Taste / Flavour", positive: 88, negative: 12 },
      { theme: "Gut Discomfort", positive: 65, negative: 35 },
      { theme: "Absorption Speed", positive: 70, negative: 30 },
      { theme: "Capsule Size", positive: 45, negative: 55 }
    ]
  }
};
