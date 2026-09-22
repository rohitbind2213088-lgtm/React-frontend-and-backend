const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database("parties.db");

app.set("view engine", "ejs");

db.run(`
  CREATE TABLE IF NOT EXISTS parties (
    sno INTEGER PRIMARY KEY AUTOINCREMENT,
    partytakername TEXT,
    partygiver TEXT,
    items TEXT
  )
`);

app.get("/", (req, res) => {
  const action = req.query.action;
  const value = req.query.value || "";

  if (action === "show") {
    db.get(
      "SELECT * FROM parties WHERE sno = ?",
      [value],
      (error, party) => {
        res.render("index", {
          parties: party ? [party] : [],
          message: party ? "Record found." : "Record not found."
        });
      }
    );
  }

  else if (action === "add") {
    db.run(
      `INSERT INTO parties
       (partytakername, partygiver, items)
       VALUES (?, 'Amit', 'Varanasi sweets')`,
      [value],
      () => {
        showAll("Record added successfully.");
      }
    );
  }

  else if (action === "update") {
    const data = value.split(",");
    const sno = data[0];
    const newName = data[1];

    db.run(
      `UPDATE parties
       SET partytakername = ?,
           partygiver = 'Amit',
           items = 'Varanasi sweets'
       WHERE sno = ?`,
      [newName, sno],
      () => {
        showAll("Record updated successfully.");
      }
    );
  }

  else if (action === "delete") {
    db.run(
      "DELETE FROM parties WHERE sno = ?",
      [value],
      () => {
        showAll("Record deleted successfully.");
      }
    );
  }

  else {
    showAll("");
  }

  function showAll(message) {
    db.all(
      "SELECT * FROM parties ORDER BY sno",
      (error, parties) => {
        res.render("index", {
          parties: parties,
          message: message
        });
      }
    );
  }
});

app.listen(3000, () => {
  console.log("Open http://localhost:3000");
});
