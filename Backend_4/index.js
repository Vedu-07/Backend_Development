const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());

const blog = require("./routes/blog");


// mount
app.use("/api/v1",blog);

const connectWithDB = require("./config/database");
connectWithDB();

app.listen(PORT, () => {
    console.log(`App Is Started At Port No ${PORT}`);
})

app.get("/",(req,res) => {
    res.send(`<h1>This Is HomePage</h1>`)
})