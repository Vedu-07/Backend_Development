const Todo = require("../models/Todo")

exports.createTodo = async(req,res) => {
    try{
        // extract title and description from request body
        const {title,description} = req.body;
        // creating new todo object and insert in db
        const response = await Todo.create({title,description});
        // Send Json Response With Success Flag
        res.status(200).json({
            success:true,
            data:response,
            message:"Entry Created SuccessFully"

        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message: err.message,
        })
    }
}