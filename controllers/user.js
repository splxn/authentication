"use strict";
var User = require('../models/user');
var StatusError = require('status-errors');
var util = require('util');

var userRoute = {

  post: (req, res, next) => {

    var newUser = new User();
    for (var field in req.body) {
      console.log(req.body[field]);
      if (field == Object) {
        for (var prop in field) {
          newUser[field][prop] = req.body[field][prop];
        }
      }
      newUser[field] = req.body[field];
    }
    newUser.save((err) => {
      if (err) {
        next(new StatusError(400, "User already exists"));
        return;
      } else {
        res.json({success: true, msg: 'User created successfully'});
      }
    });
  },

  get: (req, res, next) => {

    return new Promise((resolve, reject) => {
      req.check({
        email: {
          isEmail: {
            errorMessage: 'Invalid Email'
          }
        }
      });

      if (req.validationErrors()) {
        next(new StatusError(400, 'There have been validation errors: '
          + util.inspect(req.validationErrors())));
        return;
      } else {
        resolve(req);
      }
    })
      .then((req) => {
        User.findOne({
          email: req.body.email
        })
      })
      .then((user) => {
        if (!user) {
          next(new StatusError(403, 'User not found'));
        } else {
          res.json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth
          });
        }
      })
      .catch((err) => next);
  },

  patch: (req, res, next) => {

    User.findOne({email: req.body.email})
      .then((user) => {
        if (!user) {
          next(new StatusError(403, 'User not found'));
        } else {
          for (var field in req.body) {
            console.log(req.body[field]);
            if (field == Object) {
              for (var prop in field) {
                user[field][prop] = req.body[field][prop];
              }
            }
            user[field] = req.body[field];
          }
          user.save();

          res.json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth
          });
        }
      })
      .catch((err) => next);

  }
};


module.exports = userRoute;