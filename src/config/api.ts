const imageBaseURL = "https://image.tmdb.org/t/p/original";

const requests = {
  fetchTopRatedMovies: `/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
};

const fetchMovie = (id: number) => {
  return `/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,release_dates`;
};

export { imageBaseURL, fetchMovie };

export default requests;
