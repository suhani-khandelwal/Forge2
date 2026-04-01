import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: 'c:/Users/akash/OneDrive/Desktop/forge-app/.env' });

async function verify() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ No API key found in .env");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Try only the 3 most stable, common names
  const models = [
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-1.0-pro"
  ];

  console.log("--- FINAL DIAGNOSTIC START ---");
  for (const model of models) {
    try {
      const m = genAI.getGenerativeModel({ model });
      const result = await m.generateContent("hi");
      console.log(`✅ [${model}] SUCCESS: ${result.response.text().substring(0, 10)}...`);
    } catch (e) {
      console.log(`❌ [${model}] FAILED: ${e.message.substring(0, 100)}`);
    }
  }
}
verify();
