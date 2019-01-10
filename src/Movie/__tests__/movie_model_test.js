/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const Movie = require('../MovieModel');
const { mockMovie, mockGenre, mockLanguage } = require('./seeds');

const db = new MongoMemoryServer();

describe('MovieModel tests', () => {
  beforeAll(async () => {
    await mongoose.connect(await db.getConnectionString(), { useNewUrlParser: true });
  }, 60000);

  beforeEach(async () => {
    await Movie.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('has a module', () => {
    expect(Movie).toBeDefined();
  });

  describe('save movie', () => {
    it('saves correctly', async () => {
      let movie;
      try {
        movie = await Movie.create(mockMovie);
      } catch (error) {
        // do nothing
      }

      expect(mongoose.Types.ObjectId.isValid(movie.genres[0])).toBe(true);
      expect(movie.genres[0]._id).toEqual(mongoose.Types.ObjectId(mockGenre._id));

      expect(mongoose.Types.ObjectId.isValid(movie.spoken_languages[0])).toBe(true);
      expect(movie.spoken_languages[0]._id).toEqual(mongoose.Types.ObjectId(mockLanguage._id));

      const movies = await Movie.find({});

      expect(movies.length).toBe(1);
    });
  });
});
