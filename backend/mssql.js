const sql = require("mssql");
const express = require("express");

const app = express();
const port = 3000;

const config = {
  server: "SG2NWPLS19SQL-v09.mssql.shr.prod.sin2.secureserver.net",
  port: 1433,
  database: "testwhatsapp",
  user: "testwhatsapp",
  password: 'M%E4Zn3li3oxjkp_',

  options: {
    encrypt: true,
    trustServerCertificate: true
  },

  connectionTimeout: 30000,
  requestTimeout: 30000
};

async function testConnection() {
  let pool;

  try {
   
    pool = await new sql.ConnectionPool(config).connect();
    console.log("Database connected successfully!");

    let result = await pool.request().query(
      "SELECT DB_NAME() AS databaseName;"
    );

    result = await pool.request().query(
        "SELECT DB_NAME() AS databaseName"
    );

    result = await pool.request().query(
        "insert into users values ('Rohit ', 'prince', '123');"
    );

    result = await pool.request().query(
        "SELECT * from users;"
    );
    console.log("Data:", result);
   } catch (error) {
    console.error("Connection failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (pool) await pool.close();
  }
}

testConnection();


 