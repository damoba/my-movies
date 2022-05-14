import axios from "./axios";
import {
  MovieFromFeatured,
  MovieFromListItem,
  MovieFromThumbnail,
  MovieFull,
  MovieFullIndexed,
} from "../../typings";

const imageBaseURL = "https://image.tmdb.org/t/p/original";

const requests = {
  fetchTrendingMovies: `/trending/movie/week?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
  fetchTopRatedMovies: `/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&with_genres=28&include_adult=false`,
  fetchDramaMovies: `/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&with_genres=18&include_adult=false`,
  fetchComedyMovies: `/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&with_genres=35&include_adult=false`,
  fetchRomanceMovies: `/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&with_genres=10749&include_adult=false`,
  fetchDocumentaryMovies: `/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&with_genres=99&include_adult=false`,
};

/**
 * Returns a string with the API call to fetch a full movie with its details.
 * @param {number} id Movie ID
 * @returns {string} String holding API call
 */
const fetchMovieForFeatured = (id: number) => {
  return `/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,release_dates`;
};

/**
 * Returns a string with the API call to fetch a full movie with its details.
 * @param {number} id Movie ID
 * @returns {string} String holding API call
 */
const fetchMovieForListItem = (id: number) => {
  return `/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`;
};

/**
 * Returns a string with the API call to fetch the movie search results from a query.
 * @param {string} queryURIencoded Query that is URI encoded
 * @returns {string} String holding API call
 */
const fetchSearchResults = (queryURIencoded: string) => {
  return `/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${queryURIencoded}&page=1&include_adult=false`;
};

/**
 * Returns a string with the API call to fetch similar movies to the movie pertaining to the given ID.
 * @param {number} id Id of movie to find similar movies of
 * @returns {string} String holding API call
 */
const fetchSimilarMovies = (id: number) => {
  return `/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
};

/**
 * Returns a string with the API call to fetch recommendations for the movie pertaining to the given ID.
 * @param {number} id Id of movie to find recommendations for
 * @returns {string} String holding API call
 */
