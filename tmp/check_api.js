import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

async function auditAPI() {
  const key = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(key);

  try {
    console.log("--- 📡 Google AI API Audit ---");
    console.log(`Using Key ending in: ...${key.substring(key.length - 4)}`);

    // We'll try to reach the endpoint directly via fetch if listModels isn't clear
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();

    if (data.error) {
      console.error("❌ API ERROR:", data.error.message);
      console.log("Tip: Check if 'Generative Language API' is enabled in Google Cloud Console.");
    } else if (data.models) {
      console.log("✅ Models found for this key:");
      data.models.forEach(m => {
          console.log(` - ${m.name} [${m.supportedGenerationMethods.join(', ')}]`);
      });
    } else {
      console.log("⚠️  Endpoint reached but no generative models were returned for this key.");
    }

  } catch (err) {
    console.error("Audit Failed:", err.message);
  }
}

auditAPI();
