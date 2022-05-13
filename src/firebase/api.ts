import { MovieFromFeatured } from "../../typings";
import { db } from "./config";
import { ref, remove, set } from "firebase/database";

/**
 * Adds a movie from the featured display to the collection database.
 * @param {string} uid UID of user whose collection is being added to
 * @param {MovieFromFeatured} movie Movie to be added
 */
const addMovie = (uid: string, movie: MovieFromFeatured) => {
  const movieFromThumbnail = {
    timestamp: Date.now(),
    id: movie.id,
    year: movie.year ?? null,
    title: movie.title ?? null,
    original_title: movie.original_title ?? null,
    name: movie.name ?? null,
    original_name: movie.original_name ?? null,
    overview: movie.overview ?? null,
    vote_average: movie.vote_average ?? null,
    vote_count: movie.vote_count ?? null,
    backdrop_path: movie.backdrop_path ?? null,
    poster_path: movie.poster_path ?? null,
  };
  const id = movie.id;

  set(ref(db, `movies/${uid}/${id}`), movieFromThumbnail);
};

/**
 * Removes a movie from the collection database.
 * @param {string} uid UID of user whose movie is being removed
 * @param {number} id ID of movie to be removed
 */
const removeMovie = (uid: string, id: number) => {
  remove(ref(db, `movies/${uid}/${id}`));
};

export { addMovie, removeMovie };