const fetchRecommendedMovies = (id: number) => {
  return `/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
};

/**
 * Takes a full movie from the API and returns one with only selected attributes.
 * Calculates some of these attributes.
 * @param {MovieFull} movieFull Full movie to be filtered
 * @returns {MovieFromFeatured} Movie with selected attributes
 */
const filterMovieForFeatured = (movieFull: MovieFull): MovieFromFeatured => {
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
    collected: false,
    id: movieFull.id,
    certification: certification ?? null,
    videoId: videoId ?? null,
    year: year ?? null,
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
 * Takes a full movie from the API (indexed) and returns one with only selected attributes.
 * Calculates some of these attributes.
 * @param {MovieFullIndexed} movieFullIndexed Full indexed movie to be filtered
 * @returns {MovieFromListItem} Movie with selected attributes
 */
const filterMovieForListItem = (
  movieFullIndexed: MovieFullIndexed
): MovieFromListItem => {
  var videoId = movieFullIndexed.videos?.results[0]?.key;
  var date = new Date(movieFullIndexed.release_date);
  var year = date?.getFullYear();

  return {
    index: movieFullIndexed.index,
    id: movieFullIndexed.id,
    videoId: videoId ?? null,
    year: year ?? null,
    title: movieFullIndexed.title ?? null,
    original_title: movieFullIndexed.original_title ?? null,
    name: movieFullIndexed.name ?? null,
    original_name: movieFullIndexed.original_name ?? null,
    overview: movieFullIndexed.overview ?? null,
    vote_average: movieFullIndexed.vote_average ?? null,
    vote_count: movieFullIndexed.vote_count ?? null,
    backdrop_path: movieFullIndexed.backdrop_path ?? null,
    poster_path: movieFullIndexed.poster_path ?? null,
  };
};

/**
 * Takes a full movie from the API (indexed) and returns one with only selected attributes.
 * Calculates some of these attributes.
 * @param {MovieFullIndexed} movieFullIndexed Full indexed movie to be filtered
 * @returns {MovieFromListItem} Movie with selected attributes
 */
const filterMovieForHomeListItem = (
  movieFullIndexed: MovieFullIndexed
): MovieFromListItem => {
  var date = new Date(movieFullIndexed.release_date);
  var year = date?.getFullYear();

  return {
    index: movieFullIndexed.index,
    id: movieFullIndexed.id,
    year: year ?? null,
    title: movieFullIndexed.title ?? null,
    original_title: movieFullIndexed.original_title ?? null,
    name: movieFullIndexed.name ?? null,
    original_name: movieFullIndexed.original_name ?? null,
    overview: movieFullIndexed.overview ?? null,
    vote_average: movieFullIndexed.vote_average ?? null,
    vote_count: movieFullIndexed.vote_count ?? null,
    backdrop_path: movieFullIndexed.backdrop_path ?? null,
    poster_path: movieFullIndexed.poster_path ?? null,
  };
};

/**
 * Takes a full movie from the API and returns one with only selected attributes.
 * Calculates some of these attributes.
 * @param {MovieFull} movieFull Full movie to be filtered
 * @returns {MovieFromThumbnail} Movie with selected attributes
 */
const filterMovieForThumbnail = (movieFull: MovieFull): MovieFromThumbnail => {
  var date = new Date(movieFull.release_date);
  var year = date?.getFullYear();

  return {
    id: movieFull.id,
    year: year ?? null,
    title: movieFull.title ?? null,
    original_title: movieFull.original_title ?? null,
    name: movieFull.name ?? null,
    original_name: movieFull.original_name ?? null,
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
 * @param {number} id ID of movie not to be included
 * @returns {Promise<MovieFromListItem[]>} List of movies with selected attributes
 */
const filterList = async (
  movieList: MovieFull[],
  id: number
): Promise<MovieFromListItem[]> => {
  const movieListFiltered = [];
  var j = 0;
  for (let i = 0; i < movieList.length; i++) {
    if (
      (movieList[i].backdrop_path || movieList[i].poster_path) &&
      (!movieList[i].adult || movieList[i].adult === false) &&
      movieList[i].id !== id
    ) {
      const movieFullerResponse = await axios.get(
        fetchMovieForListItem(movieList[i].id)
      );
      movieListFiltered.push(
        filterMovieForListItem({ ...movieFullerResponse.data, index: j++ })
      );
    }
  }
  return movieListFiltered;
};

/**
 * Takes a list of movies with the data coming from the API call,
 * then filters them down to the selected attributes needed from them.
 * @param {MovieFull[]} movieList List of full movies
 * @param {number} id ID of movie not to be included
 * @returns {Promise<MovieFromListItem[]>} List of movies with selected attributes
 */
const filterHomeList = async (
  movieList: MovieFull[],
  id: number
): Promise<MovieFromListItem[]> => {
  const movieListFiltered = [];
  var j = 0;
  for (let i = 0; i < movieList.length; i++) {
    if (
      (movieList[i].backdrop_path || movieList[i].poster_path) &&
      (!movieList[i].adult || movieList[i].adult === false) &&
      movieList[i].id !== id
    ) {
      movieListFiltered.push(
        filterMovieForHomeListItem({ ...movieList[i], index: j++ })
      );
    }
  }
  return movieListFiltered;
};

/**
 * Takes a list of movies with the data coming from the API call, then
 * fills them up with all specific movie details, and then filters them
 * down to the selected attributes needed from them.
 * @param {MovieFull[]} movieList List of full movies
 * @returns {Promise<MovieFromThumbnail[]>} List of movies with selected attributes
 */
const filterResults = async (
  movieList: MovieFull[]
): Promise<MovieFromThumbnail[]> => {
  const movieListFiltered = [];
  var j = 0;
  for (let i = 0; i < movieList.length; i++) {
    if (
      (movieList[i].backdrop_path || movieList[i].poster_path) &&
      (!movieList[i].adult || movieList[i].adult === false)
    ) {
      movieListFiltered.push(filterMovieForThumbnail(movieList[i]));
    }
  }
  return movieListFiltered;
};

export {
  imageBaseURL,
  fetchMovieForFeatured,
  fetchSearchResults,
  fetchSimilarMovies,
  fetchRecommendedMovies,
  filterMovieForFeatured,
  filterList,
  filterHomeList,
  filterResults,
};

export default requests;
