var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image:"https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg",
        description:"This is a great place to camp, NOT!"    
    },  
    {
        name: "Cloud's wondering", 
        image:"https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description:"This is a great place to camp, NOT!"    
    },    
    {
        name: "Canyon Floor", 
        image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description:"This is a great place to camp, NOT! Blah Blah! "    
    },
];
function seedDB(){
    //Remove all campgrounds
   Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("Removed campgrounds!");
   //add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("Added a CampGround");
                // create a comment
                Comment.create(
                    {
                        text: "This place is great, but I wish there is...",
                        author: "Hommer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                        campground.comments.push(comment)
                        campground.save();
                        console.log("Created new comments");
                        }
                        
                    });
            }
        }); 
    });
});
   
}    

//add a few comments
module.exports = seedDB;