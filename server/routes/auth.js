const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const router = express.Router(); //routing
const cors = require("cors");
const app = express();
app.use(cors({
  origin: ["https://ping-azure.vercel.app","https://ping-nine-amber.vercel.app"], //http://localhost:3000
  credentials: true
}));


//signup
router.post("/signup",async(req,res)=>{
  try {
    const {email,password,username} = req.body; //from body u take out

    const exists = await pool.query(
      "SELECT * FROM users WHERE email = $1", //email given out
      [email]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({message:"User already exists"});
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3)",
      [email, hashed, username]
    );

    res.status(200).json({message:"User created"});
  } catch (err) {
    res.status(500).json({error: err.message });
  }
});

//login
router.post("/login",async(req,res)=>{
  try {
    const {email,password} = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if(result.rows.length === 0) {
      return res.status(400).json({message: "Invalid credentials"}); //cond email
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password,user.password);

    if (!match) {
      return res.status(400).json({message: "wrong password"}); //condn password
    }

    res.json({
      message:"Login successful",
      user: {
        id: user.userid,
        username: user.username
      }
    });
    //res.redirect("/chat");
  } catch {
    res.status(500).json({message:"Server error"});
  }
});



module.exports = router;
