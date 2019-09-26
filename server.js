require('dotenv').config()

var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

// import hbs helpers 
var hbsHelpers = require("./helpers/handlebarHelpers");

app.engine('handlebars', exphbs({
  defaultLayout: 'main', 
  helpers: hbsHelpers
}));

app.set('view engine', 'handlebars');

// require our models for syncing, this is for getting our database up and running.
// var db = require("./models");

// Import routes and give the server access to them.
var routes = require("./controllers/htmlRoutes");
var contactRoute = require("./controllers/contactRoute");

app.use(routes);
app.use(contactRoute);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
// Start our server so that it can begin listening to client requests.
// db.sequelize.sync().then(function() {

// });