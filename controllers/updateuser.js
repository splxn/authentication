"use strict";
var bcrypt = require('bcrypt');
var User = require('../models/user');

module.exports = function(req, res) {

  if (!req.query.email) {
    res.json({success: false, msg: 'Please specify email'});
  } else if ( req.query.lastLogged ||
              req.query.createdAt ||
              req.query.updatedAt ||
              req.query.status) {
    res.status(403).send({success: false, msg: 'You cannot update time and status fields'});
  } else {

    User.findOneAndUpdate({email: req.query.email},
      {$set: {firstName: req.query.firstName,
              lastName: req.query.lastName,
              dateOfBirth: req.query.dateOfBirth}}, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.status(403).send({success: false, msg: 'User not found'});
      } else {
        if (req.query.password) {
          bcrypt.genSalt(10, function(err, salt) {
            if (err) {return next(err)}

            bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) {return next(err)}

              user.password = hash;
              user.save();

            });
          });
        }

        res.json({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth
        });
      }
    });
  }
};