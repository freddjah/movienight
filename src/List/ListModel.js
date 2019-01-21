/* eslint-disable camelcase */

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  movies: [
    {
      title: { type: String },
      id: { type: Number },
      poster_path: { type: String },
    },
  ],
});


module.exports = mongoose.model('List', Schema);
