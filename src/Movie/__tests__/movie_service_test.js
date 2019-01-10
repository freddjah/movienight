/* eslint-disable no-undef */

const sinon = require('sinon');
const MovieService = require('../MovieService');

describe('MovieService test', () => {
  it('has module', () => {
    expect(MovieService).toBeDefined();
  });

  describe('createMovie test', () => {
    it('creates movie', async () => {
      const MockModel = {
        create: sinon.spy(),
      };

      const movieService = MovieService(MockModel);

      await movieService.createMovie({ dummytext: 'Just some dummy stuff' });

      expect(MockModel.create.calledOnce).toBe(true);
    });
  });

  describe('getMovieById test', () => {
    it('gets movie by id', async () => {
      const MockModel = {
        findOne: sinon.spy(),
      };

      const movieService = MovieService(MockModel);

      await movieService.getMovieById({ id: 1 });

      expect(MockModel.findOne.calledOnce).toBe(true);
    });
  });
});
