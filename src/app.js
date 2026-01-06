const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');

const app = express();

// ✅ Allow frontend running on localhost:5174
app.use(cors({
  origin: "http://localhost:5174",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// AI routes
app.use('/ai', aiRoutes);

module.exports = app;
