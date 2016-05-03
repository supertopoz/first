var express = require("express");
var app = express(); 
var bodyParser = require("body-parser"); // bring in the body parser. 

app.use(bodyParser.urlencoded({extended: true})); // used to help bring in an parse body form content.
app.set("view engine", "ejs"); // allows the removal of the file extension from the render method. 



app.get("/", function(req, res){
res.render("landing");
});
    
        var campgrounds = [
        {name: "North Wood", image:"https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg"},
        {name: "South Wood", image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
        {name: "Pine View", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "Pine View", image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "farm View", image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
    ]
    
    
app.get("/campgrounds",function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){ // follow REST convention of name routs get the same as post. 
 //   res.send("You hit the post route"); 
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req, res){ // follow REST convention of name routs get the same as post. 
    res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YELPCAMP server started"); 
});
