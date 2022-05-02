import styles from "./List.module.css";
import useStyles from "./StylesMUI";

import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useRef,
  useState,
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

const NUMBER_OF_SLIDES = 20;

const List: FunctionComponent<Props> = ({
  isGradientBackground,
  title,
  movieList,
  setSelectedMovie,
  setSelectedMovieIntro,
}) => {
  const classes = useStyles();

  const [slideNumber, setSlideNumber] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>();

  /**
   * Scrolls the list in the appropriate direction when arrow is clicked.
   * @param {string} direction Direction to scroll ("left" or "right")
   */
  const handleArrowClick = (direction: string) => {
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < NUMBER_OF_SLIDES) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div
      className={`${styles.list} ${
        isGradientBackground
          ? styles.gradientBackground
          : styles.solidBackground
      }`}
    >
      <span className={styles.title}>{title}</span>
      <div className={styles.wrapper}>
        <div className={`${styles.leftFade} ${slideNumber > 0 && styles.scrolled}`}/>
        <div className={`${styles.rightFade} ${slideNumber < NUMBER_OF_SLIDES && styles.scrolled}`}/>
        <ArrowBackIosOutlined
          className={`${classes.sliderArrow} ${classes.left} ${
            slideNumber > 0 && classes.scrolled
          }`}
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
          className={`${classes.sliderArrow} ${classes.right} ${
            slideNumber < NUMBER_OF_SLIDES && classes.scrolled
          }`}
          onClick={() => handleArrowClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
