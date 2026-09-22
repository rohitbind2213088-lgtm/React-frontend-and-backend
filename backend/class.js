const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

const server = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "student",
    password: ""
});
server.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err.message);
    } else {
        console.log("MySQL connected successfully!");
    }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});