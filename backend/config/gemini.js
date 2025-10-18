// backend/config/gemini.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// ✅ Initialize the new Gemini client
// The client automatically reads GEMINI_API_KEY from your .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ✅ Define your model (latest supported model as of Oct 2025)
export const modelName = "gemini-2.5-flash";

// ✅ A helper function to generate content
export async function generateWithGemini(prompt) {
  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
  });
  return response.text;
}

// ✅ Export the client for custom use (if needed)
export default ai;
