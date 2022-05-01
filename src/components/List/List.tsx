import styles from "./List.module.css";

import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useRef,
} from "react";
import { Movie } from "../../../typings";
import ListItem from "../ListItem/ListItem";

interface Props {
  isGradientBackground: boolean;
  title: string;
  movieList: Movie[];
  setSelectedMovie: Dispatch<SetStateAction<Movie>>;
  setSelectedMovieIntro: Dispatch<SetStateAction<string>>;
}

const List: FunctionComponent<Props> = ({
  isGradientBackground,
  title,
  movieList,
  setSelectedMovie,
  setSelectedMovieIntro,
}) => {
  const listRef = useRef<HTMLDivElement>();

  const handleArrowClick = (direction: string) => {};

  return (
    <div className={`${styles.list} ${isGradientBackground ? styles.gradientBackground : styles.solidBackground}`}>
      <span className={styles.title}>{title}</span>
      <div className={styles.wrapper}>
        <ArrowBackIosOutlined
          className={`${styles.sliderArrow} ${styles.left}`}
          onClick={() => handleArrowClick("left")}
        />
        <div className={styles.container} ref={listRef}>
          {movieList.map((m) => (
            <ListItem
              movie={m}
              setSelectedMovie={setSelectedMovie}
              setSelectedMovieIntro={setSelectedMovieIntro}
            />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className={`${styles.sliderArrow} ${styles.right}`}
          onClick={() => handleArrowClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
