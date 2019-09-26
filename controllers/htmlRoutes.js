var express = require("express");

// when express.Router() is called, it returns a mini app which enables you to keep all the routes of a certain type, for instance, burgers, separate from routes of a different type (salads). You then export the route handler into the main app (require burger_controller and require salad_controller). This enables you to keep your app's main routes (which would hypothetically be a restaurant_controller) free of clutter (imagine having a bunch of get routes for each menu item, for each restaurant, across your giant chain of restaruants; the express.router() function helps us keep things organized as we scale up)
var router = express.Router();


// Import the model to use its database functions.

// db for using database queries
// let db = require('./../models');

router.get("/", (req, res) => {
    res.send("index.html");
});

router.get("/cv", function(req, res) {
    res.send("cv.html");
});

router.get("/portfolio", function(req, res) {
    res.send("portfolio.html");
});

router.get("/contact", function(req, res) {
    res.send("contact.html");
});

router.get("/test", (req, res) => {
    res.render("test");
});


// Export routes for server.js to use.
module.exports = router;