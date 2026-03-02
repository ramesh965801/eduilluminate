const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const prebookingRoutes = require("./routes/prebooking");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow requests only from your frontend
app.use(cors({
  origin: "https://eduilluminate.vercel.app"
}));

app.use(bodyParser.json());

// Create table if it doesn't exist
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
  if (err) throw err;
  console.log("Pre-booking table ready");
});

// Routes
app.use("/api/prebooking", prebookingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});