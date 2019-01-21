const mongoose = require('mongoose');

const List = mongoose.model('List');
const ListService = require('../src/List/ListService')(List);
const TMDBApiService = require('../src/Movie/api/TheMovieDatabase/APIService');

module.exports = async () => {
  await ListService.removeAllEntries();

  const popularList = await TMDBApiService.getPopularMovies();
  const upcomingList = await TMDBApiService.getUpcomingMovies();
  const topRatedList = await TMDBApiService.getTopRatedMovies();

  popularList.map(movie => ({ title: movie.title, id: movie.id, poster_path: movie.poster_path }));
  upcomingList.map(movie => ({ title: movie.title, id: movie.id, poster_path: movie.poster_path }));
  topRatedList.map(movie => ({ title: movie.title, id: movie.id, poster_path: movie.poster_path }));

  await ListService.createList({ name: 'popular', displayName: 'Popular movies', movies: popularList });
  await ListService.createList({ name: 'upcoming', displayName: 'Upcoming movies', movies: upcomingList });
  await ListService.createList({ name: 'top_rated', displayName: 'Top rated movies', movies: topRatedList });
};
