const jwt = require("jsonwebtoken");
require("dotenv").config();
// This Middleware For Authentication
// Basically We Are Verifying Token
exports.auth = (req, res, next) => {
  try {
    // Extract JWT Tokens 
    // Three Ways 



    const token = req.body.token || req.cookies.token;
    // const token = req.header("Authorization").replace("Bearer","") ;

    // Bearer Authentication
    // const authHeader = req.header("Authorization");
    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Token Missing or Malformed",
    //   });
    // }

    // const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: "Token Missing",
      });
    }

    // Verify Token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token Invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Something Went Wrong While Verifying Token",
      message: error,
    });
  }
};

exports.isStudent = (req, res, next) => {
  // Check if user is a student
  if (req.user && req.user.role === "Student") {
    return next();
  }
  return res
    .status(403)
    .json({ success: false, message: "Access denied: Students only" });
};

exports.isAdmin = (req, res, next) => {
  // Check if user is an admin
  if (req.user && req.user.role === "Admin") {
    return next();
  }
  return res
    .status(403)
    .json({ success: false, message: "Access denied: Admins only" });
};


