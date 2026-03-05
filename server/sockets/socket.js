const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(express.static('public')); //no idea what this means

io.on('connection',(socket) =>{
    console.log("user connected yay");

    socket.on('newmessage',(input)=>{
        console.log("user is sending smth");
        io.emit('newmessage',input); //redirects to all clients
        console.log(`the msg was ${input}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log("server running yay");
});