var express = require("express"),
    router  = express.Router();
var Campground = require("../models/campground");
var middlewareObj = require("../middleware");

// INDEX ROUTE
router.get("/", function(req,res){
    Campground.find({}, function(err,allCampgrounds){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index",{campgrounds : allCampgrounds});
        }
    });
});


// CREATE ROUTE
router.post("/",middlewareObj.isLoggedIn,function(req,res){

  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = { id:req.user._id, username: req.user.username }
  var newCampground = {name:name, image:image, description:desc, author:author }
  //   create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{   
            res.redirect("/campgrounds");
        }
    });
});


// NEW ROUTE
router.get("/new",middlewareObj.isLoggedIn,function(req,res){
   res.render("campgrounds/new");
});


//SHOW ROUTE
// show more details abotu campground
router.get("/:id", function(req,res){
    //find the campground with provided id
    // Campground.findById(id,callback)
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });    
});

//EDIT ROUTER
router.get("/:id/edit",middlewareObj.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit",{campground: foundCampground});
        }
    }); 
});

//UPDATE ROUTER
router.put("/:id",middlewareObj.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");                
        } else {
            res.redirect("/campgrounds/" + req.params.id);                
        }
    });
});

//DELETE ROUTER
router.delete("/:id",middlewareObj.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err,deleteCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success","Campground deleted successfully");
            res.redirect("/campgrounds");
        }
    });
});
 
module.exports = router;