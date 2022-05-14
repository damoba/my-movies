import styles from "./HomeList.module.css";
import useStyles from "../../styles/stylesMUI";

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
import HomeListItem from "../HomeListItem/HomeListItem";

interface Props {
  isGradientBackground: boolean;
  isLast: boolean;
  isPoster: boolean;
  title: string;
  movieList: MovieFromListItem[];
  setNextPageIsLoading: Dispatch<SetStateAction<boolean>>;
}

const MINIMUM_SCREEN_LENGTH = 639;

const HomeList: FunctionComponent<Props> = ({
  isGradientBackground,
  isLast,
  isPoster,
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
      if (!isPoster) {
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
      } else {
        listRef.current.style.transform = `translateX(${205 + distance}px)`;
      }
    }
    if (direction === "right" && slideNumber < NUMBER_OF_SLIDES) {
      setSlideNumber(slideNumber + 1);
      if (!isPoster) {
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      } else {
        listRef.current.style.transform = `translateX(${-205 + distance}px)`;
      }
    }
  };

  return (
    <div
      className={`${styles.list} ${
        isGradientBackground
          ? styles.gradientBackground
          : styles.solidBackground
      } ${isLast && styles.last}`}
    >
      <span className={styles.title}>{title}</span>
      <div className={styles.wrapper}>
        <div
          className={`${styles.leftFade} ${
            slideNumber > 0 && styles.scrolled
          } ${isPoster && styles.poster}`}
        />
        <div
          className={`${styles.rightFade} ${
            slideNumber < NUMBER_OF_SLIDES && styles.scrolled
          } ${isPoster && styles.poster}`}
        />
        <ArrowBackIosOutlined
          className={`${classes.sliderArrow} ${classes.left} ${
            slideNumber > 0 && classes.scrolled
          } ${isPoster && classes.poster}`}
          onClick={() => handleArrowClick("left")}
        />
        <div className={styles.container} ref={listRef}>
          {movieList.map((m) => (
            <HomeListItem
              key={m.id}
              movie={m}
              setNextPageIsLoading={setNextPageIsLoading}
              isPoster={isPoster}
            />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className={`${classes.sliderArrow} ${classes.right} ${
            slideNumber < NUMBER_OF_SLIDES && classes.scrolled
          } ${isPoster && classes.poster}`}
          onClick={() => handleArrowClick("right")}
        />
      </div>
    </div>
  );
};

export default HomeList;
