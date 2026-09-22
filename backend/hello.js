const express= require("express");
const mysql=require("mysql2");
const cors=require("cors");
const { name } = require("ejs");
const app=express();
const port=4000;

const server=mysql.createConnection({
     host:"localhost",
     user:"root",
     database:"student",
     password:"",
});
server.connect();
app.get("/", (req, res) => {
  
  let error=null;
  let results=null;
  const {email}=req.query;
  console.log(email);
    server.query(`SELECT * FROM details where email='${email}'`, (error, results) => {
      if(error)
      {
        console.log(error);
        res.send(error);
      res.end();
      }
      else{
      // console.log(results);
      res.send(results);
      res.end();
      }
    }
  );
  
  console.log("results");
  // server.
  // server.destroy();
  // res.send("results");
});



app.listen(port, () => {
  console.log(`Open http://localhost:${port}`);
});
