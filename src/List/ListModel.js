/* eslint-disable camelcase */

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  movieIds: [
    { type: Number },
  ],
});


module.exports = mongoose.model('List', Schema);
