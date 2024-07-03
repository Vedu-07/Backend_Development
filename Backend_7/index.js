// App Creation
const express = require("express");
const app = express();

// Getting Port Number
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Middleware 
app.use(express.json());

// File Upload Package
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));

// Connect To DB
const db = require("./config/database");
db.connect();

// Cloudinary Connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Mounting Routes
const Upload = require("./routes/fileUpload");
app.use("/api/v1/upload",Upload);

// Listening The Port
app.listen(PORT, () => {
    console.log(`App Running Successfully On Port ${PORT}`);
})
