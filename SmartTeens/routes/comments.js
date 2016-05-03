var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comments New
router.get("/new", isLoggedIn, function(req, res){
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
router.post("/",isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
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
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

// EDIT CAMPGROUND COMMENT ROUTE
router.get("/:comment_id/edit", function(req, res){
//    res.send("You did it");
//  console.log(req.params.comment_id);
   Comment.findById(req.params.comment_id, function(err, foundComment){
    res.render("comments/edit", {comment: foundComment});
    });
 });

// // UPDATE CAMPGROUND ROUTE
// router.put("/:id", checkCampgroundOwnership, function(req, res){
//     //find and update correct campground
//     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//       if(err) {
//           res.redirect("/campgrounds");
//       } else{
//           res.redirect("/campgrounds/" + req.params.id);
//       }
//     });
// });
// //Destroy Campground Route
// router.delete("/:id", checkCampgroundOwnership, function(req, res){
//     Campground.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/campgrounds");
//         } else{
//             res.redirect("/campgrounds");
//         }
//     });
  
// });

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;