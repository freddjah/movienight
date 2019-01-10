/* eslint-disable camelcase */

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  iso_639_1: { type: String, unique: true },
  name: { type: String, unique: true },
});

async function findOrCreate({ iso_639_1, name }) {
  let language = await this.findOne({ iso_639_1 });

  if (!language) {
    language = await this.create({ iso_639_1, name });
  }

  return language;
}

Schema.statics.findOrCreate = findOrCreate;

module.exports = mongoose.model('Language', Schema);
