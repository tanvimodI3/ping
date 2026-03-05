const express = require("express");
require("dotenv").config();
const pool = require('../db');
const router = express.Router();

router.get("/usersearch",async(req,res)=>{
  try {
    const response= await pool.query(
    "SELECT username FROM users"
  );

    console.log("users rows");
    console.log(response.rows);

    //res.send("check console");
    res.json(response);
} 
catch(error) {
   console.error('Error fetching data:',error);
  res.status(500).json({error:'Internal server error'});
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