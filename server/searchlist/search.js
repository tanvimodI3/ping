const express = require("express");
require("dotenv").config();
const pool = require('../db');
const router = express.Router();

// const app=express();

// const cors=require("cors");
// app.use(cors({
//   origin: ['*'], //http://localhost:3000
//   credentials: true
// }));

// app.use(express.json());


router.get("/usersearch",async(req,res)=>{
  try {
    const response= await pool.query(
    "SELECT userid,username FROM users"
  );

    console.log("users rows");
    console.log({rows: response.rows});

    //res.send("check console");
    res.json({rows: rows.response});
} 
catch(error) {
   console.error('Error fetching data:',error);
  res.status(500).json({error:'Internal server error'});
}
});


router.get("/usersearch", async(req,res)=>{
  const {email} = req.body;

  const user2name = await pool.query(
    "SELECT username FROM users WHERE email=$1",
    [email] 
  );

  const user2id = await pool.query(
    "SELECT userID FROM users WHERE email=$1",
    [email] 
  );

  console.log(`user details ${user2name} ${user2id}`);

  res.json("got it",user2name,user2id);

})


router.get("/grpsearch",async(req,res)=>{
  try {
    const response= await pool.query(
    "SELECT DISTINCT roomid,name FROM groups ORDER BY roomid"
  );

    console.log("rooms rows");
    console.log({rows: response.rows});

    //res.send("check console");
    res.json({rows: response.rows});
} 
catch(error) {
   console.error('Error fetching data:',error);
  res.status(500).json({error:'Internal server error'});
}
});

router.post("/addgrp", async (req, res) => {
  const {name,userid} = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO groups (name, userid)
       VALUES ($1, $2)
       RETURNING roomid`,
      [name, userid]
    );
    res.status(201).json({roomid:result.rows[0].roomid});
  } catch (err) {
    console.error("Error adding group:", err);
    res.status(500).json({ error: "Failed to add group" });
  }
});

module.exports=router;



//manually build http server 
// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.method === "GET" && req.url === "/users/usersearch") {

//     const data = [
//       { username: "t" },
//       { username: "j" }
//     ];

//     res.writeHead(200, {
//       "Content-Type": "application/json"
//     });

//     res.end(JSON.stringify(data));
//   }
// });

// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });