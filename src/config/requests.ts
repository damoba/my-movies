import axios from "./axios";
import { Movie, MovieFull, MovieFullIndexed } from "../../typings";

const imageBaseURL = "https://image.tmdb.org/t/p/original";

const requests = {
  fetchTrendingMovies: `/trending/movie/week?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
  fetchTopRatedMovies: `/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
};

/**
 * Returns a string with the API call to fetch a full movie with its details
 * @param {number} id Movie ID
 * @returns {string} String holding API call
 */
const fetchMovie = (id: number) => {
  return `/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,release_dates`;
};

/**
 * Returns a string with the API call to fetch the movie search results from a query
 * @param {string} queryURIencoded Query that is URI encoded
 * @returns {string} String holding API call
 */
const fetchSearchResults = (queryURIencoded: string) => {
  return `/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${queryURIencoded}&page=1&include_adult=false`;
};

/**
 * Takes a full movie from the API (indexed) and returns one with only selected attributes.
 * Calculates some of these attributes.
 * @param {MovieFullIndexed} movieFull Full indexed movie to be filtered
 * @returns {Movie} Movie with selected attributes
 */
const filterMovie = (movieFull: MovieFullIndexed): Movie => {
  var releaseDates = movieFull.release_dates.results;
  var certification = null;
  for (let i = 0; i < releaseDates.length; i++) {
    if (
      releaseDates[i].iso_3166_1 === "US" ||
      releaseDates[i].iso_3166_1 === "CA"
    ) {
      certification = releaseDates[i].release_dates[0].certification;
    }
  }
  var videoId = movieFull.videos?.results[0]?.key;
  var date = new Date(movieFull.release_date);
  var year = date?.getFullYear();

  return {
    index: movieFull.index,
    collected: false,
    certification: certification ?? null,
    videoId: videoId ?? null,
    year,
    title: movieFull.title ?? null,
    original_title: movieFull.original_title ?? null,
    name: movieFull.name ?? null,
    original_name: movieFull.original_name ?? null,
    genres: movieFull.genres ?? null,
    overview: movieFull.overview ?? null,
    vote_average: movieFull.vote_average ?? null,
    vote_count: movieFull.vote_count ?? null,
    backdrop_path: movieFull.backdrop_path ?? null,
    poster_path: movieFull.poster_path ?? null,
  };
};

/**
 * Takes a list of movies with the data coming from the API call, then
 * fills them up with all specific movie details, and then filters them
 * down to the selected attributes needed from them.
 * @param {MovieFull[]} movieList List of full movies
 * @returns {Promise<Movie[]>} List of movies with selected attributes
 */
const filterList = async (movieList: MovieFull[]): Promise<Movie[]> => {
  const movieListFiltered = [];
  var j = 0;
  for (let i = 0; i < movieList.length; i++) {
    if (
      (movieList[i].backdrop_path || movieList[i].poster_path) &&
      (!movieList[i].adult || movieList[i].adult === false)
    ) {
      const movieFullerResponse = await axios.get(fetchMovie(movieList[i].id));
      movieListFiltered.push(
        filterMovie({ ...movieFullerResponse.data, index: j++ })
      );
    }
  }
  return movieListFiltered;
};

export { imageBaseURL, fetchMovie, fetchSearchResults, filterMovie, filterList };

export default requests;
