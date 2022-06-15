var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user.model');

passport.use(new GoogleStrategy({
    clientID: "926644618750-3uo84dluniv8teae3veqqu7hj607fltl.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://127.0.0.1:3001/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(profile.emails[0].value, { name: profile.displayName, login_type:0, wallet_address:'' }, function (user) {
      return done(user);
    });
  }
));

module.exports = passport;