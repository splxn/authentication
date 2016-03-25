"use strict";
var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var sessionController = require('../controllers/session');
var verifyToken = require('../middleware/verifytoken');
var formValidator = require('../middleware/formvalidator');
var pass = require('../middleware/passportbearer');
var authFB = require('../middleware/passportfb');
var authGoogle = require('../middleware/passportgoogle');
var passport = require('passport');

router.get('/users', userController.get);

router.post('/users', [formValidator.post, userController.post]);

router.patch('/users', [formValidator.patch, userController.patch]);

router.post('/sessions', sessionController.post);

router.get('/sessions', [verifyToken, sessionController.get]);

passport.use(pass.strategy);
router.get('/pass', passport.authenticate('bearer', { session: false }),
  pass.display);

passport.use(authFB.strategy);
router.get('/auth/facebook', passport.authenticate('facebook', { session: false, scope : 'email' }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/profile',
    failureRedirect : '/'
}));

passport.use(authGoogle.strategy);
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', {
      successRedirect : '/profile',
      failureRedirect : '/'
}));

module.exports = router;