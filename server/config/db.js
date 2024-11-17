// server/config/db.js
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "E_Newspaper", // Your database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

module.exports = connection;
