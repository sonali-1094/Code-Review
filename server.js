const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:5174",   // allow your frontend
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const aiRoutes = require("./src/routes/ai.routes");
app.use("/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("✅ Backend is working! Use POST /ai/get-review to test AI.");
});

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
