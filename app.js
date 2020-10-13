var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    ejs                     = require("ejs"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash"),
    User                    = require("./models/user"),
    Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    seedDB                  = require("./models/seed"),
    indexRoutes             = require("./routers/index"),
    campgroundRoutes        = require("./routers/campground"),
    commentRoutes           = require("./routers/comment");

// mongoose.connect("mongodb://localhost/drukcamp",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://root98:root98@cluster0.rybue.mongodb.net/drukcamp?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static(__dirname + "./public"));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I love Bhutan",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comment",commentRoutes);

app.listen(8080 , function(){
    console.log("Server has started!!!");
});
