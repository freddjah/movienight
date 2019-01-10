const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, unique: true },
});

async function findOrCreate({ id, name }) {
  let genre = await this.findOne({ id });

  if (!genre) {
    genre = await this.create({ id, name });
  }

  return genre;
}

Schema.statics.findOrCreate = findOrCreate;

module.exports = mongoose.model('Genre', Schema);
