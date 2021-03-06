var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find campground by id
    //console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error", "Something went wrong!")
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
              
               //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               //console.log(comment);
               req.flash("success", "New comment created and saved");
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});
// EDIT CAMPGROUND COMMENT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
       if (err){
           req.flash("error", "Comment not found");
           res.redirect("back");
       } else {
            req.flash("success", "Make your changes here!");
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
    });
 });

// // UPDATE CAMPGROUND COMMENT ROUTE
 router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
 //find and update correct campground
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedCampground){
       if(err) {
           req.flash("error", "Not Saved");
           res.redirect("back");
       } else{
           req.flash("success", "Saved");
           res.redirect("/campgrounds/" + req.params.id);
       }
     });
 });
// Destroy Campground COMMENT Route
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
 // res.send("This is the distroy comments route");
        if(err){
             req.flash("error", "Not Deleted");
             res.redirect("back");
     } else{
             req.flash("error", "Deleted");
             res.redirect("/campgrounds/" + req.params.id);
         }
     });
  
 });









module.exports = router;