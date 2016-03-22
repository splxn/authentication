"use strict";
var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var sessionController = require('../controllers/session');
var verifyToken = require('../middleware/verifytoken');

router.get('/users', userController.get);
router.post('/users', userController.post);
router.patch('/users', userController.patch);

router.post('/sessions', sessionController.post);

router.use(verifyToken);

router.get('/sessions', sessionController.get);

module.exports = router;