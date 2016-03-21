"use strict";
var User = require('../models/user');

module.exports = function signUpUser(req, res) {

  if (!req.query.email ||
      !req.query.firstName ||
      !req.query.lastName ||
      !req.query.dateOfBirth ||
      !req.query.password) {
    res.json({success: false, msg: 'You have to fill all the required fields'});
  } else if ( req.query.lastLogged ||
              req.query.createdAt ||
              req.query.updatedAt ||
              req.query.status) {
    res.status(403).send({success: false, msg: 'You cannot update time and status fields'});
  } else {
    var newUser = new User({
      email: req.query.email,
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      dateOfBirth: req.query.dateOfBirth,
      password: req.query.password,
      createdAt: new Date()
    })

    newUser.save(function(err) {
      if (err) {
        res.json({success: false, msg: 'Email is already in use'});
      } else {
        res.json({success: true, msg: 'User created successfully'});
      }
    });
  }
}

