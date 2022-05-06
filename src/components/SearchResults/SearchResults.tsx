import styles from "./SearchResults.module.css";

import React, { FunctionComponent } from "react";
import { Movie } from "../../../typings";

interface Props {
  results: Movie[];
}

const SearchResults: FunctionComponent<Props> = ({ results }) => {
  return <div>SearchResults</div>;
};

export default SearchResults;
