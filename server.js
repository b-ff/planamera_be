// Basics
const config = require('./config');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// Init

const app = express();

mongoose.promise = require('q').Promise;
mongoose.connect(config.db);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', require('./routes/router'));

const port = process.env.PORT || config.port;

app.listen(port);
console.log(config.messages.onRun.replace('%s', port));