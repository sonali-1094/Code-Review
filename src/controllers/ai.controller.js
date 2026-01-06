const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code snippet is required" });
    }

    const review = await aiService(code);
    res.json({ review });
  } catch (err) {
    console.error("AI Service Error:", err);
    res.status(500).json({ error: "Something went wrong while processing the request." });
  }
};
