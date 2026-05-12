import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini
const apiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_1
].filter(Boolean);

console.log(`\n  🔑  Identity Check: ${apiKeys.length} active API key(s) loaded from .env`);
if (apiKeys.length === 0) console.error("  ⚠️   WARNING: No API keys found! Autonomous Research will fail.");

let lastAiError = "None";

// AI Turbo Relay Factory
async function generateWithKeyRotation(prompt, retryCount = 0) {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
  const shuffledKeys = [...apiKeys].sort(() => Math.random() - 0.5);
  
  for (const key of shuffledKeys) {
    const genAI = new GoogleGenerativeAI(key);
    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (err) {
        lastAiError = err.message;
        const isQuotaError = err.message.includes("429") || err.message.includes("Quota");
        if (isQuotaError) continue;
        console.error(`  [AI] ⚠️ Fatal Error with ${modelName}: ${err.message.slice(0, 100)}...`);
        continue;
      }
    }
  }

  throw new Error(`Strategic Forge Timed Out: All API Keys hit cumulative limits. Last: ${lastAiError}`);
}

// Lightweight Scraper (replaces Puppeteer)
async function lightweightScrape(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html',
        'Accept-Language': 'en-IN,en;q=0.9'
      },
      signal: AbortSignal.timeout(8000)
    });
    
    const html = await response.text();
    const textBlocks = [];
    const patterns = [
      /data-hook="review-body"[^>]*>([^<]{30,500})/g,
      /class="css-[^"]*review[^"]*"[^>]*>([^<]{30,500})/g,
      /<p[^>]*>([^<]{50,400})<\/p>/g
    ];
    
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null && textBlocks.length < 20) {
        textBlocks.push(match[1].trim());
      }
    }
    return textBlocks.join('\n\n');
  } catch (err) {
    return '';
  }
}

// Caching and Queries
const cache = new Map();
const CACHE_TTL = 15 * 60 * 1000; // 15 min

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

const CATEGORY_QUERIES = {
  skincare: [
    "Indian skincare consumer complaints 2025 Reddit Amazon reviews",
    "best selling skincare ingredients India Nykaa trending 2025"
  ],
  haircare: [
    "hair fall solutions India consumer reviews 2025 Reddit haircare",
    "trending haircare ingredients India D2C brands Nykaa 2025"
  ],
  supplements: [
    "health supplements India consumer complaints Reddit 2025",
    "trending wellness supplements India market gaps 2025"
  ]
};

async function fetchMarketBreadcrumbs(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) return "";
    const html = await response.text();
    const snippets = [];
    const patterns = [
      /<a class="result__snippet"[\s\S]*?>([\s\S]*?)<\/a>/g,
      /<div class="result__snippet"[\s\S]*?>([\s\S]*?)<\/div>/g,
      /<div class="snippet"[\s\S]*?>([\s\S]*?)<\/div>/g
    ];
    for (const regex of patterns) {
      let match;
      while ((match = regex.exec(html)) !== null && snippets.length < 5) {
        const clean = match[1].replace(/<[^>]*>?/gm, '').trim();
        if (clean && clean.length > 20) snippets.push(clean);
      }
      if (snippets.length > 0) break;
    }
    return snippets.join("\n\n");
  } catch (err) {
    return "";
  }
}

