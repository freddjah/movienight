const mongoose = require('mongoose');

const Movie = mongoose.model('Movie');
const Language = mongoose.model('Language');
const Genre = mongoose.model('Genre');
const List = mongoose.model('List');

const MovieService = require('./MovieService')(Movie);
const LanguageService = require('../Language/LanguageService')(Language);
const GenreService = require('../Genre/GenreService')(Genre);
const ListService = require('../List/ListService')(List);

const TMDBApiService = require('./api/TheMovieDatabase/APIService');

const findOrCreateLanguages = async (languagesFromAPI) => {
  const languages = [];

  await Promise.all(languagesFromAPI.map(async (languageEntry) => {
    const language = await LanguageService.findOrCreateLanguage(languageEntry);

    languages.push(language);
  }));

  return languages;
};

const findOrCreateGenres = async (genresFromAPI) => {
  const genres = [];

  await Promise.all(genresFromAPI.map(async (genreEntry) => {
    const genre = await GenreService.findOrCreateGenre(genreEntry);

    genres.push(genre);
  }));

  return genres;
};

module.exports.find = async (req, res) => {
  const { title } = req.query;

  const movies = await TMDBApiService.searchMovies(title);

  res.render('movie/search', { movies: movies.results });
  // res.send(movies);
};

module.exports.showMovieDetailPage = async (req, res) => {
  const { id } = req.params;

  let movie = await MovieService.getMovieById(id);

  if (!movie) {
    const apiMovie = await TMDBApiService.getMovie(id);
    const apiTrailers = await TMDBApiService.getTrailers(id);

    const languages = await findOrCreateLanguages(apiMovie.spoken_languages);
    const genres = await findOrCreateGenres(apiMovie.genres);

    apiMovie.spoken_languages = languages;
    apiMovie.genres = genres;
    apiMovie.trailers = apiTrailers;

    movie = await MovieService.createMovie(apiMovie);
  }

  const populatedMovie = await MovieService.populateMovie(movie);

  return res.render('movie/details', { movie: populatedMovie });
};

module.exports.index = async (req, res) => {
  const popularList = await ListService.findByName('popular');
  const topRatedList = await ListService.findByName('top_rated');
  const upcomingList = await ListService.findByName('upcoming');

  const list = await List.findOne({ name: 'popular' });
  console.log(list);

  res.render('index', {
    lists: [popularList, topRatedList, upcomingList],
  });
};
