// const express = require('express');
// const http = require('http');
// const {Server} = require('socket.io');

//require("dotenv").config();
const pool = require('../db');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//     origin: ["https://ping-azure.vercel.app","https://ping-nine-amber.vercel.app"], //http://localhost:3000
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true
//   }
// });

//app.use(express.static('public')); //no idea what this means
//app.use(express.json());

//const router = require("express").Router();

//took from user search
// router.post("/connection",async(req,res)=>{
//     const {user}=req.body;
//     const user2id = user.userid;
//     const user2name = user.username;

//     console.log(`user details ${user2name} ${user2id}`);

//     res.json("got 2nd user");

// })

//took from login
// router.post("/searchit", async(req,res)=>{
//   const {email} = req.body;

//   const username = await pool.query(
//     "SELECT username FROM users WHERE email=$1",
//     [email] 
//   );

//   const userid = await pool.query(
//     "SELECT userID FROM users WHERE email=$1",
//     [email] 
//   );

//   console.log(`user details`,username.rows,userid.rows);

//   res.json("got it");

// })


module.exports=function(io){

const onlineUsers = {};

io.on('connection',(socket) =>{
    console.log("user connected yay");

    socket.on('register',(userid)=>{
        onlineUsers[userid]=socket.id;
        console.log("online users are:",onlineUsers);
    });

    socket.on('newmessage',async (input)=>{
        try{
            const {from,to,message}=input;
            console.log("user is sending smth");
            await pool.query(
            `INSERT INTO message(userid,receiver_id,messages)
             VALUES ($1,$2,$3)`,
            [from,to,message]
            );

            const receiverSocket = onlineUsers[to];

            if(receiverSocket){

            io.to(receiverSocket).emit("newmessage",{
            from,
            message
            });
            console.log(`the msg was ${message} from ${from} to ${to}`);
        }
         }catch(err){
      console.log(err);
    }

    });


    socket.on('disconnect', () => {
        for(const id in onlineUsers) {
            if(onlineUsers[id] === socket.id){
            delete onlineUsers[id];
            }
        }
        console.log('A user disconnected');
    });
});




// const PORT = 8080;
// server.listen(PORT,()=>{
//     console.log("server running yay");
// });

};
