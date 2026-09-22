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
  res.render(`hello.ejs`, {});  
     
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
            res.send("write insert code");
             server.query(`INSERT INTO details  VALUES ('${name}', '${email}', '${password}', '${mobile}')`, (error, results) );
        }      

        else   
          if(cmd=="delete")
            {
              res.send("write delete code");
              server.query(`DELETE  FROM details WHERE email='${email}'`,(error,results));
            }   
            else 
                if(cmd=="show")
                {
                    res.send("write show code")
                    server.query(`SELECT * FROM details WHERE email='${email}'`,(error,results));

                }
                else
    res.send(cmd);
    // res.json({message :'data insert success'});
});





app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})