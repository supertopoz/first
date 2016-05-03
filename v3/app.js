var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"), // bring in the body parser. 
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");
    


mongoose.connect("mongodb://localhost/yelp_camp_v3");//This is the name of the data base in Mongo
app.use(bodyParser.urlencoded({extended: true})); // used to help bring in an parse body form content.
app.set("view engine", "ejs"); // allows the removal of the file extension from the render method. 

seedDB();

app.get("/", function(req, res){
res.render("landing");
});

// This is the INDEX part of the RESTful Route. 
app.get("/index",function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
        res.render("index", {campgrounds: allCampgrounds});//send camp grounds to web site.    
       }
    });
  
});

app.post("/campgrounds", function(req, res){ // follow REST convention of name routs get the same as post. 
 //   res.send("You hit the post route"); 
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    // This is the create/POST part of the RESTful API. 
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log("ERR")
       }else {
           console.log("Saved Campgroud:")
           console.log(newlyCreated);
       }
        
    });
    res.redirect("/index");
});

// this is the NEW part of the RESTful api and it represents the form. 
app.get("/campgrounds/new", function(req, res){ // follow REST convention of name routs get the same as post. 
    res.render("new"); 
});
// SHOW - shows more info about the campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampGround){
        if(err){
        console.log(err);
        } else{
        //    console.log(foundCampGround);
          res.render("show", {campground: foundCampGround});   
        }        
    });
    //res.send("This will be the show page one day!");
   
});





app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YELPCAMP server started"); 
});


