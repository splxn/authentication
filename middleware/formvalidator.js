"use strict";
var StatusError = require('status-errors');
var util = require('util');

var formvalidator = {

  post: (req, res, next) => {

    return new Promise((resolve, reject) => {
      req.check({
        email: {
          isEmail: {
            errorMessage: 'Invalid Email'
          }
        },
        firstName: {
          notEmpty: true,
          errorMessage: 'Invalid first name'
        },
        lastName: {
          notEmpty: true,
          errorMessage: 'Invalid last name'
        },
        password: {
          notEmpty: true,
          isLength: {
            options: [{min: 6}],
            errorMessage: 'Password must be at least 6 chars long'
          },
          errorMessage: 'Password required'
        },
        dateOfBirth: {
          notEmpty: true,
          isDate: {
            errorMessage: 'Wrong date'
          },
          errorMessage: 'Date is required'
        }
      });

      if (req.validationErrors()) {
        next(new StatusError(400, 'There have been validation errors: '
           + util.inspect(req.validationErrors())));
        return;
      } else {
        next();
      }
    })
  },

  patch: (req, res, next) => {

    return new Promise((resolve, reject) => {
      req.check({
        password: {
          notEmpty: true,
          isLength: {
            options: [{min: 6}],
            errorMessage: 'Password must be at least 6 chars long'
          },
          errorMessage: 'Password required'
        },
        dateOfBirth: {
          isDate: {
            errorMessage: 'Wrong date'
          }
        }
      });

      if (req.validationErrors()) {
        next(new StatusError(400, 'There have been validation errors: '
          + util.inspect(req.validationErrors())));
        return;
      } else if (req.body.email) {
        next(new StatusError(400, 'You cannot update an email'));
      } else {
        next();
      }
    })
  }
};


module.exports = formvalidator;