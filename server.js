"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/database');
var port = process.env.PORT || 8080;
var routes = require('./routes/index');
var validator = require('express-validator');
var passport = require('passport');
var flash = require('connect-flash');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(validator());

app.use(morgan('dev'));

app.use('/', routes);

app.use(passport.initialize());

mongoose.connect(config.database);

app.use(function(err, req, res, next) {
  console.log(err.status + ' ' + err.message);
  res.json({
    status: err.status,
    name: err.name,
    message: err.message
  });
});

app.get('/', function(req, res) {
  res.send('Authorization stuff is about to run at port ' + port);
});

app.listen(port);
console.log("There will be unicorns: http://localhost:" + port);