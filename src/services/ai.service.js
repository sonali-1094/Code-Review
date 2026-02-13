require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GOOGLE_GEMINI_KEY || process.env.GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(apiKey);

async function aiService(prompt) {
  try {
    if (!apiKey) {
      throw new Error("GOOGLE_GEMINI_KEY or GEMINI_API_KEY is missing from .env");
    }

    const model = ai.getGenerativeModel({ model: "gemini-flash-latest" });

    // ✅ Only pass the text directly
    const result = await model.generateContent([
      `You are a senior code reviewer. 
Look at the provided code, identify issues, and suggest improvements 
with explanations and examples.

Code to review:
${prompt}`
    ]);

    return result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
           "⚠️ Gemini returned no content.";
  } catch (err) {
    console.error("AI Service error:", err.message);
    throw err;
  }
}

module.exports = aiService;
