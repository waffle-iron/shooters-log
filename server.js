'use strict';
//DEBUG=auth* node server.js
//npm modules
const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('auth:server');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const httpErrors = require('http-errors');

//app modules
const errorHandler = require('./lib/error-handler');
const matchRouter = require('./route/match-router');
//routes

//module constants
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/auth';


mongoose.connect(mongoURI);

// app.use(httpErrors);
app.use(morgan('dev'));
app.use('/api', matchRouter);
//routes
app.all('*', function(req, res, next){
  debug('entered app.all route in server.js:  this route is not registered');
  next(httpErrors(404, 'this route is not registered'));
});

app.use(errorHandler);

const server = app.listen(port, function(){
  debug('listen');
  debug('express app up on port: ', port);
});

server.isRunning = true;
module.exports = server;
