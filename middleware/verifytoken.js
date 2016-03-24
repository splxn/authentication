"use strict";
var secret = require('../config/database').secret;
var jwt = require('jsonwebtoken');
var StatusError = require('status-errors');

var verifyToken = (req, res, next) => {

  var token = req.body.token || req.query.token || req.headers['authorization'];

  if (token) {

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        next(new StatusError(401, 'Failed to authenticate token'));
        return;
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    next(new StatusError(401, 'Token is required'));
    return;
  }
};

module.exports = verifyToken;