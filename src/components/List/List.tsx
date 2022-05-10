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
import { MovieFromListItem } from "../../../typings";
import ListItem from "../ListItem/ListItem";

interface Props {
  isGradientBackground: boolean;
  title: string;
  movieList: MovieFromListItem[];
  setNextPageIsLoading: Dispatch<SetStateAction<boolean>>;
}

const MINIMUM_SCREEN_LENGTH = 639;

const List: FunctionComponent<Props> = ({
  isGradientBackground,
  title,
  movieList,
  setNextPageIsLoading,
}) => {
  const NUMBER_OF_SLIDES = movieList.length;
  const classes = useStyles();

  const [slideNumber, setSlideNumber] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>();

  /**
   * Scrolls the list in the appropriate direction when arrow is clicked.
   * @param {string} direction Direction to scroll ("left" or "right")
   */
  const handleArrowClick = (direction: string) => {
    const leftMargin = window.innerWidth > MINIMUM_SCREEN_LENGTH ? 50 : 20;
    let distance = listRef.current.getBoundingClientRect().x - leftMargin;
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
        <div
          className={`${styles.leftFade} ${slideNumber > 0 && styles.scrolled}`}
        />
        <div
          className={`${styles.rightFade} ${
            slideNumber < NUMBER_OF_SLIDES && styles.scrolled
          }`}
        />
        <ArrowBackIosOutlined
          className={`${classes.sliderArrow} ${classes.left} ${
            slideNumber > 0 && classes.scrolled
          }`}
          onClick={() => handleArrowClick("left")}
        />
        <div className={styles.container} ref={listRef}>
          {movieList.map((m) => (
            <ListItem
              key={m.id}
              movie={m}
              setNextPageIsLoading={setNextPageIsLoading}
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
