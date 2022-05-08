import styles from "./Loader.module.css";

import React, { FunctionComponent } from "react";
import { GridLoader } from "react-spinners";

const Loader: FunctionComponent = () => {
  return (
    <div className={styles.loader}>
      <GridLoader size={20} margin={5} color={"#4ca1af"} />
    </div>
  );
};

export default Loader;
