const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Sign Up Route Handler
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    console.log(req.body);  // Log req.body to check the input

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const existingUser = await User.findOne({ email });
    
    // Check For Existing User
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Securing Password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10); // Hash the password with 10 salt rounds
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Error In Hashing",
        message: err.message,
      });
    }

    // Creating Entry For User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "User Cannot Be Registered, Please Try Again Later",
      message:error.message
    });
  }
};

exports.login = async (req,res) => {
    try{
        // Fetching The Data
        const {email,password} = req.body;

        // Check If All Feilds Are Filled Or Not
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please Fill All The Details',
            })
        }

        const user = await User.findOne({email});

        if(!user){
            res.status(401),json({
                success:false,
                message:'User Not Registered',
            })
        }

        // Payload For JWT Methods

        const payload = {
            email: user.email,
            id:user._id,
            role:user.role,
        }
        // Verification Of Password And Creation Of JWT Token
        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h",});
            // Converting User To Object this is done to convert mongoose document into plain javascript object So That Manipulating IT Becomes Easy
            
            let userObj = user.toObject();
            console.log(userObj);
            userObj.token = token;
            // The Password Is Removed From Users Object Not From THe Database, Since We Are Sinding Token We Dont Want Password In It
            userObj.password = undefined;
            console.log(userObj);
            // creating cookie it requires 3 params 1) Name OF Cookie 2) Data Of Cookie 3) Options -> Validity, Expire Time, Access Rights
            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                // THis Means Cookie Cant Be Accesed From Client Side
                httpOnly : true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                userObj,
                message:"User Logged In Successfully"
            });
        }
        else{
            return res.status(403).json({
                success:false,
                message: 'Password Incorrect',
            })
        }

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
          success: false,
          error: "Login Failure",
          message:error.message
        });
    }
}