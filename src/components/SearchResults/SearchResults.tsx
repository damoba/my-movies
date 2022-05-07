import styles from "./SearchResults.module.css";

import React, { FunctionComponent } from "react";
import { Movie } from "../../../typings";
import Thumbnail from "../Thumbnail/Thumbnail";

interface Props {
  results: Movie[];
}

const SearchResults: FunctionComponent<Props> = ({ results }) => {
  return (
    <div className={styles.container}>
      <p>Search Results</p>
      <div className={styles.wrapper}>
        {results.map((movie) => (
          <Thumbnail key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
