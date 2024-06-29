const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect =  () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
         console.log("DATABASE CONNECTED SUCCESSFULLY");
    })
    .catch((error) => {
        console.log("Error In Connecting Database");
        console.error(error);
        process.exit(1);
    });
};

module.exports = dbConnect;