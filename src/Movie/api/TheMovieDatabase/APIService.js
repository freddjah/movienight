const axios = require('axios');

const baseURL = 'https://api.themoviedb.org/3';

module.exports.searchMovies = async (query) => {
  const url = `${baseURL}/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${query}&page=1`;
  const response = await axios.get(url);

  return response.data;
};

module.exports.getMovie = async (id) => {
  const url = `${baseURL}/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`;
  const response = await axios.get(url);

  return response.data;
};

module.exports.getTrailers = async (id) => {
  const url = `${baseURL}/movie/${id}/videos?api_key=${process.env.TMDB_KEY}`;
  const response = await axios.get(url);

  return response.data.results;
};