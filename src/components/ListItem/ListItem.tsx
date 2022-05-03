import styles from "./ListItem.module.css";

import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { Movie } from "../../../typings";
import Image from "next/image";
import { imageBaseURL } from "../../config/requests";

interface Props {
  movie: Movie;
  setSelectedMovie: Dispatch<SetStateAction<Movie>>;
  setSelectedMovieIntro: Dispatch<SetStateAction<string>>;
}

const VIDEO_BASE_URL = "https://www.youtube.com/embed/";
const VIDEO_OPTIONS = "?autoplay=1&mute=1&loop=1";

const ListItem: FunctionComponent<Props> = ({
  movie,
  setSelectedMovie,
  setSelectedMovieIntro,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className={styles.listItem}
      style={{ left: isHovered && movie.index * 225 - 50 + movie.index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        className={styles.image}
        src={`${imageBaseURL}${movie.backdrop_path || movie.poster_path}`}
        layout="fixed"
        width={isHovered ? "325px" : "225px"}
        height={isHovered ? "140px" : "120px"}
        objectFit="cover"
        alt="Movie Poster"
      />
      {isHovered && (
        <>
          {movie.videoId && <iframe
            className={styles.video}
            src={`${VIDEO_BASE_URL}${movie.videoId}${VIDEO_OPTIONS}`}
          />}
        </>
      )}
    </div>
  );
};

export default ListItem;
