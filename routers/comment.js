var express         = require("express"),
    router          = express.Router({mergeParams: true});
var Campground      = require("../models/campground"),
    Comment         = require("../models/comment"),
    middlewareObj   = require("../middleware");
    


//NEW comment
router.get("/new",middlewareObj.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{ campground:foundCampground} );
        }
    });
});

//CREATE comment
router.post("/",middlewareObj.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            req.flash("error","Something went wrong");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment,  function(err,comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to the comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Comment added successfully");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});


//EDIT Comment
router.get("/:comment_id/edit",middlewareObj.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    })
});

//UPDATE Comment 
router.put("/:comment_id",middlewareObj.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment , function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});


//DESTROY Comment
router.delete("/:comment_id",middlewareObj.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err,deletedComment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success","Comment Deleted Successfully");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports = router;
