const aiService = require("../services/ai.service");

exports.getReview = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    const review = await aiService(text);
    return res.status(200).json({ review });
  } catch (error) {
    console.error("AI Error:", error.message || error);
    return res.status(500).json({ error: "AI review failed" });
  }
};
