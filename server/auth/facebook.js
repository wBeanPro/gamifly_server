var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user.model');
passport.use(new FacebookStrategy({
    clientID: "739873557308883",
    clientSecret: "b330b2199284b92626475107d7858962",
    callbackURL: "http://127.0.0.1:3001/auth/facebook/callback",
    profileFields: ['id', 'emails', 'displayName']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(profile.emails[0].value, { name: profile.displayName, login_type:1, wallet_address:'', accessToken: accessToken }, function (user) {
      return done(user);
    });
  }
));

module.exports = passport;