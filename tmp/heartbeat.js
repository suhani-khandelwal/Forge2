import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

async function testKey() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.error("❌ ERROR: GEMINI_API_KEY is missing from .env!");
    return;
  }

  console.log(`\n--- 🧪 Gemini API Live Heartbeat ---`);
  console.log(`Key Found: ${key.substring(0, 8)}...`);

  const genAI = new GoogleGenerativeAI(key);
  const models = ["gemini-1.5-flash", "gemini-1.5-pro"];

  for (const modelName of models) {
    try {
      console.log(`\nAttempting [${modelName}]...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Respond with 'ALIVE' and nothing else.");
      console.log(`✅ Success! [${modelName}] is fully functional.`);
      console.log(`Response: ${result.response.text()}`);
    } catch (err) {
      console.error(`❌ FAILED [${modelName}]:`);
      console.error(`   - Status: ${err.status || "Unknown"}`);
      console.error(`   - Message: ${err.message}`);
    }
  }
}

testKey();
