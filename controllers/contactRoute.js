let express = require("express");

// when express.Router() is called, it returns a mini app which enables you to keep all the routes of a certain type, for instance, burgers, separate from routes of a different type (salads). You then export the route handler into the main app (require burger_controller and require salad_controller). This enables you to keep your app's main routes (which would hypothetically be a restaurant_controller) free of clutter (imagine having a bunch of get routes for each menu item, for each restaurant, across your giant chain of restaruants; the express.router() function helps us keep things organized as we scale up)
let router = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// get env config variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const GMAIL_USER = process.env.GMAIL_USER;

// instantiate oauth2Client
const oauth2Client = new OAuth2(
  `${CLIENT_ID}`, // ClientID
  `${CLIENT_SECRET}`, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

// set credentials and get new access token... should all of this be going into the route, so a new access token is generated with each post?
oauth2Client.setCredentials({
  refresh_token: `${REFRESH_TOKEN}`
});


// POST route from contact form
router.post('/contactForm', (req, res) => {

// testing with this here
const accessToken = oauth2Client.getAccessToken();

// Instantiate the SMTP server, bringing in nodemaler
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: `${GMAIL_USER}`, 
       clientId: `${CLIENT_ID}`,
       clientSecret: `${CLIENT_SECRET}`,
       refreshToken: `${REFRESH_TOKEN}`,
       accessToken: accessToken
  }
});

    // Specify what the email will look like
    const mailOpts = {
      from: 'Your sender info here', // This is ignored by Gmail
      to: GMAIL_USER,
      subject: 'New message from contact form at hayescrowley.com',
      generateTextFromHTML: true,
      text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };
  
    // Attempt to send the email
    smtpTransport.sendMail(mailOpts, (error, response) => {
      if (error) {
        console.log(error);
        let errorObj = {error: error};
        console.log(errorObj);
        res.render('contact-failure', errorObj ) // Show a page indicating failure
      }
      else {
        console.log(response);
        let responseObj = {reponse: response};
        res.render('contact-success', responseObj); // Show a page indicating success
      }
      smtpTransport.close();
    });

  });

  module.exports = router;