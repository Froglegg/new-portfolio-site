var express = require("express");

// when express.Router() is called, it returns a mini app which enables you to keep all the routes of a certain type, for instance, burgers, separate from routes of a different type (salads). You then export the route handler into the main app (require burger_controller and require salad_controller). This enables you to keep your app's main routes (which would hypothetically be a restaurant_controller) free of clutter (imagine having a bunch of get routes for each menu item, for each restaurant, across your giant chain of restaruants; the express.router() function helps us keep things organized as we scale up)
var router = express.Router();

require("dotenv").config();

// Import the model to use its database functions.

// db for using database queries
// let db = require('./../models');

router.get("/", (req, res) => {
  res.render("index", {
    styles: ["normalize.css", "nav.css", "styles.css"],
    headScripts: ["nav.js"],
    bodyScripts: [],
    title: "About | Hayes Crowley"
  });
});

router.get("/cv", function(req, res) {
  res.render("cv", {
    styles: ["normalize.css", "nav.css", "styles.css"],
    headScripts: ["nav.js"],
    bodyScripts: ["accordion.js"],
    title: "Resumé | Hayes Crowley"
  });
});

router.get("/portfolio", function(req, res) {
  res.render("portfolio", {
    styles: ["normalize.css", "nav.css", "styles.css", "modal-styles.css"],
    headScripts: ["nav.js"],
    bodyScripts: ["accordion.js", "microModal.min.js"],
    title: "Portfolio | Hayes Crowley"
  });
});

router.get("/contact", function(req, res) {
  res.render("contact", {
    styles: ["normalize.css", "nav.css", "styles.css", "contact.css"],
    cdnScripts: [
      "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
      `https://www.google.com/recaptcha/api.js?render=${process.env.CAPTCHA_KEY}`
    ],
    headScripts: ["nav.js"],
    bodyScripts: ["contact.js", "captcha.js"],
    title: "Contact | Hayes Crowley"
  });
});

router.get("/*", (req, res) => {
  res.render("index", {
    styles: ["normalize.css", "nav.css", "styles.css"],
    headScripts: ["nav.js"],
    bodyScripts: [],
    title: "About | Hayes Crowley"
  });
});

// Export routes for server.js to use.
module.exports = router;
