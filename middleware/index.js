var Campground = require("../models/campground")
var Comment = require("../models/comment");

var middlewareObj = {}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error" , "Please Login in first!!");
    res.redirect("/login");
 }

 middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
       Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               req.flash("error","No campgrounds found");
               res.redirect("back");
           } else {
               if(foundCampground.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error","You need permission to do that!");
                   res.redirect("back");
               }
           }
       });
   } else {
       req.flash("error","You need to Login!");
       res.redirect("back");
   }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                   req.flash("error","You need permission to do that!");
                   res.redirect("back");
                }
            }
        });
    } else {
       req.flash("error","You need to Login!");
        res.redirect("back");
    }
}

module.exports = middlewareObj; 