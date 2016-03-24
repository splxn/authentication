"use strict";
var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var sessionController = require('../controllers/session');
var verifyToken = require('../middleware/verifytoken');
var formValidator = require('../middleware/formvalidator');
var pass = require('../middleware/passport');

router.get('/users', userController.get);

router.post('/users', [formValidator.post, userController.post]);

router.patch('/users', [formValidator.patch, userController.patch]);

router.post('/sessions', sessionController.post);

router.get('/sessions', [verifyToken, sessionController.get]);

router.post('/signup', pass.signup);

module.exports = router;