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

const VIDEO_BASE_URL = "https://www.youtube.com/embed/";
const VIDEO_OPTIONS = "?autoplay=1&mute=1&loop=1";
const OVERVIEW_LENGTH = 150;
const MINIMUM_SCREEN_LENGTH = 1279;

const ListItem: FunctionComponent<Props> = ({
  movie,
  setNextPageIsLoading,
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
        style={{
          width: isHovered && window.innerWidth > MINIMUM_SCREEN_LENGTH && 330,
          visibility: "hidden",
        }}
      />
      <div
        className={styles.listItem}
        style={{
          left: isHovered && movie.index * 230,
        }}
      >
        <Image
          className={styles.image}
          src={`${imageBaseURL}${movie.backdrop_path || movie.poster_path}`}
          layout="fixed"
          width={
            isHovered && window.innerWidth > MINIMUM_SCREEN_LENGTH
              ? "325px"
              : "225px"
          }
          height={
            isHovered && window.innerWidth > MINIMUM_SCREEN_LENGTH
              ? "140px"
              : "120px"
          }
          objectFit="cover"
          alt="Movie Poster"
        />
        {isHovered && (
          <>
            {movie.videoId && (
              <iframe
                className={styles.video}
                src={`${VIDEO_BASE_URL}${movie.videoId}${VIDEO_OPTIONS}`}
              />
            )}
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
                  <small> ({movie.vote_count.toLocaleString("en-US")})</small>
                </p>
              ) : (
                <p className={styles.ratingNum}>(no rating yet)</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListItem;
