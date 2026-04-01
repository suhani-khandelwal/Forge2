import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import { fileURLToPath } from "url";
import { scrapeProductReviews } from "./src/utils/scraper.js";

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

// AI Turbo Relay Factory (Zero-Wait Switch)
async function generateWithKeyRotation(prompt, retryCount = 0) {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
  
  // Shuffle keys to distribute traffic across quotas
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
        
        if (isQuotaError) {
          console.log(`  [AI] ⚠️ Key [${key.slice(0, 8)}...] Limit Reached. Switching to next relay...`);
          // Note: No 'await setTimeout' here. We instantly try the next key/model combo.
          continue; 
        }
        
        console.error(`  [AI] ⚠️ Fatal Error with ${modelName}: ${err.message.slice(0, 100)}...`);
        continue;
      }
    }
  }

  // If we reach here, it means EVERY key was rate limited
  if (retryCount < 2) {
    const waitTime = 30000; // Final safety cooldown
    console.log(`  [AI] 🚧 All Keys Exhausted. Cooling down for ${waitTime/1000}s...`);
    await new Promise(r => setTimeout(r, waitTime));
    return generateWithKeyRotation(prompt, retryCount + 1);
  }

  throw new Error(`Strategic Forge Timed Out: All API Keys hit cumulative limits. Last: ${lastAiError}`);
}

// ─── Strategic Breadcrumb Harvester ───────────────────────
async function fetchMarketBreadcrumbs(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  try {
    console.log(`  [Agent] 🕵️ Harvesting: "${query.slice(0, 50)}..."`);
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) return "";
    const html = await response.text();
    const snippets = [];

    // Fallback Patterns for DuckDuckGo HTML
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
    console.error(`  [Agent] ❌ Scrape Blocked: ${err.message}`);
    return "";
  }
}

// Deep Intelligence Coordinator (Branching Discovery)
async function runStrategicDiscovery(category, keywords = "") {
  const missionType = keywords ? "GUIDED SEARCH" : "AUTONOMOUS BROAD SCAN";
  console.log(`  [Agent] 🧠 Mission: ${missionType} for ${category} [Focus: ${keywords || "Broad"}]`);
  
  const queryPrompt = keywords 
    ? `Generate 3 specific "Market Breadcrumb" search queries focusing on "${keywords}" within the Indian "${category}" market. Find real problems/complaints about ingredients or formulations. Return ONLY a comma-separated list.`
    : `Generate 3 visionary "Market Breadcrumb" search queries for the Indian "${category}" market. Focus on FINDING NEW PROBLEMS that are currently underserved. Return ONLY a comma-separated list.`;

  const rawQueries = await generateWithKeyRotation(queryPrompt);
  const queries = rawQueries.split(",").map(q => q.trim()).slice(0, 3);
  
  console.log(`  [Agent] 🔍 RESEARCHING: ${queries.join(", ")}`);

  const results = await Promise.all(queries.map(q => fetchMarketBreadcrumbs(q)));
  const signals = results.filter(Boolean).join("\n\n---\n\n");
  
  if (!signals) {
    console.warn("  [Agent] ⚠️ External Signals Blocked. Swapping to INTERNAL MARKET ARCHIVE.");
    return `SIGNAL CAPTURE BLOCKED: Initiating Deep Market Simulation for ${category} with focus on ${keywords || "General Patterns"}.`;
  }
  
  console.log(`  [Agent] ✅ Harvested ${signals.length} bytes of niche market signals.`);
  return signals;
}

// ─── API Routes ─────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => {
  res.json({ status: "alive", keys: apiKeys.length, lastError: lastAiError });
});

