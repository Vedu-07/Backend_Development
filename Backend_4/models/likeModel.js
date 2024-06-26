const mongoose = require("mongoose");

// Route Handler
const likeSchema = new mongoose.Schema({
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", //Reference To Post Model
    },
    user: {
      type: String,
      required: true,
    },
  });

  module.exports = mongoose.model("Like",likeSchema);