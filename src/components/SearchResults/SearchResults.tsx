import styles from "./SearchResults.module.css";

import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Movie } from "../../../typings";
import Thumbnail from "../Thumbnail/Thumbnail";

interface Props {
  results: Movie[];
  setNextPageIsLoading: Dispatch<SetStateAction<boolean>>;
}

const SearchResults: FunctionComponent<Props> = ({
  results,
  setNextPageIsLoading,
}) => {
  return (
    <div className={styles.container}>
      <p>Search Results</p>
      <div className={styles.wrapper}>
        {results.map((movie) => (
          <Thumbnail
            key={movie.id}
            movie={movie}
            setNextPageIsLoading={setNextPageIsLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
