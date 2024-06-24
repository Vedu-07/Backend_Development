//step1: create a folder
//step2: move into that folder
//step3: npm init -y
//step4: open folder using VSCode
//step5: npm i express 
//step6: create server.js

// Server Instantiate

const express = require("express")
const app = express();

// Activate Server On 3000 Port

app.listen(3000, () => {
    console.log("Started The Server")
} )

// A body-parser is a Node.js library used to extract information from an incoming HTTP request. 
// It produces the information in a processed form by passing it into a middleware.
// Parsing Is Done In cases Of Post and Put
// Used To Parse req.body in express
const bodyParser = require("body-parser");
// specifically parse json data and add it to request.body object
app.use(bodyParser.json());


// Routes Creation
// Get Request
app.get('/',(req,res) => {
    res.send("Hello")
})

// Post Request. To make It Work We Have To Use Postman 
app.post('/api/cars', (request,response) => {
    const {name,brand} = request.body;
    console.log(name);
    console.log(brand);
    console.log("Car Submitted Successfully");
})

// Connecting Express Server With Mongodb
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/myData').then(() => {console.log("Connection Successful")}).catch(() => {console.log("Error")});