import styles from "./ListItem.module.css";

import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Movie } from "../../../typings";

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
  return <div>ListItem</div>;
};

export default ListItem;
