"use strict";
var User = require('../models/user');

module.exports = function(req, res) {
  if (!req.query.email) {
    res.json({success: false, msg: 'Please specify email'});
  } else {
    User.findOne({email: req.query.email}, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(403).send({success: false, msg: 'User not found'});
      } else {
        res.json({email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  dateOfBirth: user.dateOfBirth});
      }
    });
  }
};