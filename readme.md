This is a movie webapplication that utilizes the API from TheMovieDatabase. It will save browsed movies in the MongoDB database (like caching) to keep the rates of API calls at a low.

## How to start
* Get a TMDB API key.
* Use .env.fake to create a .env file (set PORT and TMDB_KEY)
* Run docker-compose up
* Go to localhost:PORT