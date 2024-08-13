const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const passport=require('./auth')


const bodyParser = require("body-parser");
app.use(bodyParser.json());

const menu = require("./models/menu");


// const logrequest=(req,res,next)=>{
//   console.log([${new Date().toLocaleString()}] Request made to: ${req.originalUrl})
//   next();
// }
// app.use(logrequest);

app.use(passport.initialize());
const LocalAuthenticatemiddleware=passport.authenticate('local',{session:false});

app.get("/",function (req, res) {
  res.send("Welcome to my hotel .. How can i help you today?");
});

const personRoutes = require("./routes/personRoutes");
app.use("/person",LocalAuthenticatemiddleware, personRoutes);

const menuRoutes = require("./routes/menuRoutes");
app.use("/menu",menuRoutes);

const PORT=process.env.PORT||3000;

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});