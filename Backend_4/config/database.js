const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDB = () => {
  mongoose.connect(process.env.DATABASE_URL)
    .then(console.log("Database Connected SuccessFully"))
    .catch((error) => {
      console.log("DB Facing Connection Issues");
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectWithDB;