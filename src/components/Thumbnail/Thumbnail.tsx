import styles from "./Thumbnail.module.css";

import React, { FunctionComponent } from "react";
import { Movie } from "../../../typings";

interface Props{
  movie: Movie;
}

const Thumbnail: FunctionComponent<Props> = ({movie}) => {
  return <div>Thumbnail</div>;
};

export default Thumbnail;
