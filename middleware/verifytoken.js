"use strict";
var secret = require('../config/database').secret;
var jwt = require('jsonwebtoken');

var verifyToken = (req, res, next) => {

  var token = req.body.token || req.query.token || req.headers['authorization'];

  if (token) {

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

module.exports = verifyToken;