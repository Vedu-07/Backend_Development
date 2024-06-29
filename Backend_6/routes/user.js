const express = require("express");
const router = express.Router();

const {login , signup} = require("../controllers/auth");
const {auth,isStudent,isAdmin} = require("../middlewares/authh");


router.post("/login",login);
router.post("/signup",signup);
 

// Protected Routes
// Protected Routes Means With Specific Role You Can Access That Routes

// Test Route
router.get("/test", auth, (req,res) => {
    res.json({
        success:true,
        message:"Welcome To Protected Route For TESTS"
    })
})


router.get("/student",auth,isStudent,(req,res) => {
     res.json({
        success:true,
        message:`Welcome To Protected Route For Students`,
    })
})

router.get("/admin",auth,isAdmin,(req,res) => {
     res.json({
        success:true,
        message:`Welcome To Protected Route For Admins`,
    })
})
// For Extraction Of Data From ID
// router.get("/getEmail" , auth, async (req,res) => {

//     try{
//         const id = req.user.id;
//         console.log("ID:" , id);
//         const user = await User.findById(id);

//         res.status(200).json({
//             success:true,
//             user:user,
//             message:'Welcome to the email route',
//         })
//     }
//     catch(error) {
//         res.status(500).json({
//             success:false,
//             error:error.message,
//             message:'Fatt gya code',
//         })
//     }

// });

module.exports = router;