/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const Language = require('../LanguageModel');

const { mockLanguage } = require('./seeds');

const db = new MongoMemoryServer();

describe('LanguageModel tests', () => {
  beforeAll(async () => {
    await mongoose.connect(await db.getConnectionString(), { useNewUrlParser: true });
  }, 60000);

  beforeEach(async () => {
    await Language.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('has a module', () => {
    expect(Language).toBeDefined();
  });

  describe('save language', () => {
    it('saves correctly', async () => {
      try {
        await Language.findOrCreate(mockLanguage);
      } catch (error) {
        // do nothing
      }

      const languages = await Language.find({});

      expect(languages.length).toBe(1);
    });

    it('finds a saved language', async () => {
      let firstEntry;
      let secondEntry;

      try {
        firstEntry = await Language.findOrCreate(mockLanguage);
        secondEntry = await Language.findOrCreate(mockLanguage);
      } catch (error) {
        // do nothing
      }

      expect(firstEntry._id).toEqual(secondEntry._id);

      const languages = await Language.find({});
      expect(languages.length).toBe(1);
    });
  });
});
