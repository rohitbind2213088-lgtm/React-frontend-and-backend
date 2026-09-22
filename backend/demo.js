const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app=express();
const PORT=5000;
const server=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"student",
    password:""
})

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{

    res.send(`<form action='/test'>
            <input type="text" name="name"><br>
            <input type="text" name="email"><br>
            <input type="text" name="password"><br>
            <input type="text" name="mobile">
            <input type='submit' name='cmd' value='update'> <input type='submit' name='cmd' value='insert'></form`) 
        
});
     app.get('/test',(req,res)=>{
        server.connect();
        let error="";
        let results="";

        console.log(server);
        const {name ,email,password,mobile,cmd}=req.query;

        if(cmd=="update")
        {
             res.send("Write update code");
        }
        else
            if(cmd=="insert")
        {
           res.send("Write insert code");

           server.query(`INSERT INTO signup VALUES('${name}', '${email}', '${password}', '${mobile}')`,(error, results));
        }
        else
               res.send(cmd);
     });  

     app.listen(PORT,()=>{
          console.log(`Server running on http://localhost:${PORT}`);
     })