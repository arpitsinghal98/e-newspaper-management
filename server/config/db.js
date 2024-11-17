// server/config/db.js
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Use environment variable
  user: process.env.DB_USER, // Use environment variable
  password: process.env.DB_PASSWORD, // Use environment variable
  database: process.env.DB_NAME, // Use environment variable
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

module.exports = connection;
