/* eslint-disable no-undef */

const sinon = require('sinon');
const GenreService = require('../GenreService');

describe('GenreService test', () => {
  it('has module', () => {
    expect(GenreService).toBeDefined();
  });

  describe('findOrCreateGenre test', () => {
    it('finds or creates', async () => {
      const MockModel = {
        findOrCreate: sinon.spy(),
      };

      const genreService = GenreService(MockModel);

      await genreService.findOrCreateGenre({ dummytext: 'Just some dummy stuff' });

      expect(MockModel.findOrCreate.calledOnce).toBe(true);
    });
  });
});
