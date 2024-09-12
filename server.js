// dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");



const passport = require("passport");


// sessions
const expressSession = require("express-session")({
  secret: "secret",
  resave: false, //do not save their session after login
  saveUninitialized: false, //the session didnot start donot save
});

require("dotenv").config();

// import models
const Form = require("./models/form");


// importing routes
// const userRoutes = require("./routes/userRoutes");
 const formRoutes = require("./routes/formRoutes");

 
// instantiations
const app = express();
const port = 5000;

// configurations
// set db connection to mongoose
mongoose.connect(process.env.DATABASE_LOCAL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});


mongoose.connection
.once("open", () => {
  console.log("Mongoose connection open");
})
.on("error", (err) => {
  console.error(`Connection error: ${err.message}`);
});





// mongoose.connection
//   .once("open", () => {
//     console.log("Mongoose connection open");
//   })
//   .on("error", (err) => {
//     console.error(Connection error: ${err.message});
//   });




// set view engine to pug
app.set("view engine", "pug"); // specify the view engine
app.set("views", path.join(__dirname, "views")); // specify the view directory

// middleware
app.use(express.static(path.join(__dirname, "public"))); // specify a folder for static files
app.use(express.urlencoded({ extended: true })); // helps to parse data from forms
app.use(express.json()); // helps to capture data in json

// express session configs
app.use(expressSession); // express session
app.use(passport.initialize()); //intialize passport
app.use(passport.session()); //use passport session

// passport configs

// use imported routes
// app.use("/", userRoutes);
 app.use("/", formRoutes);

 

app.get("*", (req, res) => {
  res.send("Error! This page does not exist");
});

//bootstraping a server
app.listen(port, () => console.log(`Listening on port ${port}`));