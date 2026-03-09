//middleware anything before routes u wanna do
require("dotenv").config(); //vimp fucked everything up 
const express = require("express");
const cors = require("cors");


const authRoutes = require("./routes/auth"); //authroutes take to folder 
const search = require("./searchlist/search");
const a = require("./sockets/socket");

const app = express();


app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes); //when it sees /auth/anything it goes to authroutes

app.use("/users",search);

app.use("/s",a);


app.listen(5000, () => {
  console.log("Server running yay");
});




















// app.use(req,res,next); //anything inside this middleware finds next() function aage forward
// app.use(express.json); //since unreadable blob is coming back

// app.get("/", function(req,res){
//   res.send("hey ya");
// })

// app.get("/profile", function(req,res){
//   res.send("okayy");
// })

// app.listen(3000);

//cookies are like data jo attached ho everytime server is called browser mai it comes