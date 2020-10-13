var mongoose     = require("mongoose"),
    Campground   = require("./campground"),
    Comment      = require("./comment");

// var data = [
//     {
//         name: "Tiger Nest",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROak8zaN_2bgNNOuFU8Iq5yTThrtI5UFlLrgDDwsNmY_ftKN4E&usqp=CAU",
//         description: "blah blah blah"
//     },
//     {
//         name: "Tiger Nest",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROak8zaN_2bgNNOuFU8Iq5yTThrtI5UFlLrgDDwsNmY_ftKN4E&usqp=CAU",
//         description: "blah blah blah"
//     },
//     {
//         name: "Tiger Nest",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROak8zaN_2bgNNOuFU8Iq5yTThrtI5UFlLrgDDwsNmY_ftKN4E&usqp=CAU",
//         description: "blah blah blah"
//     }
// ]

function seedDB(){
    //remove campgrounds
    Campground.remove({},function(err){
        // if(err){
        //     console.log(err);
        // } else {
        //     console.log("all data removed");
        // }
        // //add campgrounds      
        // data.forEach(function(seed){
        //     Campground.create(seed,function(err, campground){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log("Added campgrounds");
        //             //create comment
        //             Comment.create({
        //                 text: "I wish if there are more ice creams",
        //                 author: "Drukpa"   
        //             },function(err,comment){
        //                 if(err){
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                 }
        //             });
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;
