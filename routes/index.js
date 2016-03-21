"use strict";
var express = require('express');
var router = express.Router();

var signupUser = require('../controllers/signup');
var getUser = require('../controllers/getuser');
var updateUser = require('../controllers/updateuser');

router.get('/users', getUser);

router.post('/users', signupUser);

router.patch('/users', updateUser);

module.exports = router;