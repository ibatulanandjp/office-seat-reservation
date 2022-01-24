"use strict";

const mysql = require("mysql");

// Create db connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "officereservationdb",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.log("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database on thread: " + db.threadId);
});

module.exports = db;
