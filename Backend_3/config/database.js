// For Connection Establishment Between Application And DB

const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connection Of DB Successful");
    })
    .catch((error) => {
      console.log("Issue In Connection");
      console.error(error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;