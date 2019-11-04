const express = require("express");
const router = express.Router();

var passport = require("passport");

passport.serializeUser(function(user, done) {
  // please read the Passport documentation on how to implement this. We're now
  // just serializing the entire 'user' object. It would be more sane to serialize
  // just the unique user-id, so you can retrieve the user object from the database
  // in .deserializeUser().
  console.log("serial", user.id);
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  // Again, read the documentation.
  console.log("deserial", user);
  done(null, { id: "joey" });
});

router.use(passport.initialize());
router.use(passport.session());
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      //  console.log(accessToken);
      // console.log(refreshToken);
      console.log(profile);
      return done(null, { id: "joe" });
    }
  )
);

router.get("/google", passport.authenticate("google", { scope: ["openid"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/login/success",
    failureRedirect: "/api/login/failed"
  })
);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/api/login/failed" }),
//   function(req, res) {
//     res.redirect("/api/login/success");
//   }
// );

// router.get("/google/callback", (req, res) => {
//   console.log(req);
// });

module.exports = router;
