var express = require('express');
var router = express.Router();
var passportFacebook = require('../auth/facebook');
var passportGoogle = require('../auth/google');
const controllers = require("../controller.js");
/* LOGIN ROUTER */
router.post('/login', controllers.login);
/* LOGOUT ROUTER */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* FACEBOOK ROUTER */
router.get('/facebook',
  passportFacebook.authenticate('facebook'));

router.get("/facebook/callback", function(req, res, next) {
  passportGoogle.authenticate("facebook", function(user) {
    req.session.user_id = user.id;
    req.session.login_status = true;
    res.redirect("https://gamifly.co/dashboard?accessToken="+user.accessToken);
  })(req, res, next);
});

/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] }));

router.get("/google/callback", function(req, res, next) {
  passportGoogle.authenticate("google", function(user) {
    req.session.user_id = user.id;
    req.session.login_status = true;
    res.redirect("https://gamifly.co/dashboard?accessToken="+user.accessToken);
  })(req, res, next);
});

module.exports = router;