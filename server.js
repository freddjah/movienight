const express = require('express');

const app = express();

const router = require('./src/Router');

app.use(router);

module.exports = app;
