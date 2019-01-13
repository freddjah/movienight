const createMovie = MovieDAL => movieObject => MovieDAL.create(movieObject);
const getMovieById = MovieDAL => id => MovieDAL.findOne({ id });
const populateMovie = MovieDAL => movieObject => MovieDAL.populate(movieObject, 'genres spoken_languages');

/**
 * Uses dependency injection to act as a middle-man between a calling service
 * and a data access layer. For an example a HttpController that wants to call
 * methods on a Mongoose model.
 *
 * By having this extra layer tests will become much easier.
 * @param {*} MovieDAL
 */

module.exports = MovieDAL => ({
  createMovie: createMovie(MovieDAL),
  getMovieById: getMovieById(MovieDAL),
  populateMovie: populateMovie(MovieDAL),
});
