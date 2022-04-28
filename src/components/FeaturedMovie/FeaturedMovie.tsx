import styles from "./FeaturedMovie.module.css";

import React, { FunctionComponent, useEffect } from "react";
import { imageBaseURL } from "../../config/api";
import { Movie } from "../../../typings";
import Rating from "@material-ui/lab/Rating";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import { Button } from "@material-ui/core";
import { Add, PlayArrowRounded } from "@material-ui/icons";

interface Props {
  selectedMovie: Movie;
  selectedMovieIntro: string | null;
}

const FeaturedMovie: FunctionComponent<Props> = ({
  selectedMovie,
  selectedMovieIntro,
}) => {

  return (
    <div className={styles.container}>
      <div
        className={styles.overlay}
        style={{
          backgroundImage: `url(${imageBaseURL}${
            selectedMovie.backdrop_path || selectedMovie.poster_path
          })`,
        }}
      ></div>
      {selectedMovieIntro && (
        <p className={styles.intro}>{selectedMovieIntro}</p>
      )}
      <h2 className={styles.title}>
        {selectedMovie.title ||
          selectedMovie.original_title ||
          selectedMovie.name ||
          selectedMovie.original_name}
        <span className={styles.year}>({selectedMovie.year})</span>
      </h2>
      <p className={styles.genres}>
        {selectedMovie.certification && (
          <span className={styles.certification}>
            {selectedMovie.certification}
          </span>
        )}
        {selectedMovie?.genres?.slice(0, 3).map((genre) => (
          <span className={styles.genre}>{genre.name}</span>
        ))}
      </p>
      <p className={styles.overview}>{selectedMovie.overview}</p>
      <div className={styles.rating}>
        <Rating
          value={selectedMovie.vote_average / 2}
          precision={0.5}
          icon={<StarRoundedIcon />}
          readOnly
        />
        <p className={styles.ratingNum}>
          {(selectedMovie.vote_average / 2).toFixed(1)}
          <small>({selectedMovie.vote_count.toLocaleString("en-US")})</small>
        </p>
      </div>
      <Button
        className={styles.button}
        variant="contained"
        startIcon={<PlayArrowRounded />}
      >
        Play Trailer
      </Button>
      <Button className={styles.button} variant="contained" startIcon={<Add />}>
        Collect Movie
      </Button>
    </div>
  );
};

export default FeaturedMovie;
