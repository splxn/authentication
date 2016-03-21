"use strict";
var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/database');
var port = process.env.PORT || 8080;
var routes = require('./routes/index');

app.use(morgan('dev'));

app.use('/', routes);

mongoose.connect(config.database);

app.get('/', function(req, res) {
  res.send('Authorization stuff is about to run at port ' + port);
});

app.listen(port);
console.log("There will be unicorns: http://localhost:" + port);