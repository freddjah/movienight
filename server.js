const express = require('express');
const path = require('path');

const app = express();

const router = require('./src/Router');

// View engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

module.exports = app;
