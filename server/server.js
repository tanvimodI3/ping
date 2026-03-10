//middleware anything before routes u wanna do
require("dotenv").config(); //vimp fucked everything up 
const express = require("express");
const http = require('http');
const {Server} = require('socket.io');

const app=express();
const cors=require("cors");
app.use(cors({
  origin: ["https://ping-azure.vercel.app","https://ping-nine-amber.vercel.app"], //http://localhost:3000
  credentials: true
}));

app.use(express.json());

const pool = require("./db");


async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        userid SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS message(
        id SERIAL PRIMARY KEY,
        userid INTEGER REFERENCES users(userid),
        receiver_id INTEGER REFERENCES users(userid),
        messages TEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("tables ready");
  } catch (err) {
    console.error("DB init error:", err);
  }
}

initDB();

const authRoutes = require("./routes/auth"); //authroutes take to folder 
const search = require("./searchlist/search");
const a = require("./sockets/socket");

app.use("/auth", authRoutes); //when it sees /auth/anything it goes to authroutes

app.use("/users",search);

//app.use("/s",a);


const server = http.createServer(app);
const io = new Server(server,{
    path: "/socket.io",
    cors: {
    origin:["https://ping-azure.vercel.app","https://ping-nine-amber.vercel.app"], //http://localhost:3000
    methods:["GET", "POST"],
    credentials:true
  }
});

a(io);

//old msgs
app.post("/s/messages", async(req,res)=>{
    const {userid,user2id} = req.body;

    const result = await pool.query(
        'SELECT * FROM message WHERE (userid=$1 AND receiver_id=$2) OR (userid=$2 AND receiver_id=$1) ORDER BY sent_at',
        [userid,user2id]
    );

    console.log("msgs were loaded");
    res.json(result.rows);
});

//username
app.post("/s/username", async(req,res)=>{
    const {user2id} = req.body;

    const result = await pool.query(
        'SELECT username FROM users WHERE userid=$1',
        [user2id]
    );

    console.log("username ur chatting w is",result);
    res.json(result.rows);
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server running yay");
});



