const findOrCreateGenre = LanguageDAL => ({ id, name }) => LanguageDAL.findOrCreate({ id, name });

module.exports = LanguageDAL => ({
  findOrCreateGenre: findOrCreateGenre(LanguageDAL),
});
