var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    
//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp_v11");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //Can make seeds for DB here. 

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Here is where data can be sent to all pages. 
app.use(function(req, res, next){
   res.locals.currentUser = req.user; // sends the currenct user to every page
   res.locals.error = req.flash("error"); // sends a error flash for all pages - held in the header.
   res.locals.success = req.flash("success"); // sends a sucess flash for all pages - held in the header.
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});