"use strict";
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var configAuth = require('../config/auth');

var authFB = {

  strategy: new FacebookStrategy({

      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL
    },

    function(token, refreshToken, profile, done) {

      process.nextTick(function() {

        User.findOne({'facebook.id': profile.id}, function(err, user) {

          if (err) return done(err);

          if (user) {
            return done(null, user);
          } else {
            var newUser = new User();

            newUser.facebook.id = profile.id;
            newUser.facebook.token = token;
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email = profile.emails[0].value;
          }

          newUser.save(function(err) {
            if (err) throw err;

            return done(null, newUser);
          });
        });
      });
    })
};

module.exports = authFB;