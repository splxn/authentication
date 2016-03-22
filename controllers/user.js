"use strict";
var User = require('../models/user');

var userRoute = {

  post: (req, res) => {

    req.check({
      email: {
        notEmpty: true,
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

    var newUser = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      password: req.body.password,
      createdAt: new Date()
    });

    newUser.save((err) => {
      if (err) {
        res.json(req.validationErrors());
      } else {
        res.json({success: true, msg: 'User created successfully'});
      }
    });

  },

  get: (req, res) => {

    req.check({
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Invalid Email'
        },
        errorMessage: 'Please type an email address'
      }
    });

    User.findOne({email: req.body.email})
      .then((user) => {
        if (!user) {
          res.status(403).send({success: false, msg: 'User not found'});
        } else {
          res.json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth
          });
        }
      })
      .catch((err) => {
        next(err)
      });
  },

  patch: (req, res) => {

    req.check({
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Invalid Email'
        },
        errorMessage: 'Please type an email address'
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
      },
      lastLogged: {
        notEmpty: false,
        errorMessage: 'You cannot type this param'
      },
      createdAt: {
        notEmpty: false,
        errorMessage: 'You cannot type this param'
      },
      updatedAt: {
        notEmpty: false,
        errorMessage: 'You cannot type this param'
      },
      status: {
        notEmpty: false,
        errorMessage: 'You cannot type this param'
      }
    });

    if (!req.validationErrors()) {
      User.findOne({email: req.body.email})
        .then((user) => {
          if (!user) {
            res.status(403).send({success: false, msg: 'User not found'});
          } else {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.dateOfBirth = req.body.dateOfBirth;
            user.password = req.body.password;
            user.save();

            res.json({
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              dateOfBirth: user.dateOfBirth
            });
          }
        })
        .catch((err) => next(err))
    } else {
      res.json(req.validationErrors());
    }
  }
};

module.exports = userRoute;