// testGemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

console.log("KEY:", process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent("Hello");
  console.log(result.response.text());
}

test();
