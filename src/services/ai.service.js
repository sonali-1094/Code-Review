require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

async function aiService(prompt) {
  try {
    if (!process.env.GOOGLE_GEMINI_KEY) {
      throw new Error("❌ GOOGLE_GEMINI_KEY is missing from .env");
    }

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

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
