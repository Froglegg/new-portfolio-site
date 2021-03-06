let express = require("express");

// when express.Router() is called, it returns a mini app which enables you to keep all the routes of a certain type, for instance, burgers, separate from routes of a different type (salads). You then export the route handler into the main app (require burger_controller and require salad_controller). This enables you to keep your app's main routes (which would hypothetically be a restaurant_controller) free of clutter (imagine having a bunch of get routes for each menu item, for each restaurant, across your giant chain of restaruants; the express.router() function helps us keep things organized as we scale up)
let router = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const axios = require("axios");
// get env config variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const GMAIL_USER = process.env.GMAIL_USER;

// POST route from contact form
router.post("/contactForm", (req, res) => {
  console.log(req.body.tokenField);
  axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${req.body.tokenField}`
    )
    .then(function(response) {
      // console.log(response.data);
      if (response.data.success) {
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

        // testing with this here
        let accessToken = oauth2Client.getAccessToken();

        // console.log(accessToken);

        // // console log for debugging
        // console.log(
        //   `ClientID: ${CLIENT_ID}\nSecret: ${CLIENT_SECRET}\n Refresh: ${REFRESH_TOKEN}\n User: ${GMAIL_USER}\n Access token: ${accessToken}`
        // );

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
          from: "", // This is ignored by Gmail
          to: GMAIL_USER,
          subject: `CONTACT from ${req.body.name}`,
          generateTextFromHTML: true,
          text: `${req.body.name} (${req.body.email}) says: \n\n${req.body.message}`
        };

        // Attempt to send the email
        smtpTransport.sendMail(mailOpts, (error, response) => {
          if (error) {
            console.log(error);
            res.render("contact-failure", {
              styles: ["normalize.css", "nav.css", "styles.css"],
              headScripts: ["nav.js"],
              bodyScripts: [],
              title: "Contact Failure :("
            }); // Show a page indicating failure
          } else {
            console.log(response);
            res.render("contact-success", {
              styles: ["normalize.css", "nav.css", "styles.css"],
              headScripts: ["nav.js"],
              bodyScripts: [],
              title: "Contact Success!"
            }); // Show a page indicating success
          }
          smtpTransport.close();
        });
      } else {
        res.render("contact-failure", {
          styles: ["normalize.css", "nav.css", "styles.css"],
          headScripts: ["nav.js"],
          bodyScripts: [],
          title: "Google thinks you are a bot!"
        }); // Show a page indicating capthca failure
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});

module.exports = router;
