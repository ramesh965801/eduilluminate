const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // your MySQL username
  password: "Ramesh@9658", // your MySQL password
  database: "prebooking_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

module.exports = db;