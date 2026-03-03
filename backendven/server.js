const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");
const prebookingRoutes = require("./routes/prebooking");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173"]
}));

app.use(bodyParser.json());

// Create table automatically
const createTableQuery = `
CREATE TABLE IF NOT EXISTS prebookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.error("❌ Table creation failed:", err);
  } else {
    console.log("✅ Pre-booking table ready");
  }
});

// Routes
app.use("/api/prebooking", prebookingRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});