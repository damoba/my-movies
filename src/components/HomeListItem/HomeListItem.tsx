import styles from "./HomeListItem.module.css";

import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { MovieFromListItem } from "../../../typings";
import Image from "next/image";
import { imageBaseURL } from "../../config/requests";
import { Rating } from "@material-ui/lab";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import { useRouter } from "next/router";

interface Props {
  movie: MovieFromListItem;
  setNextPageIsLoading: Dispatch<SetStateAction<boolean>>;
  isPoster: boolean;
}

const OVERVIEW_LENGTH = 50;

const HomeListItem: FunctionComponent<Props> = ({
  movie,
  setNextPageIsLoading,
  isPoster,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setNextPageIsLoading(true);
        router.push(`/search?id=${movie.id}`);
      }}
    >
      <div
        className={styles.listItem}
        style={
          !isPoster
            ? { width: "225px", height: "120px" }
            : { width: "200px", height: "300px" }
        }
      >
        <div className={styles.imageWrapper}>
          <Image
            className={
              !isHovered
                ? `${styles.image}`
                : `${styles.image} ${styles.hovered}`
            }
            src={
              !isPoster
                ? `${imageBaseURL}${movie.backdrop_path || movie.poster_path}`
                : `${imageBaseURL}${movie.poster_path || movie.backdrop_path}`
            }
            layout="fixed"
            width={!isPoster ? "225px" : "200px"}
            height={!isPoster ? "120px" : "300px"}
            objectFit="cover"
            alt="Movie Poster"
          />
        </div>
        {!isHovered && !isPoster && (
          <h4 className={styles.shownTitle}>
            {movie.title ||
              movie.original_title ||
              movie.name ||
              movie.original_name}
            {movie.year && <span className={styles.year}>({movie.year})</span>}
          </h4>
        )}
        {isHovered && (
          <div className={styles.details}>
            <h4
              className={
                !isPoster
                  ? `${styles.title}`
                  : `${styles.title} ${styles.poster}`
              }
            >
              {movie.title ||
                movie.original_title ||
                movie.name ||
                movie.original_name}
              {movie.year && (
                <span className={styles.year}>({movie.year})</span>
              )}
            </h4>
            <p className={styles.overview}>
              {movie.overview?.length > OVERVIEW_LENGTH
                ? movie.overview.substring(0, OVERVIEW_LENGTH) + "..."
                : movie.overview}
            </p>
            <div className={styles.rating}>
              <Rating
                value={movie.vote_average && movie.vote_average / 2}
                precision={0.5}
                icon={<StarRoundedIcon />}
                readOnly
              />
              {movie.vote_average &&
              movie.vote_count &&
              movie.vote_count > 0 ? (
                <p className={styles.ratingNum}>
                  {(movie.vote_average / 2).toFixed(1)}
                </p>
              ) : (
                <p className={styles.ratingNum}>(no rating yet)</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeListItem;
