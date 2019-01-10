/* eslint-disable max-len */
/* eslint-disable camelcase */
const findOrCreateLanguage = LanguageDAL => ({ iso_639_1, name }) => LanguageDAL.findOrCreate({ iso_639_1, name });
module.exports = LanguageDAL => ({
  findOrCreateLanguage: findOrCreateLanguage(LanguageDAL),
});
