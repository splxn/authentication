"use strict";
var Strategy = require('passport-http-bearer').Strategy;
var db = require('../db');

var passportBearer = {

  strategy: new Strategy(
    function(token, cb) {
      db.users.findByToken(token, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        return cb(null, user);
      });
    }),

  display: function(req, res) {
      res.json({ username: req.user.username, email: req.user.emails[0].value });
    }
};

module.exports = passportBearer;