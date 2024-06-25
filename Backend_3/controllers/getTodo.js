const Todo = require("../models/Todo")

exports.getTodo = async(req,res) => {

    try{
        // Fetch All Data From Database
        // Mongoose Helps with A Lot of Functions
        const todos = await Todo.find({});

        // response
        res.status(200)
        .json({
            success:true,
            data:todos,
            message:"Entire Todo Data is Fetched"
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

// Get Data By ID

exports.getTodoById = async(req,res) => {
    try{
        // extract todo items based on id
        const id = req.params.id;
        const todo = await Todo.findById({_id:id});
        // data for id not found
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"No Data Found With Given ID",
            })
        }

        res.status(200).json({
            success:true,
            data:todo,
            message: `Todo ${id} Data Fetched Successfully`, 
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