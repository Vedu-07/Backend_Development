const express = require("express");
const router = express.Router();

const {dummyLink, likePost, unlikePost} = require("../controllers/LikeController");
const {createComment} = require("../controllers/CommentController");
const {createPost,getAllPosts} = require("../controllers/PostController");

router.get("/dummyroute",dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/like/likes", likePost);
router.post("/like/unlike",unlikePost);

module.exports = router;

