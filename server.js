const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173"
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json());

// Routes
const aiRoutes = require("./src/routes/ai.routes");
app.use("/ai", aiRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Backend is working! Use POST /ai/get-review to test AI.");
});

// Start server
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
