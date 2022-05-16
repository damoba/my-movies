import styles from "./List.module.css";

import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MovieFromListItem } from "../../../typings";
import ListItem from "../ListItem/ListItem";

interface Props {
  isGradientBackground: boolean;
  isLast: boolean;
  title: string;
  movieList: MovieFromListItem[];
  setNextPageIsLoading: Dispatch<SetStateAction<boolean>>;
}

const List: FunctionComponent<Props> = ({
  isGradientBackground,
  isLast,
  title,
  movieList,
  setNextPageIsLoading,
}) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const [wrapperChildrenWidth, setWrapperChildrenWidth] = useState<number>(0);
  const [scrollDistance, setScrollDistance] = useState<number>(0);

  /**
   * Calculates the total width of an elements children.
   * @param {HTMLElement} element Element for which to calculate
   * @returns {number} Total width of children
   */
  const calcChildrenWidth = (element: HTMLElement): number => {
    const children = element.children;
    var totalWidth = 0;
    for (var i = 0; i < children.length; i++) {
      totalWidth += children[i].scrollWidth;
    }
    return totalWidth;
  };

  /**
   * Sets the total width of the wrapper's children, updates it if resized,
   * and updates the scroll distance for the list on every scroll.
   */
  useEffect(() => {
    // save wrapper dif from ref
    const wrapperDiv = wrapperRef.current;

    // wrapper children width
    setWrapperChildrenWidth(calcChildrenWidth(wrapperDiv));
    const onResize = () => {
      setWrapperChildrenWidth(calcChildrenWidth(wrapperDiv));
    };
    window.addEventListener("resize", onResize);

    // scroll distance
    const onScroll = () => {
      setScrollDistance(wrapperDiv.scrollLeft);
    };
    wrapperDiv.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", onResize);
      wrapperDiv.removeEventListener("scroll", onScroll);
    };
  }, [wrapperRef.current]);

  /**
   * Scrolls the list in the appropriate direction when arrow is clicked.
   * @param {string} direction Direction to scroll ("left" or "right")
   */
  const handleArrowClick = (direction: string) => {
    if (direction === "left") {
      wrapperRef.current.scroll({ left: -(205 - scrollDistance) });
    }
    if (direction === "right") {
      wrapperRef.current.scroll({ left: 205 + scrollDistance });
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
      <div className={styles.wrapper} ref={wrapperRef}>
        <div className={styles.container}>
          {movieList.map((m) => (
            <ListItem
              key={m.id}
              movie={m}
              setNextPageIsLoading={setNextPageIsLoading}
            />
          ))}
        </div>
      </div>
      <div
        className={`${styles.fade} ${styles.left} ${
          scrollDistance !== 0 && styles.scrolled
        } ${isLast && styles.last}`}
      />
      <div
        className={`${styles.fade} ${styles.right} ${
          scrollDistance + window.innerWidth < wrapperChildrenWidth &&
          styles.scrolled
        } ${isLast && styles.last}`}
      />
      <ArrowBackIosOutlined
        className={`${styles.sliderArrow} ${styles.left} ${
          scrollDistance !== 0 && styles.scrolled
        } ${isLast && styles.last}`}
        onClick={() => handleArrowClick("left")}
      />
      <ArrowForwardIosOutlined
        className={`${styles.sliderArrow} ${styles.right} ${
          scrollDistance + window.innerWidth < wrapperChildrenWidth &&
          styles.scrolled
        } ${isLast && styles.last}`}
        onClick={() => handleArrowClick("right")}
      />
    </div>
  );
};

export default List;
