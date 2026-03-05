// backend/routes/prebooking.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// SAVE PREBOOKING
router.post("/", (req, res) => {
  const { product_id, name, email, phone, quantity, address } = req.body;
  if (!product_id || !name || !email || !phone || !quantity || !address)
    return res.status(400).json({ message: "All fields required" });

  const sql = `
    INSERT INTO prebookings (product_id, name, email, phone, quantity, address) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [product_id, name, email, phone, quantity, address], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.status(201).json({ success: true, bookingId: result.insertId });
  });
});

module.exports = router;