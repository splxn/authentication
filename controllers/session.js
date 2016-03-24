"use strict";
var User = require('../models/user');
var secret = require('../config/database').secret;
var jwt = require('jsonwebtoken');
var StatusError = require('status-errors');

var sessionRoute = {

  get: (req, res) => {
    res.json({
      success: true,
      message: "Current user info",
      name: req.decoded._doc.firstName + ' ' + req.decoded._doc.lastName,
      email: req.decoded._doc.email
    })
  },

  post: (req, res, next) => {
    User.findOne({email: req.body.email})
      .then((user) => {
        if (!user) {
          next(new StatusError(401, 'Please type correct email'));
        } else {
          return user;
        }
      })
      .then((user) => user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) {
          next(new StatusError(401, 'User not found'));
        }
        if (isMatch && !err) {
          var token = jwt.sign(user, secret, {
            expiresIn: 1440
          });
          res.send({
            success: true,
            message: 'token successfully created',
            token: token
          });
        } else {
          next(new StatusError(403, 'Wrong password'));
        }
      }))
      .catch((err) => next);
  }
};

module.exports = sessionRoute;