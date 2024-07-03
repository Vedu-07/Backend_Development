const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tag:{
        type:String,
    },
    email:{
        type:String,
    }
})

// Post Middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("Doc ", doc);

        // Transporter
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        // Send Mail
        let info = await transporter.sendMail({
            from: `Kingdom`,
            to:doc.email,
            subject:"New File Uploaded On CLoudinary",
            html:`<h2> Hello Jiii File Uploaded Braahhhh!!!!! View Here: <a href="${doc.imageUrl}>${doc.imageUrl}</a></h2>"`
        })
    }
    catch (error){
        console.error(error);
    }
})

const File = mongoose.model("File",fileSchema);
module.exports = File;