function buildForgePrompt(category, signals, keywords = '') {
  const currentMonth = new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  
  return `You are the Strategic Innovation Lead for India's wellness market.
CONTEXT: ${currentMonth} | Category: ${category}${keywords ? ` | Focus: ${keywords}` : ''}

LIVE MARKET SIGNALS:
"""
${signals.slice(0, 3000)}
"""

INDIAN D2C PRICING REFERENCE (Nykaa/Amazon IN, 2025 current market):
Skincare:
  - Basic serums (niacinamide, HA, Vitamin C): ₹299–₹699
  - Active serums (retinol, azelaic acid, peptides): ₹599–₹999
  - Moisturizers / day creams: ₹199–₹599
  - Sunscreens: ₹299–₹599 (mass), ₹599–₹899 (premium gel)
  - Face masks / mists: ₹299–₹699
Haircare:
  - Scalp serums / tonics: ₹399–₹799
  - Shampoos / conditioners: ₹249–₹599
  - Hair masks / treatments: ₹299–₹549
  - Hair gummies / nutraceuticals: ₹699–₹999
Supplements:
  - Basic capsules / softgels: ₹399–₹699
  - Gummies (30 count): ₹499–₹899
  - Premium powders / stacks: ₹799–₹1,299

PRICING RULE: Set priceINR at the lower-to-mid end of the relevant tier UNLESS the concept has a genuine first-mover or clinically unique advantage that justifies a premium. The goal is market penetration pricing — competitive enough to take share from incumbents.

SCORING RUBRIC — Calculate each score based on real market logic, not optimism:
scores.marketSize (0–100) — How many Indians have this problem?
  95–100: Tens of millions affected; mass-market essential (e.g., hair fall, vitamin D, sunscreen)
  80–94: Millions affected; large but somewhat specific segment (e.g., acne, PCOS, scalp health)
  65–79: Hundreds of thousands; growing but not yet mainstream (e.g., nootropics, blue light skin)
  Below 65: Niche or very early market — proceed with caution

scores.competition (0–100) — How crowded is this category on Amazon IN / Nykaa right now?
  80–100: Flooded — 50+ Indian SKUs exist, dominated by major brands (e.g., basic moisturizers, plain vitamin C)
  55–79: Moderate — 15–50 SKUs, some established players but room to differentiate
  30–54: Low — Fewer than 15 Indian options, mostly imports or a few small brands
  10–29: Blue ocean — essentially no Indian equivalent; category either very new or ignored by D2C brands
  Below 10: True white space — format or combination does not exist in India

scores.novelty (0–100) — How differentiated is this concept from existing competitors?
  90–100: No direct equivalent in India; genuinely new format, combination, or mechanism of action
  75–89: Exists globally or as a prescription item, but no accessible Indian D2C version
  55–74: Indian options exist but this concept has a meaningful upgrade (better ingredients, format, or positioning)
  Below 55: Incremental improvement only; consumers can easily substitute with existing options

IMPORTANT: Scores must vary between concepts. One concept should typically score higher on novelty and lower on competition than the other.

For topCompetitors: List 3 real, existing Indian D2C brands (e.g., Minimalist, Mamaearth, Dot & Key, The Derma Co, Plum, mCaffeine, WOW, Pilgrim, Fixderma, etc.) that compete most directly with this concept.
- keyIngredients: List 2–3 of the competitor's primary active ingredients exactly as they appear on the product label.
- keyClaims: Write the competitor's single most prominent marketing claim as it appears on their product page or packaging.

For gapMatrixData: Generate one entry per concept. "name" must match the concept's name. "x" is the competition score (0-100). "y" is Unmet Consumer Demand (0-100, higher = more demand based on market signals).
For trendData: Use key ingredient names from your generated concepts as data keys. Show realistic trending upward curves for the last 8 months (Sep 24–Apr 25).
For sentimentData: Use relevant consumer complaint/praise themes from the market signals.

Generate a market intelligence report. Return ONLY valid JSON:
{
  "signalSummary": { "topInsight": "...", "marketMood": "..." },
  "concepts": [
    {
      "id": ${Math.floor(Math.random() * 10000)},
      "name": "string",
      "tagline": "string", 
      "category": "${category}",
      "format": "string",
      "ingredients": ["string"],
      "rationale": "string",
      "priceINR": "₹...",
      "scores": { "marketSize": 85, "novelty": 90, "competition": 45 },
      "competitiveIntelligence": {
        "whiteSpace": "string",
        "differentiation": "string",
        "pricing": { "low": "₹...", "mid": "₹...", "premium": "₹..." },
        "topCompetitors": [
          { "brand": "string", "product": "string", "price": "₹...", "platform": "string", "keyIngredients": ["string"], "keyClaims": "string" },
          { "brand": "string", "product": "string", "price": "₹...", "platform": "string", "keyIngredients": ["string"], "keyClaims": "string" },
          { "brand": "string", "product": "string", "price": "₹...", "platform": "string", "keyIngredients": ["string"], "keyClaims": "string" }
        ]
      }
    },
    {
      "id": ${Math.floor(Math.random() * 10000)},
      "name": "string",
      "tagline": "string", 
      "category": "${category}",
      "format": "string",
      "ingredients": ["string"],
      "rationale": "string",
      "priceINR": "₹...",
      "scores": { "marketSize": 85, "novelty": 90, "competition": 45 },
      "competitiveIntelligence": {
        "whiteSpace": "string",
        "differentiation": "string",
        "pricing": { "low": "₹...", "mid": "₹...", "premium": "₹..." },
        "topCompetitors": [
          { "brand": "string", "product": "string", "price": "₹...", "platform": "string", "keyIngredients": ["string"], "keyClaims": "string" },
          { "brand": "string", "product": "string", "price": "₹...", "platform": "string", "keyIngredients": ["string"], "keyClaims": "string" },
          { "brand": "string", "product": "string", "price": "₹...", "platform": "string", "keyIngredients": ["string"], "keyClaims": "string" }
        ]
      }
    }
  ],
  "gapMatrixData": [
    { "name": "ConceptName", "x": 50, "y": 80 }
  ],
  "trendData": [
    { "month": "Sep 24", "ingredient1": 60, "ingredient2": 45 },
    { "month": "Oct 24", "ingredient1": 65, "ingredient2": 50 },
    { "month": "Nov 24", "ingredient1": 70, "ingredient2": 55 },
    { "month": "Dec 24", "ingredient1": 78, "ingredient2": 62 },
    { "month": "Jan 25", "ingredient1": 82, "ingredient2": 70 },
    { "month": "Feb 25", "ingredient1": 86, "ingredient2": 75 },
    { "month": "Mar 25", "ingredient1": 90, "ingredient2": 82 },
    { "month": "Apr 25", "ingredient1": 88, "ingredient2": 85 }
  ],
  "sentimentData": [
    { "theme": "theme", "positive": 80, "negative": 20 }
  ]
}`;
}

