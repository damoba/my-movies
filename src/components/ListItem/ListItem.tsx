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

const ListItem: FunctionComponent<Props> = ({
  movie,
  setSelectedMovie,
  setSelectedMovieIntro,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <div
      className={styles.listItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`${imageBaseURL}${movie.backdrop_path || movie.poster_path}`}
        layout="fill"
        objectFit="cover"
        alt="Movie Poster"
      />
    </div>
  );
};

export default ListItem;
