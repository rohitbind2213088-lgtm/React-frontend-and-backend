const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;


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
app.get("/openaccount", (req, res) => {
console.log(req.query);
    // console.log(req.query.customername);
    customername=req.query.customername;
    account=req.query.account;
    balance=req.query.balance;
    console.log(customername,account,balance);
    let sql=`INSERT  INTO customers  VALUES ('${account}', '${customername}', '${balance}')`;
             ///server.query(`INSERT INTO details  VALUES ('${name}', '${email}', '${password}', '${mobile}')`, (error, results) );
             console.log(sql);
server.query(sql);
 res.send("openaccount");


});






app.get("/", (req, res) => {
    res.render("NewAccount.ejs");
 
});

 


app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})