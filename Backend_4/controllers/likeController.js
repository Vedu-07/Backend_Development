const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// Like Post
exports.likePost = async(req,res) => {
    try{
        const {post,user} = req.body;
        const like = new Like({
            post,user,
        })
        const savedLike = await like.save();

        // updating post collection
         // post finding by id and add new comment to its comment array
        // $push for updating and $pull for deleting 
        // Using new : true means return the updated post
        // populate The comments based on its id
        const updatedPost = await Post.findByIdAndUpdate(post, {$push : {likes: savedLike._id}}, {new: true}).populate("likes");

        res.json({
            post:updatedPost,
        });

    }
    catch(error){
        return res.status(500).json({
            error: "Error While Updating Like",
            message: error.message,
        });
    }
}


exports.unlikePost = async (req,res) => {
    try{
        const {post,likes} = req.body;

        // Find And Delete From Collection

        const deletedLike = await Like.findOneAndDelete({post:post,_id:likes});

        if (!deletedLike) {
            return res.status(404).json({ error: "Like not found" });
        }
        // Update Post Collection
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}}, {new:true});

        res.json({
            post:updatedPost,
        })
    }
    catch(error){
        return res.status(500).json({
            error: "Error While Deleting Likes",
            message: error.message,
        });
    }
}




exports.dummyLink = (req,res) => {
    res.send("Dummy Route")
}