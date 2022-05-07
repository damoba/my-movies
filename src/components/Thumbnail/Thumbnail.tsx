import styles from "./Thumbnail.module.css";

import React, { FunctionComponent } from "react";
import { Movie } from "../../../typings";
import Image from "next/image";
import { imageBaseURL } from "../../config/requests";
import { Rating } from "@material-ui/lab";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

interface Props {
  movie: Movie;
}

const Thumbnail: FunctionComponent<Props> = ({ movie }) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={`${imageBaseURL}${movie.backdrop_path || movie.poster_path}`}
        layout="responsive"
        width={1920}
        height={1080}
        objectFit="cover"
        alt="Movie Poster"
      />
      <div className={styles.description}>
        <p className={styles.overview}>{movie.overview}</p>
        <h4 className={styles.title}>
          {movie.title ||
            movie.original_title ||
            movie.name ||
            movie.original_name}
          {movie.year && <span className={styles.year}>({movie.year})</span>}
        </h4>
        <div className={styles.rating}>
          <Rating
            value={movie.vote_average && movie.vote_average / 2}
            precision={0.5}
            icon={<StarRoundedIcon />}
            readOnly
          />
          {movie.vote_average && movie.vote_count && movie.vote_count > 0 ? (
            <p className={styles.ratingNum}>
              {(movie.vote_average / 2).toFixed(1)}
              <small> ({movie.vote_count.toLocaleString("en-US")})</small>
            </p>
          ) : (
            <p className={styles.ratingNum}>(no rating yet)</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
