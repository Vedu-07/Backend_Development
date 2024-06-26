const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req,res) => {
    try{
        // fetching data
        const {post,user,body} = req.body;
        // Create a new Comment Object
        const comment = new Comment({
            post,user,body
        });
        // saving in database
        const savedComment = await comment.save();


        // post finding by id and add new comment to its comment array
        // $push for updating and $pull for deleting 
        // Using new : true means return the updated post
        // populate The comments based on its id
        const updatedPost = await Post.findByIdAndUpdate(post, {$push : {comments: savedComment._id}}, {new: true}).populate("comments").exec();


        res.json({
            post: updatedPost,
        })
    }
    catch(error){
        return res.status(500).json({
            error: "Error While Creating Comments",
            message: error.message,
        });
    }
};


