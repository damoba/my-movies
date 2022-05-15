import styles from "./ListItem.module.css";

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
}

const OVERVIEW_LENGTH = 100;

const ListItem: FunctionComponent<Props> = ({
  movie,
  setNextPageIsLoading,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      <div
        className={styles.listItem}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setNextPageIsLoading(true);
          router.push(`/search?id=${movie.id}`);
        }}
      >
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={`${imageBaseURL}${movie.poster_path || movie.backdrop_path}`}
            layout="fill"
            objectFit="cover"
            alt="Movie Poster"
          />
        </div>
        {isHovered && (
          <div className={styles.details}>
            <h4 className={styles.title}>
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
                <p className={styles.ratingNum}>N/A</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListItem;
