"use strict";
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var configAuth = require('../config/auth');

var authGoogle = {

  strategy: new GoogleStrategy({

      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL
    },

    function (token, refreshToken, profile, done) {

      process.nextTick(function() {

        User.findOne({'google.id' : profile.id }, function(err, user) {

          if (err) return done(err);

          if (user) {
            return done(null, user);
          } else {
            var newUser = new User();

            newUser.google.id = profile.id;
            newUser.google.token = token;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.emails[0].value;

            newUser.save(function(err) {
              if (err) throw err;

              return done(null, newUser);
            });
          }
        });
      });
    })
};

module.exports = authGoogle;