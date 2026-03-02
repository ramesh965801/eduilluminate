const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",          // Or your cloud DB host
  user: "root",               // DB username
  password: "Ramesh@9658",   // DB password
  database: "prebooking_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

module.exports = db;