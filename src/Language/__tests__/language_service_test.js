/* eslint-disable no-undef */

const sinon = require('sinon');
const LanguageService = require('../LanguageService');

describe('LanguageService test', () => {
  it('has module', () => {
    expect(LanguageService).toBeDefined();
  });

  describe('findOrCreateLanguage test', () => {
    it('finds or creates', async () => {
      const MockModel = {
        findOrCreate: sinon.spy(),
      };

      const languageService = LanguageService(MockModel);

      await languageService.findOrCreateLanguage({ dummytext: 'Just some dummy stuff' });

      expect(MockModel.findOrCreate.calledOnce).toBe(true);
    });
  });
});
