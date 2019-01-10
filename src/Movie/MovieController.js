const mongoose = require('mongoose');

const Movie = mongoose.model('Movie');
const Language = mongoose.model('Language');
const Genre = mongoose.model('Genre');
const MovieService = require('./MovieService')(Movie);
const LanguageService = require('../Language/LanguageService')(Language);
const GenreService = require('../Genre/GenreService')(Genre);

const TMDBApiService = require('./api/TheMovieDatabase/APIService');

module.exports.find = async (req, res) => {
  const { title } = req.query;

  const movies = await TMDBApiService.searchMovies(title);

  res.send(movies);
};

module.exports.showMovieDetailPage = async (req, res) => {
  const { id } = req.params;

  let movie = await MovieService.getMovieById(id);

  if (!movie) {
    const apiMovie = await TMDBApiService.getMovie(id);
    const apiTrailers = await TMDBApiService.getTrailers(id);

    const languages = [];
    const genres = [];

    await Promise.all(apiMovie.spoken_languages.map(async (languageEntry) => {
      const language = await LanguageService.findOrCreateLanguage(languageEntry);

      languages.push(language);
    }));

    await Promise.all(apiMovie.genres.map(async (genreEntry) => {
      const genre = await GenreService.findOrCreateGenre(genreEntry);

      genres.push(genre);
    }));

    apiMovie.spoken_languages = languages;
    apiMovie.genres = genres;
    apiMovie.trailers = apiTrailers;

    movie = await MovieService.createMovie(apiMovie);
  }

  return res.send(movie);
};
