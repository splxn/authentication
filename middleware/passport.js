"use strict";

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

var pass = {

  signup: (passport) => {

    passport.use('local-signup', new LocalStrategy({

      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {

      process.nextTick(function() {

        User.findOne({ email: email}, function(err, user) {
          if (err) return done(err);
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {

            var newUser = new User();

            newUser.email = email;
            newUser.password = (password) => {
              return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            };

            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        })
      })
    }));
  }

};

module.exports = pass;