"use strict";
var User = require('../models/user');
var secret = require('../config/database').secret;
var jwt = require('jsonwebtoken');

var sessionRoute = {

  get: (req, res) => {
    res.json({
      success: true,
      message: "Current user info",
      name: req.decoded._doc.firstName + ' ' + req.decoded._doc.firstName,
      email: req.decoded._doc.email
    })
  },

  post: (req, res, next) => {
    User.findOne({email: req.body.email})
      .then((user) => {
        if (!user) {
          res.status(422).send({"field": "email", "message": "User not found"})
          throw new Error('User nor found');
        } else {
          return user;
        }
      })
      .then((user) => user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.status(401).send({message: 'Unauthorized'});
        if (isMatch && !err) {
          var token = jwt.sign(user, secret, {
            expiresIn: 1440
          });
          res.json({
            success: true,
            message: 'token successfully created',
            token: token
          });
        } else {
          return res.status(422).send({"field": "password", "message": 'Wrong password'});
        }
      }))
      .catch((err) => {next(err)});
  }
};

module.exports = sessionRoute;