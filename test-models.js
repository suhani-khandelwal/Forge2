import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.GEMINI_API_KEY;
if (!key) {
    console.error("No API key found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(key);

async function listModels() {
    try {
        console.log("Fetching models...");
        // This is a direct fetch because the SDK doesn't always have listModels exposed cleanly in all versions
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
