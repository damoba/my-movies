import styles from "./FeaturedMovie.module.css";

import React, { FunctionComponent, useEffect } from "react";
import { imageBaseURL } from "../../config/api";
import { Movie } from "../../../typings";
import Rating from "@material-ui/lab/Rating";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import { Button } from "@material-ui/core";
import { Add, PlayArrowRounded } from "@material-ui/icons";

interface Props {
  featuredMovie: Movie;
  intro: string | null;
}

const FeaturedMovie: FunctionComponent<Props> = ({ featuredMovie, intro }) => {
  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.overlay}
        style={{
          backgroundImage: `url(${imageBaseURL}${
            featuredMovie.backdrop_path || featuredMovie.poster_path
          })`,
        }}
      ></div>
      {intro && (
        <p className={styles.intro}>{intro}</p>
      )}
      <h2 className={styles.title}>
        {featuredMovie.title ||
          featuredMovie.original_title ||
          featuredMovie.name ||
          featuredMovie.original_name}
        <span className={styles.year}>({featuredMovie.year})</span>
      </h2>
      <p className={styles.genres}>
        {featuredMovie.certification && (
          <span className={styles.certification}>
            {featuredMovie.certification}
          </span>
        )}
        {featuredMovie?.genres?.slice(0, 3).map((genre) => (
          <span className={styles.genre}>{genre.name}</span>
        ))}
      </p>
      <p className={styles.overview}>{featuredMovie.overview}</p>
      <div className={styles.rating}>
        <Rating
          value={featuredMovie.vote_average / 2}
          precision={0.5}
          icon={<StarRoundedIcon />}
          readOnly
        />
        <p className={styles.ratingNum}>
          {(featuredMovie.vote_average / 2).toFixed(1)}
          <small>({featuredMovie.vote_count.toLocaleString("en-US")})</small>
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
