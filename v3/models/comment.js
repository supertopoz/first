var mongoose = require("mongoose");

//COMMENT SCHEMA SETUP
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);