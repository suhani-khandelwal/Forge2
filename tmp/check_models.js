import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

async function listModels() {
  const key = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(key);

  try {
    console.log("--- 📡 Fetching Available Models for your API Key ---");
    // Note: The SDK doesn't always expose a direct listModels, so we test the most common stable ones
    const testModels = [
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-1.5-flash-8b",
      "gemini-1.0-pro",
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash-latest"
    ];

    for (const mName of testModels) {
      try {
        const model = genAI.getGenerativeModel({ model: mName });
        await model.generateContent("test");
        console.log(`✅ [${mName}] is AVAILABLE`);
      } catch (e) {
        if (e.message.includes("404")) {
          console.log(`❌ [${mName}] is NOT FOUND (404)`);
        } else if (e.message.includes("429")) {
          console.log(`🚦 [${mName}] is AVAILABLE but RATE LIMITED (429)`);
        } else {
          console.log(`⚠️  [${mName}] Unknown Error: ${e.message.substring(0, 50)}`);
        }
      }
    }
  } catch (err) {
    console.error("Discovery Failed:", err.message);
  }
}

listModels();