async function runFullPipeline(category, keywords, url) {
  let signals = "";
  if (url) {
    signals = await lightweightScrape(url);
  } else {
    const queries = CATEGORY_QUERIES[category] || [category + " trending products India", category + " consumer complaints India"];
    const results = await Promise.all(queries.map(fetchMarketBreadcrumbs));
    signals = results.filter(Boolean).join("\n\n");
  }
  
  if (!signals) signals = "Generic high-competition market, consumers seek better formulations and efficacy.";

  const prompt = buildForgePrompt(category, signals, keywords);
  const aiResponse = await generateWithKeyRotation(prompt);
  const parsed = JSON.parse(aiResponse.replace(/```json\n?|```/g, "").trim());
  return parsed;
}

const inflight = new Map();

async function preSeedCache() {
  console.log('  [Cache] 🌱 Pre-seeding intelligence cache...');
  for (const category of ['skincare', 'haircare', 'supplements']) {
    try {
      const result = await runFullPipeline(category, null, null);
      cache.set(`${category}::undefined`, { data: result, timestamp: Date.now() });
      console.log(`  [Cache] ✅ ${category} pre-seeded`);
    } catch (e) {
      console.log(`  [Cache] ⚠️  ${category} pre-seed failed`, e.message);
    }
  }
}

// ─── API Routes ─────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => {
  res.json({ status: "alive", keys: apiKeys.length, lastError: lastAiError });
});

app.get("/api/generate-stream", async (req, res) => {
  const { category, keywords, url } = req.query;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const emit = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    const cacheKey = `${category}::${keywords}`;
    
    emit('step', { id: 0, label: 'Checking intelligence archive...' });
    
    // Check cache
    if (!url) {
      const cached = getCached(cacheKey);
      if (cached) {
        emit('step', { id: 1, label: 'Cache hit — retrieving stored intelligence' });
        emit('step', { id: 4, label: 'Intelligence report ready' });
        emit('complete', { ...cached, generatedAt: new Date(), agentStatus: 'Strategic Forge Complete (Cached)' });
        return res.end();
      }
    }

    // Process
    let promise;
    if (!url && inflight.has(cacheKey)) {
       promise = inflight.get(cacheKey);
       emit('step', { id: 1, label: 'Joining existing strategic forge mission...' });
    } else {
       emit('step', { id: 1, label: 'Harvesting live market signals...' });
       
       promise = runFullPipeline(category, keywords, url).then(result => {
         if (!url) cache.set(cacheKey, { data: result, timestamp: Date.now() });
         if (!url) inflight.delete(cacheKey);
         return result;
       }).catch(err => {
         if (!url) inflight.delete(cacheKey);
         throw err;
       });
       
       if (!url) inflight.set(cacheKey, promise);
    }
    
    // Periodically emit an intermediate step to show progress while waiting for the promise
    let isDone = false;
    promise.then(() => { isDone = true; }).catch(() => { isDone = true; });
    setTimeout(() => { if (!isDone) emit('step', { id: 2, label: 'Synthesizing product intelligence...' }); }, 3000);
    setTimeout(() => { if (!isDone) emit('step', { id: 3, label: 'Validating concept architecture...' }); }, 6000);

    const parsed = await promise;
    emit('step', { id: 4, label: 'Intelligence report ready' });
    emit('complete', { ...parsed, generatedAt: new Date(), agentStatus: 'Strategic Forge Complete' });
    // res.end() cannot be called immediately if we want to keep the stream alive, but it finishes here.
    res.end();
  } catch (error) {
    console.error("[Agent Error]:", error.message);
    emit('error', { message: error.message });
    res.end();
  }
});

// Original endpoint for backward compatibility
app.post("/api/generate-insights", async (req, res) => {
  res.status(400).json({ error: "Use /api/generate-stream" });
});

// ─── Frontend Delivery ──────────────────────────────────────────────────────
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n  🚀 AI Forge Backend [VERSION 2.0 - STRATEGIC ENGINE] running on Port ${PORT}\n`);
  preSeedCache();
});

export default app;
