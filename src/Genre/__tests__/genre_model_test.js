/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const Genre = require('../GenreModel');

const { mockGenre } = require('./seeds');

const db = new MongoMemoryServer();

describe('GenreModel tests', () => {
  beforeAll(async () => {
    await mongoose.connect(await db.getConnectionString(), { useNewUrlParser: true });
  }, 60000);

  beforeEach(async () => {
    await Genre.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('has a module', () => {
    expect(Genre).toBeDefined();
  });

  describe('save genre', () => {
    it('saves correctly', async () => {
      try {
        await Genre.findOrCreate(mockGenre);
      } catch (error) {
        // do nothing
      }

      const genres = await Genre.find({});

      expect(genres.length).toBe(1);
    });

    it('finds a saved genre', async () => {
      let firstEntry;
      let secondEntry;

      try {
        firstEntry = await Genre.findOrCreate(mockGenre);
        secondEntry = await Genre.findOrCreate(mockGenre);
      } catch (error) {
        // do nothing
      }

      expect(firstEntry._id).toEqual(secondEntry._id);

      const genres = await Genre.find({});
      expect(genres.length).toBe(1);
    });
  });
});
