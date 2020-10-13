var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");

//root route
router.get("/", function(req,res){
    res.render("landing");
});

//======= AUTH ROUTES =========
//register form display
router.get("/register",function(req,res){
   res.render("register");
});

// handling register logic
router.post("/register",function(req,res){
   User.register(new User({username: req.body.username}), req.body.password , function(err,user){
       if(err){
            req.flash("error",err.message);
            res.redirect("/register");
       }
       passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds");
       });
   });
});

//login form display
router.get("/login",function(req,res){
    res.render("login");
});

//handling login logic
router.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }),function(req,res){
});

//logout
router.get("/logout",function(req,res){
   req.logOut();
   req.flash("error","You are successfully Logged Out!");
   res.redirect("/");
});

module.exports = router;
