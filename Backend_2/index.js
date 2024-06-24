const express = require("express");
const app = express();

// load config from env file
require("dotenv").config();
const PORT = process.env.PORT ;

// middleware To parse json request body
app.use(express.json());

// import routes for TODO API
const todoRoutes = require("./routes/todos")

// Mount the TODO API Routes
app.use("/api/v1",todoRoutes)

// Starting The Server
app.listen(PORT,() => {
    console.log(`Server Started SuccessFully At ${PORT}`);
})

// Connect To Database
const dbConnect = require('./config/database');
dbConnect();

// Default Route
app.get("/", (req,res) => {
    res.send(`<h1>This Is Home Page</h1>`)
})