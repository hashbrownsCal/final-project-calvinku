require('dotenv').config();
//await mongoose.connect(process.env.DATABASE_URI); in connectDB function
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3000;

//Connect to mongoDB
connectDB();

//Built-in middleware
app.use(express.urlencoded({extended: false})); //parse url data
app.use(express.json()); //parse json
app.use(express.static(path.join(__dirname, "/public"))); //parse images, text, etc

//Routes
app.use("/", require("./routes/route"));

//API Routes
app.use("/states", require("./routes/api/states"));

//Undefined Routes
app.get("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")){
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")){
    res.json({error: "404 not found"});
  } else {
    res.type("txt").send("404 not found");
  }
});

//Shows it is running
mongoose.connection.once("open", ()=> {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
