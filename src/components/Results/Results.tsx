import styles from "./Results.module.css";

import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { MovieFromThumbnail } from "../../../typings";
import Thumbnail from "../Thumbnail/Thumbnail";

interface Props {
  results: MovieFromThumbnail[];
  setNextPageIsLoading: Dispatch<SetStateAction<boolean>>;
  title: string;
  isCollection: boolean;
}

const Results: FunctionComponent<Props> = ({
  results,
  setNextPageIsLoading,
  title,
  isCollection,
}) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
      <div className={styles.wrapper}>
        {results.map((movie) => (
          <Thumbnail
            key={movie.id}
            movie={movie}
            setNextPageIsLoading={setNextPageIsLoading}
            isCollection={isCollection}
          />
        ))}
      </div>
    </div>
  );
};

export default Results;