app.post("/api/generate-insights", async (req, res) => {
  const { url, category, keywords } = req.body;
  const currentMonth = new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  const currentSeason = (new Date().getMonth() > 1 && new Date().getMonth() < 6) ? "Peak Summer (Humid/Hot)" : "Variable / Winter";

  console.log(`\n[Agent] 🚀 STRATEGIC FORGE START: ${category} | Focus: ${keywords || "None"}`);
  
  try {
    let marketSignals = "";
    let dataOrigin = "";

    if (url && url.startsWith("http")) {
      console.log(`  [Agent] 🧭 Focusing on Deep Product Scrape...`);
      const scraped = await scrapeProductReviews(url);
      marketSignals = scraped.reviews?.join("\n\n") || "SCROLL CAPTURE BLOCKED.";
      dataOrigin = `PRIMARY PRODUCT URL: ${url}\nSCRAPED TITLE: ${scraped.title}`;
    } else {
      console.log(`  [Agent] 🧭 Focusing on ${keywords ? 'Guided' : 'Autonomous'} Discovery...`);
      marketSignals = await runStrategicDiscovery(category, keywords);
      dataOrigin = keywords ? `GUIDED DISCOVERY (Focus: ${keywords})` : `AUTONOMOUS DISCOVERY (Market: ${category})`;
    }

    console.log(`  [Agent] 🧪 FORGING STRATEGIC CONCEPTS...`);
    const forgePrompt = `
      You are the "Strategic Innovation Lead" for the Indian wellness market.
      
      TIME CONTEXT: ${currentMonth} | SEASON: ${currentSeason}
      MISSION: Forge 3 breakthrough product concepts for ${category}.
      ${keywords ? `USER STRATEGIC FOCUS: "${keywords}"` : `FOCUS: Broad Market Scan.`}
      
      MARKET SIGNALS HARVESTED:
      """
      ${marketSignals.slice(0, 5000)}
      """
      
      ### STRATEGIC INSTRUCTION: THE FUNCTIONAL PIVOT
      Before choosing competitors, you MUST analyze the "Physical Symptom" your product solves.
      - DISTINGUISH between Biological Repair (Internal - e.g., Ceramides for Barrier Repair) and Functional Defense (External - e.g., Anti-pollution, UV Shield, Sweat protection).
      - SELECT competitors based on the FUNCTIONAL CLASS. If your product is a "Barrier against pollution," do NOT find Ceramides creams; find Anti-pollution mists/shields.
      - SYMPTOMATIC SYMMETRY: Competitors must solve the EXACT same physical problem (e.g. "Sticky skin in humidity" or "Dullness from UV").
      
      TASK: 
      1. Synthesize concepts with your DEEP internal knowledge of Formulation Chemistry & Indian Skin/Hair Physics.
      2. Identify a "Strategic Whitespace" based on the above Functional Class.
      3. Forge 3 unique product concepts.
      4. For each concept, generate a "Competitive Intelligence profile" with FUNCTIONAL COMPETITORS (Brand + Product + Price + Platform + Key Claims).
      
      Return ONLY a valid JSON object:
      {
        "signalSummary": { "topInsight": "...", "marketMood": "..." },
        "concepts": [
          {
            "id": "A random number",
            "name": "Concept Name",
            "tagline": "Science-backed tagline",
            "category": "${category}",
            "format": "Gel / Oil / Serum",
            "ingredients": ["Active 1", "Active 2"],
            "rationale": "Strategic reasoning",
            "scores": { "marketSize": 85, "novelty": 90 },
            "competitiveIntelligence": {
               "whiteSpace": "The unmet gap in the FUNCTIONAL niche",
               "differentiation": "Exact formula/marketing edge over functional peers",
               "pricing": { "low": "₹...", "mid": "₹...", "premium": "₹..." },
               "topCompetitors": [
                  { "brand": "...", "product": "...", "price": "₹...", "platform": "Nykaa/Amazon", "keyIngredients": ["...", "..."], "keyClaims": "Focus on the FUNCTIONAL symptom they share with your concept" }
               ]
            }
          }
        ],
        "metadata": { "origin": "${dataOrigin}", "season": "${currentSeason}", "userFocus": "${keywords || 'None'}" }
      }
    `;

    const aiResponse = await generateWithKeyRotation(forgePrompt);
    const result = JSON.parse(aiResponse.replace(/```json\n?|```/g, "").trim());

    res.json({ ...result, generatedAt: new Date(), agentStatus: "Strategic Forge Complete" });
    console.log(`  [Agent] ✅ MISSION SUCCESS: Forged ${result.concepts?.length} innovation concepts.`);

  } catch (error) {
    console.error("[Agent Error]:", error.message);
    res.status(500).json({ error: error.message });
  }
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
});

export default app;
