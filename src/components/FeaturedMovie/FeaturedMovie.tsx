import styles from "./FeaturedMovie.module.css";

import React, { FunctionComponent } from "react";

interface Props {
  backgroundImage: string;
}

const FeaturedMovie: FunctionComponent<Props> = ({ backgroundImage }) => {
  return (
    <div className={styles.container} >
      <div className={styles.overlay} style={{ backgroundImage: backgroundImage }}></div>
    </div>
  );
};

export default FeaturedMovie;
